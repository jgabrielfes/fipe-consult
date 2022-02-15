const selects = ['type', 'brand', 'model', 'year'];

function addItemInSelection(parent, text, value) {
  const item = document.createElement('option');
  item.innerText = text;
  item.value = value;
  parent.appendChild(item);
}

async function onChangeSelect(target) {
  const currentIndex = selects.indexOf(target.id.split('-')[2]);
  const nextSelect = document.getElementById(`search-select-${selects[currentIndex + 1]}`);
  const searchFetch = [];
  if (nextSelect) nextSelect.parentElement.classList.add('loading');

  selects.forEach((selectId, index) => {
    const select = document.getElementById(`search-select-${selectId}`)
    if (index <= currentIndex) {
      searchFetch.push(select.value);
    } else {
      $(select).dropdown('clear');
      select.innerHTML = '<option value=""></option>';
    }
  })

  let data = await fetchVehicle(...searchFetch);
  if (nextSelect) {
    nextSelect.parentElement.classList.remove('loading');
    data = data.modelos || data;
    data.forEach(({ nome, codigo }) => addItemInSelection(nextSelect, nome, codigo));
  } else {
    elementCreate(data);
  }
}

selects.forEach((selectId) => document.getElementById(`search-select-${selectId}`)
  .addEventListener('change', ({ target }) => target.value !== '' && onChangeSelect(target)));

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
