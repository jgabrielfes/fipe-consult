const selectType = document.getElementById('search-select-type');
const selectBrand = document.getElementById('search-select-brand');
const selectModel = document.getElementById('search-select-model');
const selectYear = document.getElementById('search-select-year');

function addItemInSelection(parent, text, dataValue) {
  const item = document.createElement('option');
  item.innerText = text;
  item.value = dataValue;
  parent.appendChild(item)
}

selectType.addEventListener('change', async ({ target }) => {
  selectBrand.innerHTML = '';
  selectModel.innerHTML = '';
  selectYear.innerHTML = '';
  const data = await fetchVehicle(target.value);
  data.forEach(({ nome, codigo }) => {
    addItemInSelection(selectBrand, nome, codigo)
  });
});

selectBrand.addEventListener('change', async ({ target }) => {
  selectModel.innerHTML = '';
  selectYear.innerHTML = '';
  const data = await fetchVehicle(selectType.value, target.value);
  data.modelos.forEach(({ nome, codigo }) => {
    addItemInSelection(selectModel, nome, codigo)
  });
});

selectModel.addEventListener('change', async ({ target }) => {
  selectYear.innerHTML = '';
  const data = await fetchVehicle(selectType.value, selectBrand.value, target.value);
  data.forEach(({ nome, codigo }) => {
    addItemInSelection(selectYear, nome, codigo)
  });
});

selectYear.addEventListener('change', async ({ target }) => {
  const data = await fetchVehicle(selectType.value,
    selectBrand.value, selectModel.value, target.value);
  console.log(data);
});

window.onload = async () => {
  // console.log(await fetchVehicle('carros'));
}
