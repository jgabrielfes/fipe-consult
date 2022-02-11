$('.ui.dropdown').dropdown();

window.onload = async () => {
  const veiculo = await fetchVehicles('carros');
  const marcas = await fetchBrands(59);
  const modelos = await fetchModels(5585);
  const anos = await fetchYears('2012-3');

  // console.log('MARCAS:', marcas);
  // console.log('VEICULO:', veiculo);
  // console.log('MODELOS:', modelos);
  // console.log('ANOS:', anos);
  console.log('link:', await test('carros', 59, 5585));
};
