

const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json";

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos
const $lideresAsesinados= document.getElementById("lideresAsesinados");

async function getData(){
  // Llamada a la API. uso fetch, que viene nativamente en JS.
  let data = await fetch(endpoint);
  // Decodificar como JSON
  let dataJson = await data.json();
  const count = Object.keys(dataJson).length;
  $lideresAsesinados.innerHTML = count;
  showChart(dataJson);

}
// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género

function showChart(dataJson){
  console.log(dataJson);
  var masculino = 0;
  var femenino = 0;
  dataJson.forEach(function(el) {
    if(el.genero === "Masculino"){
      masculino++;
    }
    if(el.genero === "Femenino"){
      femenino++;
    }
  });
  console.log(masculino);
  console.log(femenino);
  const plotByGenderCtx = document.getElementById('plot-by-gender').getContext('2d');
  const plotByGenderChart = new Chart(plotByGenderCtx, {
    type: 'bar',
    data: {
      // FIXME: Actualiza esta propiedad
      labels: ['Masculino', 'Femenino'],
      datasets: [
        {
          label: 'Líderes sociales asesinados por género',
          // FIXME: Actualiza esta propiedad
          data: [masculino, femenino],
          backgroundColor: [
            '#086788',
            '#07A0C3',
            '#f0c808',
            '#ef798a'
          ]
        }
      ]
    }
  })
  // TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año
  const mapFecha = dataJson.map(e => e.fecha);
  //console.log(mapFecha);
  const filterYear2016 = mapFecha.filter(item => {
    return item <= "2016-12-31";
  });
  const muertes2016 = filterYear2016.length;
  console.log(filterYear2016.length);


  const filterYear2017 = mapFecha.filter(item => {
    return item <= "2017-12-31" ;
  });
  const muertes2017 = filterYear2017.length-filterYear2016.length;
  console.log(muertes2017);


  const filterYear2018 = mapFecha.filter(item => {
    return item <= "2018-12-31" ;
  });
  const muertes2018 = filterYear2018.length-filterYear2017.length;
  console.log(muertes2018);


  const filterYear2019 = mapFecha.filter(item => {
    return item <= "2019-12-31" ;
  });
  const muertes2019 = filterYear2019.length-filterYear2018.length;
  console.log(muertes2019);


  const filterYear2020 = mapFecha.filter(item => {
    return item <= "2020-12-31" ;
  });
  const muertes2020 = filterYear2020.length-filterYear2019.length;
  console.log(muertes2020);


  const plotByYearCtx = document.getElementById('plot-by-year').getContext('2d');
  const plotByYearChart = new Chart(plotByYearCtx, {
    type: 'line',
    data: {
      // FIXME: Actualiza esta propiedad
      labels: [2016, 2017, 2018, 2019, 2020],
      datasets: [
        {
          label: 'Líderes sociales asesinados por año',
          // FIXME: Actualiza esta propiedad
          data: [muertes2016, muertes2017, muertes2018, muertes2019, muertes2020],
          backgroundColor: [
            '#086788',
            '#07A0C3',
            '#f0c808',
            '#ef798a'
          ]
        }
      ]
    }
  })
}


getData();
