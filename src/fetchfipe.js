const URL = 'https://parallelum.com.br/fipe/api/v1';
let typeVehicle, brandCode, modelCode, yearCode;

const fetchVehicles = async (type) => {
  typeVehicle = type;
  const response = await fetch(`${URL}/${typeVehicle}/marcas`);
  const json = await response.json();
  return json;
};

const fetchBrands = async (brand) => {
  brandCode = brand;
  const response = await fetch(
    `${URL}/${typeVehicle}/marcas/${brandCode}/modelos`
  );
  const json = await response.json();
  return json;
};

const fetchModels = async (model) => {
  modelCode = model;
  const response = await fetch(
    `${URL}/${typeVehicle}/marcas/${brandCode}/modelos/${modelCode}/anos`
  );
  const json = await response.json();
  return json;
};

const fetchYears = async (year) => {
  yearCode = year;
  const response = await fetch(
    `${URL}/${typeVehicle}/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`
  );
  const json = await response.json();
  return json;
};

window.onload = async () => {
  const veiculo = await fetchVehicles('carros');
  const marcas = await fetchBrands(59);
  const modelos = await fetchModels(5585);
  const anos = await fetchYears('2012-3');

  console.log('MARCAS:', marcas);
  console.log('VEICULO:', veiculo);
  console.log('MODELOS:', modelos);
  console.log('ANOS:', anos);
};
