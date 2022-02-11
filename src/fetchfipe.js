const URL = 'https://parallelum.com.br/fipe/api/v1';
let typeVehicle, brandCode, modelCode, yearCode;

const test = async (type, brand, model, year) => {
  const response = await fetch(`${URL}/${type}/marcas${
    !brand ? '' : `/${brand}/modelos${
    !model ? '' : `/${model}/anos${
    !year ? '' : `/${year}`
    }`}`}`);
  const json = await response.json();
  return json;
};

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
