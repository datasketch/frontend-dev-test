import Chart from 'chart.js/auto'
import { plotByGenderCtx } from './contexts'

const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos
const dataApi = async () => {
  const api = await fetch(endpoint);
  const data = await api.json();
 // actualizarLideres(data.length)

  return data;
}

const result = await dataApi();


// TODO: Actualiza el HTML con el número de líderes sociales asesinados
const lideres = document.querySelector('#lideres');
lideres.innerHTML = result.length;

// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género
const lideresFemenino = result.filter(lider => lider.genero == 'Femenino');
const lideresMasculino = result.filter(lider => lider.genero == 'Masculino');
const Transgénero = result.filter(lider => lider.genero != 'Masculino' && lider.genero != 'Femenino');

const plotByGenderChart = new Chart(plotByGenderCtx, {
  type: 'bar',
  data: {
    // FIXME: Actualiza esta propiedad
    labels: ['Femenino', 'Masculino', 'Transgénero'],
    datasets: [
      {
        label: 'Líderes sociales asesinados por género',
        // FIXME: Actualiza esta propiedad
        data: [
          lideresFemenino.length,
          lideresMasculino.length,
          Transgénero.length
        ],
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