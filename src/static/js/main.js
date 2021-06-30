import Chart from 'chart.js/auto'
import estadisticas  from './contexts'

const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"


const cargarDatos = async () => {
  try {
    const res = await fetch(endpoint)
    const datos = await res.json()
    document.getElementsByClassName("section-title")[0].textContent = datos.length -1

    // Separación de lideres sociales por genero
    const Mujeres = datos.filter(data => data.genero === "Femenino")
    const Hombres = datos.filter(data => data.genero === "Masculino")
    const Transgenero = datos.filter(data => data.genero === "Transgénero")
    const lideresPorGenero = [parseInt(Hombres.length) , parseInt(Mujeres.length), parseInt(Transgenero.length)]
    
    // Separación de lideres sociales por año   
    const lideresPorAño = [
      datos.filter(data => data.fecha ?  data.fecha.substr(0,4) === "2016" : null ).length,
      datos.filter(data => data.fecha ?  data.fecha.substr(0,4) === "2017" : null ).length,
      datos.filter(data => data.fecha ?  data.fecha.substr(0,4) === "2018" : null ).length,
      datos.filter(data => data.fecha ?  data.fecha.substr(0,4) === "2019" : null ).length,
      datos.filter(data => data.fecha ?  data.fecha.substr(0,4) === "2020" : null ).length
    ]

    const plotByGenderChart = new Chart(estadisticas.genero, {
      type: 'bar',
      data: {
        // FIXME: Actualiza esta propiedad
        labels: ["Hombres", "Mujeres" , "Transgénero"],
        datasets: [
          {
            label: 'Líderes sociales asesinados por género',
            // FIXME: Actualiza esta propiedad
            data: lideresPorGenero,
            backgroundColor: [
              '#086788',
              '#07A0C3',
              '#f0c808',
              '#ef798a',
              '#f0c808'
            ]
          }
        ]
      }
    })

    const plotByYearChart = new Chart(estadisticas.anual, {
      type: 'bar',
      data: {
        // FIXME: Actualiza esta propiedad
        labels: ["2016", "2017" , "2018" , "2019" , "2020"],
        datasets: [
          {
            label: 'Líderes sociales asesinados por año',
            // FIXME: Actualiza esta propiedad
            data: lideresPorAño,
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

  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded" , cargarDatos)