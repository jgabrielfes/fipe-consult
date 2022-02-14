const selectType = document.getElementById('search-select-type');
const selectBrand = document.getElementById('search-select-brand');
const selectModel = document.getElementById('search-select-model');
const selectYear = document.getElementById('search-select-year');

function addItemInSelection(parent, text, dataValue) {
  const item = document.createElement('option');
  item.innerText = text;
  item.value = dataValue;
  parent.appendChild(item);
}

function clearOptions(...selects) {
  selects.forEach((select) => {
    $(select).dropdown('clear');
    select.innerHTML = '<option value=""></option>';
  });
}

selectType.addEventListener('change', async ({ target }) => {
  clearOptions(selectBrand, selectModel, selectYear);
  const data = await fetchVehicle(target.value);
  readingData(selectBrand, data);
});

selectBrand.addEventListener('change', async ({ target }) => {
  clearOptions(selectModel, selectYear);
  if (!target.value) return;
  const data = await fetchVehicle(selectType.value, target.value);
  readingData(selectModel, data.modelos);
});

selectModel.addEventListener('change', async ({ target }) => {
  clearOptions(selectYear);
  if (!target.value) return;
  const data = await fetchVehicle(
    selectType.value,
    selectBrand.value,
    target.value
  );
  readingData(selectYear, data);
});

selectYear.addEventListener('change', async ({ target }) => {
  if (!target.value) return;
  const data = await fetchVehicle(
    selectType.value,
    selectBrand.value,
    selectModel.value,
    target.value
  );
  elementCreate(data);
});

const carInfoContainer = document.querySelector('#car-info');
const carPrice = document.querySelector('#car-price');
const carTable = document.querySelector('#car-table');

function limpaSection() {
  carInfoContainer.innerHTML = '';
  carPrice.innerHTML = '';
  carTable.innerHTML = '';
  return;
}

async function pesquisaImagem(data) {
  const URL = `https://imsea.herokuapp.com/api/1?q=`;
  const resultadoPesquisa = await fetch(
    `${URL}${data.Marca}${data.Modelo}${data.AnoModelo}`
  );
  const noAvailable = 'https://car-info.com/build/images/no_img.jpg?v2.2"';
  const testresultado = await resultadoPesquisa.json();
  console.log(testresultado);
  const imagem = document.querySelector('#image-test');
  imagem.src =
    testresultado.results.length === 0 ? noAvailable : testresultado.results[0];
}

async function elementCreate(data) {
  if (document.querySelector('.modelo-titulo') !== null) {
    limpaSection();
  }

  const h1 = document.createElement('h1');
  h1.className = 'modelo-titulo';
  h1.innerHTML = `${data.Marca} ${data.Modelo}`;
  carInfoContainer.appendChild(h1);

  const h2 = document.createElement('h2');
  h2.className = 'ano-combustivel';
  h2.innerHTML = `${data.AnoModelo} - ${data.Combustivel}`;
  carInfoContainer.appendChild(h2);

  const test = createTable(data);
  carTable.appendChild(test);

  const pFipe = document.createElement('p');
  pFipe.innerHTML = 'Valor na Tabela FIPE';
  carPrice.appendChild(pFipe);

  const novoh1 = document.createElement('h1');
  novoh1.innerHTML = data.Valor;
  carPrice.appendChild(novoh1);

  await pesquisaImagem(data);
}

