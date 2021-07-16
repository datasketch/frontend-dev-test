import Chart from 'chart.js/auto'
import { plotByGenderCtx, plotByYearCtx } from './contexts'

const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"

// Objeto que guarda los lideres sociales muertos por año
let dateLeaders = {
  '2016': 0,
  '2017': 0,
  '2018': 0,
  '2019': 0,
  '2020': 0
}

let male = 0;
let female = 0;

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos

fetch(endpoint)
  .then(res => res.ok ? res.json() : Promise.reject(res))
  .then(res => {
    console.log(res)
    res.forEach(el => {

      if (el.genero === "Masculino") {
        male++
      } else if (el.genero !== undefined) {
        female++
      }

      if (el.fecha !== undefined) {
        let date = el.fecha.split('-');
        dateLeaders = {
          ...dateLeaders,
          [date[0]]: dateLeaders[date[0]] + 1
        }
      }

      /* console.log() */


    });
    console.log(dateLeaders)
    // Se actualiza data del grafico de lideres sociales asesinados por genero.
    plotByGenderChart.data.datasets[0].data = [male, female]
    plotByGenderChart.update()

    //
    plotByYear.data.datasets[0].data = [
      dateLeaders[2016],
      dateLeaders[2017],
      dateLeaders[2018],
      dateLeaders[2019],
      dateLeaders[2020]
    ]
    plotByYear.update();

    // TODO: Actualiza el HTML con el número de líderes sociales asesinados
    document.querySelector('.section-title').textContent = male + female;

  }).
  catch(() => {
    // Si ocurre un error en la peticion se activara un mensaje de error y se eliminaran ambas graficas.
    document.querySelector('.error').classList.remove('disabled');
    plotByGenderChart.destroy();
    plotByYear.destroy();
  })


// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género

const plotByGenderChart = new Chart(plotByGenderCtx, {
  type: 'bar',
  data: {
    // FIXME: Actualiza esta propiedad
    labels: ['Hombres', 'Mujeres'],
    datasets: [
      {
        label: '# Lideres sociales asesinados',
        // FIXME: Actualiza esta propiedad
        data: [0, 0],

        backgroundColor: [
          'rgba(255, 0, 0, 0.5)',
          'rgba(54, 162, 235, 0.5)',
        ]
      },

    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 17
          }
        }
      },
      title: {
        display: true,
        text: 'Lideres sociales asesinados por genero desde 2016 a Mayo 2020',
        font: {
          family: "IBM Plex Sans",
          size: '19rem',
          lineHeight: 1
        }
      }
    },
    tooltip: {
      enabled: true
    },
    hover: {
      animationDuration: 1
    },
    
  }
})


// TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año

const plotByYear = new Chart(plotByYearCtx, {
  type: 'line',
  data: {
    labels: ['2016', '2017', '2018', '2019', '2020'],
    datasets: [
      {
        label: '# Lideres sociales asesinados',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          'rgba(220, 20, 60, 0.5)',
          'rgba(143, 188, 143, 0.5)',
          'rgba(0, 255, 0, 0.5)',
          'rgba(0, 206, 209, 0.5)',
          'rgba(105, 105, 105, 0.5)',
        ]
      },

    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 17
          }
        }
      },
      title: {
        display: true,
        text: 'Lideres sociales asesinados por año',
        font: {
          family: "IBM Plex Sans",
          size: '22rem'
        }
      }
    }
  }
})