const selectTypeChildren = document.getElementById('select-type').children;
const selectBrand = document.getElementById('select-brand')
$('.ui.dropdown').dropdown();

function addItemInSelection(parent,text, dataValue) {
  const item = document.createElement('div');
  item.className = 'item';
  item.innerText = text;
  item.dataset.value = dataValue;
  parent.appendChild(item)
}

[...selectTypeChildren].forEach((children) => {
  children.addEventListener('click', async () => {
    const data = await fetchVehicle(children.dataset.value)
    const {nome,codigo} = data
    data.forEach(({nome,codigo}) => {
      addItemInSelection(selectBrand,nome,codigo)
    })
  });
});

window.onload = async () => {
  // console.log(await fetchVehicle('carros'));
}
