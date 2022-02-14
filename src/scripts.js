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

selectType.addEventListener('change', async ({ target }) => {
  $('#search-select-brand').dropdown('clear');
  selectBrand.innerHTML = '<option value="">Selecione a Marca</option>';
  $('#search-select-model').dropdown('clear');
  selectModel.innerHTML = '<option value="">Selecione o Modelo</option>';
  $('#search-select-year').dropdown('clear');
  selectYear.innerHTML = '<option value="">Selecione o Ano</option>';
  const data = await fetchVehicle(target.value);
  data.forEach(({ nome, codigo }) => {
    addItemInSelection(selectBrand, nome, codigo);
  });
});

selectBrand.addEventListener('change', async ({ target }) => {
  $('#search-select-model').dropdown('clear');
  selectModel.innerHTML = '<option value="">Selecione o Modelo</option>';
  $('#search-select-year').dropdown('clear');
  selectYear.innerHTML = '<option value="">Selecione o Ano</option>';
  if (!target.value) return;
  // console.log(selectType.value, target.value);
  const data = await fetchVehicle(selectType.value, target.value);
  data.modelos.forEach(({ nome, codigo }) => {
    addItemInSelection(selectModel, nome, codigo);
  });
});

selectModel.addEventListener('change', async ({ target }) => {
  $('#search-select-year').dropdown('clear');
  selectYear.innerHTML = '<option value="">Selecione o Ano</option>';
  if (!target.value) return;
  const data = await fetchVehicle(
    selectType.value,
    selectBrand.value,
    target.value
  );
  // console.log(data)
  data.forEach(({ nome, codigo }) => {
    addItemInSelection(selectYear, nome, codigo);
  });
});

selectYear.addEventListener('change', async ({ target }) => {
  if (!target.value) return;
  const data = await fetchVehicle(
    selectType.value,
    selectBrand.value,
    selectModel.value,
    target.value
  );
  // console.log(data) ;
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
  // const test = 'https://www.google.com.br/search?q='
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

window.onload = async () => {
  // console.log(await fetchVehicle('carros'));
};

// AnoModelo: 1998
// CodigoFipe: "801003-0"
// Combustivel: "Gasolina"
// Marca: "AGRALE"
// MesReferencia: "fevereiro de 2022 "
// Modelo: "CITY 90"
// SiglaCombustivel: "G"
// TipoVeiculo: 2
// Valor: "R$ 1.898,00"
