import Chart from 'chart.js/auto'
import { plotByGenderCtx } from './contexts'
import { plotByYearCtx } from './contexts'

const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos

const obtenerDatos = async () => {
  try {
    const res = await fetch(endpoint)
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error);
  }
}
const data = await obtenerDatos()

// TODO: Actualiza el HTML con el número de líderes sociales asesinados

let LideresAsesinados = document.querySelector(".section-title");
LideresAsesinados.innerHTML = data.length

// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género

const plotByGenderChart = new Chart(plotByGenderCtx, {
  type: 'bar',
  data: {
    // FIXME: Actualiza esta propiedad
    labels: ['Femenino', 'Masculino', 'Otro'],
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
}) 

let masculinos = data.filter(value => value.genero == "Masculino")
let femeninos = data.filter(value => value.genero == "Femenino")
let otros = data.filter(value => value.genero !== "Femenino" && value.genero !== "Masculino")

plotByGenderChart.data['datasets'][0].data.push(femeninos.length, masculinos.length, otros.length)

// TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año

const plotByYearChart = new Chart(plotByYearCtx, {
  type: 'bar',
  data: {
    labels: ['2016', '2017', '2018', '2019', '2020', 'otro'],
    datasets: [
      {
        label: 'Líderes sociales asesinados por año',
        data: [],
        backgroundColor: [
          '#e36b2c',
          '#07A0C3',
          '#f0c808',
          '#c82a54',
          '#6dc36d',
          '#e69dfb',
          '#f0c808',
          '#ef798a'
        ]
      }
    ]
  }
}) 

let year2016 = data.filter(value => {
  let fecha = new String(value.fecha)
  let year = fecha.substr(0, 4);
  return year == "2016"
})
let year2017 = data.filter(value => {
  let fecha = new String(value.fecha)
  let year = fecha.substr(0, 4);
  return year == "2017"
})
let year2018 = data.filter(value => {
  let fecha = new String(value.fecha)
  let year = fecha.substr(0, 4);
  return year == "2018"
})
let year2019 = data.filter(value => {
  let fecha = new String(value.fecha)
  let year = fecha.substr(0, 4);
  return year == "2019"
})
let year2020 = data.filter(value => {
  let fecha = new String(value.fecha)
  let year = fecha.substr(0, 4);
  return year == "2020"
})

let otherYear = data.filter(value => {
  let fecha = new String(value.fecha)
  let year = fecha.substr(0, 4);
  return year !== "2016" && year !== "2017" && year !== "2018" && year !== "2019" && year !== "2020" 
})

plotByYearChart.data['datasets'][0].data.push(year2016.length, year2017.length, year2018.length, year2019.length, year2020.length, otherYear.length)