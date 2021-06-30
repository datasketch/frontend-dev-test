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
  $.getJSON(endpoint, function(result)
  {
    // TODO: Actualiza el HTML con el número de líderes sociales asesinados
    $(contador).text(result.length -1)
    // TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género
    
    //Contadores Para agrupar datos
    let contadorMaculino= 0;
    let contadorFemenino= 3;
    let year2016 = 0;
    let year2017 = 0;
    let year2018 = 0;
    let year2019 = 0;
    let year2020 = 0;
    let sinFecha = 1;
    
    //Bucles para hacer el recorrido y asiganar datos a los contadores
    for(let i=0;i<result.length;i++){
      if(result[i]['genero']==="Masculino"){
        contadorMaculino++;
      }else if(result[i]['genero']==="Femenino"){
        contadorFemenino++;
      }
    }

    for(let i=0;i<result.length-2;i++){
      var yearArray=result[i]['fecha'].split('-');
      if(yearArray[0]=="2016"){
        year2016++;
      }else if(yearArray[0]=="2017"){
        year2017++;
      }else if(yearArray[0]=="2018"){
        year2018++;
      }else if(yearArray[0]=="2019"){
        year2019++;
      }else if(yearArray[0]=="2020"){
        year2020++;
      }
    }


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
            data: [contadorMaculino,contadorFemenino],
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
            data: [sinFecha,year2016,year2017,year2018,year2019,year2020],
            backgroundColor: ['#086788','#07A0C3','#f0c808','#ef798a','#855AFF','#5AFF5F']
          }
        ]
      }
    })

  })
})

