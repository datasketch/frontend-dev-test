import Chart from 'chart.js/auto'
import { plotByGenderCtx } from './contexts'

const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos
let json_ls;

await fetch(endpoint)
  .then(response => response.json())
  .then(data=>json_ls= data)
  .catch(e=>{
    console.error(e);
  })
  // console.log(json_ls); Data tipo json
  // console.log( Object.keys(json_ls).length); Total de datos recibidos

// TODO: Actualiza el HTML con el número de líderes sociales asesinados
//Limpieza de datos vacios en el objeto
function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || Object.keys(obj[propName]).length === 0) {
      delete obj[propName];
    }
  }
  return obj
}

let clean_ls = clean(json_ls);
let count_ls = Object.keys(clean_ls).length;
console.log(count_ls);


// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género

/* const plotByGenderChart = new Chart(plotByGenderCtx, {
  type: 'bar',
  data: {
    // FIXME: Actualiza esta propiedad
    labels: [],
    datasets: [
      {
        label: 'Líderes sociales asesinados por género',
        // FIXME: Actualiza esta propiedad
        data: [],
        backgroundColor: [
          '#086788',
          '#07A0C3',
          '#f0c808',
          '#ef798a'
        ]
      }
    ]
  }
}) */


// TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año