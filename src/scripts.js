const selectTypeChildren = document.getElementById('select-type').children;
$('.ui.dropdown').dropdown();

function addItemInSelection(text, dataValue) {
  const item = document.createElement('div');
  item.className = 'item';
  item.innerText = text;
  item.dataset.value = dataValue;
}

[...selectTypeChildren].forEach((children) => {
  children.addEventListener('click', addItemInSelection);
});

window.onload = async () => {
  console.log(await fetchVehicle('carros'));
}
