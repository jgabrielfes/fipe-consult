const URL = 'https://parallelum.com.br/fipe/api/v1';

const fetchVehicle = async (type, brand, model, year) => {
  const response = await fetch(`${URL}/${type}/marcas
  ${!brand ? '' : `/${brand}/modelos
  ${!model ? '' : `/${model}/anos
  ${!year ? '' : `/${year}`}`}`}`);
  const json = await response.json();
  return json;
};
