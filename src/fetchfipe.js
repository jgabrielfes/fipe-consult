const URL = 'https://parallelum.com.br/fipe/api/v1';

const fetchVehicles = async (type) => {
  const response = await fetch(
    `https://parallelum.com.br/fipe/api/v1/${type}/marcas`
  );
  const json = await response.json();
  return json;
};

const fetchModel = async (type, code, year) => {
  const response = await fetch(`${URL}/${type}/marcas/${code}/modelos`);
  const json = await response.json();
  return json;
};

window.onload = async () => {
  const data = await fetchVehicles('carros');
  const modelos = await fetchModel('carros', 59);
  console.log(modelos);
  console.log(data);
};
