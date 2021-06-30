import Chart from 'chart.js/auto'
import { plotByGenderCtx } from './contexts'
import { plotByYearCtx } from './contexts'

const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"

/*Observaciones: 
1- En el .JSON hay 3 registros de 3 mujeres transexuales, así que serán agregadas a los datos de <<Mujeres>>
2- En el .JSON hay un registro no tiene fecha, así que se colocará en <<No registra>>
3- El último regristro en un registro vacio
*/


$(document).ready(function()
{
  // TODO: Haz una petición HTTP al endpoint declarado para obtener los datos
  axios({
    method: 'GET',
    url: endpoint
  }).then(res => {
    const datosJSON = res.data;

    // TODO: Actualiza el HTML con el número de líderes sociales asesinados
    $(contador).text(datosJSON.length -1)
    
    //Arreglos contenedores de los datos
    let genders=[0,3];
    let years=[1,0,0,0,0,0];
    let yearArray=[];
    
    //Bucles para hacer el recorrido y asiganar datos a los contadores
    for(let i=0;i<datosJSON.length;i++){
      switch(datosJSON[i]['genero']){
        case 'Masculino':
          genders[0]++;
          break;
        case "Femenino":
          genders[1]++;
          break;
      }
    }

    for(let i=0;i<datosJSON.length-2;i++){
      yearArray=datosJSON[i]['fecha'].split('-');
      switch(yearArray[0]){
        case '2016':
          years[1]++;
          break;
        case '2017':
          years[2]++;
          break;
        case '2018':
          years[3]++;
          break;
        case '2019':
          years[4]++;
          break;
        case '2020':
          years[5]++;
          break;
      }
    }

    // TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género

    //Creación de las gráficas

    //Por género
    const plotByGenderChart = new Chart(plotByGenderCtx, 
    {
      type: 'bar',
      data:
      {
        // FIXME: Actualiza esta propiedad -- Actualizado
        labels: ['Masculino', 'Femenino'],
        datasets: [
          {
            label: 'Número de líderes asesinados por género',
            // FIXME: Actualiza esta propiedad -- Actualizado
            data: [genders[0],genders[1]],
            backgroundColor: ['#086788','#FF5733']
          }
        ]
      },
    })


    // TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año
    //Por año
    const plotByYearChart = new Chart(plotByYearCtx, 
    {
      type: 'line',
      data: 
      {
        // FIXME: Actualiza esta propiedad -- Actualizado
        labels: ['No registra','2016','2017','2018','2019','2020'],
        datasets: [
          {
            label: 'Número de líderes asesinados por año',
            // FIXME: Actualiza esta propiedad -- Actualizado
            data: [years[0],years[1],years[2],years[3],years[4],years[5]],
            backgroundColor: ['#086788','#07A0C3','#f0c808','#ef798a','#855AFF','#5AFF5F']
          }
        ]
      }
    })
  })
})

