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
  selectBrand.innerHTML = '<option value="">Select Brand</option>';
  $('#search-select-model').dropdown('clear');
  selectModel.innerHTML = '<option value="">Select Model</option>';
  $('#search-select-year').dropdown('clear');
  selectYear.innerHTML = '<option value="">Select Year</option>';
  const data = await fetchVehicle(target.value);
  readingData(selectBrand, data);
  // data.forEach(({ nome, codigo }) => {
  //   addItemInSelection(selectBrand, nome, codigo);
  // });
});

selectBrand.addEventListener('change', async ({ target }) => {
  $('#search-select-model').dropdown('clear');
  selectModel.innerHTML = '<option value="">Select Model</option>';
  $('#search-select-year').dropdown('clear');
  selectYear.innerHTML = '<option value="">Select Year</option>';
  if (!target.value) return;
  console.log(selectType.value, target.value);
  const data = await fetchVehicle(selectType.value, target.value);
  readingData(selectModel, data.modelos);
  // data.modelos.forEach(({ nome, codigo }) => {
  //   addItemInSelection(selectModel, nome, codigo);
  // });
});

selectModel.addEventListener('change', async ({ target }) => {
  $('#search-select-year').dropdown('clear');
  selectYear.innerHTML = '<option value="">Select Year</option>';
  if (!target.value) return;
  const data = await fetchVehicle(
    selectType.value,
    selectBrand.value,
    target.value
  );
  readingData(selectYear, data);
  // data.forEach(({ nome, codigo }) => {
  //   addItemInSelection(selectYear, nome, codigo);
  // });
});

selectYear.addEventListener('change', async ({ target }) => {
  if (!target.value) return;
  const data = await fetchVehicle(
    selectType.value,
    selectBrand.value,
    selectModel.value,
    target.value
  );
  console.log(data);
});

window.onload = async () => {
  // console.log(await fetchVehicle('carros'));
};
