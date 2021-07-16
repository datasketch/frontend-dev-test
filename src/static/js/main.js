// import Chart from 'chart.js/auto'
// import { plotByGenderCtx } from './contexts'

const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos

fetch(endpoint)
.then(res => res.json())
.then(Data => {
  actulizarCantidadLideresAsesindos(Data)
  lideresAsesinadosPorGenero(Data)
  lideresAsesinadosPorAno(Data)
})
// TODO: Actualiza el HTML con el número de líderes sociales asesinados

let actulizarCantidadLideresAsesindos = data => {

  const cantLideresAsesinados = data.length

  document.getElementById('cantidad-lideres-sociales-asesinados').innerHTML = cantLideresAsesinados
  
}

// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género


let lideresAsesinadosPorGenero = data => {

  let plotByGenderCtx = document.getElementById('plot-by-gender')
  let dictionaryGender = {}

  data.forEach(element => {
    if(!element.genero){
      if(['Sin genero definido'] in dictionaryGender){
        ++dictionaryGender[['Sin genero definido']]
      }else{
        dictionaryGender[['Sin genero definido']] = 1
      }
    }else{
      if(element.genero in dictionaryGender){
        ++dictionaryGender[element.genero]
      }else{
        dictionaryGender[element.genero] = 1
      }
    }
  })
  
  const plotByGenderChart = new Chart(plotByGenderCtx, {
    type: 'bar',
    data: {
      // FIXME: Actualiza esta propiedad
      labels: Object.keys(dictionaryGender),
      datasets: [
        {
          label: 'Líderes sociales asesinados por género',
          // FIXME: Actualiza esta propiedad
          data: Object.values(dictionaryGender),
          backgroundColor: [
            '#086788',
            '#07A0C3',
            '#f0c808',
            '#ef798a'
          ],
        }
      ]
    },
    options : {
      legend : {
        display : false,
        position: 'top',
        labels:{
          fontColor: '#333'
        }
      }
    }
  }) 
}



// TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año

let lideresAsesinadosPorAno = data => {

  let plotByYearCtx = document.getElementById('plot-by-year')
  let diccionarioAno = {}

  data.forEach(element => {
    if(!element.fecha){
      if(['Sin fecha'] in diccionarioAno){
        ++diccionarioAno[['Sin fecha']]
      }else{
        diccionarioAno[['Sin fecha']] = 1
      }
    }else{
      let ano = element.fecha.split('-')
      if(ano[0] in diccionarioAno){
        ++diccionarioAno[ano[0]]
      }else{
        diccionarioAno[ano[0]] = 1
      }
    }
  })
  
  const plotByGenderChart = new Chart(plotByYearCtx, {
    type: 'bar',
    data: {
      // FIXME: Actualiza esta propiedad
      labels: Object.keys(diccionarioAno),
      datasets: [
        {
          label: 'Líderes sociales asesinados por Año',
          // FIXME: Actualiza esta propiedad
          data: Object.values(diccionarioAno),
          backgroundColor: [
            '#086788',
            '#07A0C3',
            '#f0c808',
            '#ef798a',
            '#BC60C4',
            '#3EECC8 '
          ]
        }
      ]
    }
  }) 
}