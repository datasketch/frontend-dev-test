import Chart from 'chart.js/auto'
import { plotByGenderCtx } from './contexts'

const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos

let lidersArray = [];

async function fetchSocialLiders () {
  try{
    const fetchedData = await fetch(endpoint);
    const result = await fetchedData.json();
    lidersArray = result;
  } catch (error) {
    if (error) throw error;
  };
};

// TODO: Actualiza el HTML con el número de líderes sociales asesinados

window.addEventListener("load", async () => {
  const lidersNumber = document.getElementsByClassName("section-title")[0];
  await fetchSocialLiders();
  lidersNumber.innerHTML = lidersArray.length;
});


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