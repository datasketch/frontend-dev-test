import Chart from 'chart.js/auto'
import { plotByGenderCtx } from './contexts'
import { plotByYearCtx } from './contexts';

const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos

//**Generic error handling function for reusable purposes
function handError(response){
  if (!response.ok){
    throw Error(response.statusText);
  }
  return response;
}
/*Taking the path to the source we want to fetch then retrieveing the data using 
json() method and showing the current data via console and if errors ocurred*/

async function fetchData(){
  let response = await fetch(endpoint).then(handError)
  let data = await response.json();
  return data;
}

fetchData()
  .then(valor => console.log(valor))
  .catch(error => console.log(error))

// TODO: Actualiza el HTML con el número de líderes sociales asesinados

/* Retrieving the number of elements in the JSON array, verifying if elements exists and updating the number on the HTML section-title*/

const Data = await fetchData();
const num = document.getElementById("section-title");

  if(Data.length > 0){
    num.innerHTML = Data.length-1;
  }else{
    num.innerHTML = "No hay información disponible";
  }

console.log(Data.length);

// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género

/*Getting the elements of the JSON array in order to get gender, whit var gender*/

  var gender = new XMLHttpRequest();
  gender.open("GET",endpoint,true);
  gender.send();
  gender.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      var datosg = JSON.parse(this.responseText);
      
      var generos = datosg.map(function(e){
        return e.genero;
      });
      console.log(generos);
      
      /*counter for gender*/
      var men = 0;
      var women = 0;

      /*Object with the amount of deaths per year for man and women*/
      let muertes = {
        año1: 0,
        año2: 0,
        año3: 0,
        año4: 0,
        año5: 0
      }

      let muertesm = {
        año1: 0,
        año2: 0,
        año3: 0,
        año4: 0,
        año5: 0
      }
      /* Obtains the number of man and women for the graph "Líderes sociales asesinados por género"*/
      for (var i = 0; i < generos.length; i++){
        if(generos[i] == "Masculino"){
          men++;
        }else if(generos[i] == "Femenino"){
          women++;
        }
      }
      /*años -> contains the dates of each person while as " " while 
      temp has them as int using the function parseInt()*/
      var años = datosg.map(function(e){
        return e.fecha;
      });

      var temp = años.map(function(v){
        return parseInt(v,10);
      });

      /*finaly -> contains just the first item of each element of the 
      temp array containing the years without repeating the numbers*/
      let finaly = temp.filter((item,index)=>{
        return temp.indexOf(item) === index;
      });

      console.log(años);
      console.log(finaly);

    /*Comparing both sets of arrays for gender and years in order to get the number of deaths per year*/
    for (var i = 0; i < Data.length; i++){
      if(generos[i] == "Masculino"){
        if(temp[i] == "2016"){
          muertes.año1++;
        }else if(temp[i] == "2017"){
          muertes.año2++;
        }else if(temp[i] == "2018"){
          muertes.año3++;
        }else if(temp[i] == "2019"){
          muertes.año4++;
        }else if(temp[i] == "2020"){
          muertes.año5++;
        }
      }else if(generos[i] == "Femenino"){
        if(temp[i] == "2016"){
          muertesm.año1++;
        }else if(temp[i] == "2017"){
          muertesm.año2++;
        }else if(temp[i] == "2018"){
          muertesm.año3++;
        }else if(temp[i] == "2019"){
          muertesm.año4++;
        }else if(temp[i] == "2020"){
          muertesm.año5++;
        }
      }
    
    }
    /*Setting the first bar chart with gender as "labels" on the x axis*/
      const plotByGenderChart = new Chart(plotByGenderCtx, {
        type: 'bar',
        data: {
          labels: ['Hombres', 'Mujeres'],
          datasets: [
            {
              // FIXME: Actualiza esta propiedad
              data: [men,women],
              backgroundColor: [
                'rgba(54, 162, 240, 0.2)',
                'rgba(255, 99, 132, 0.2)'
              
              ],
              borderColor:[
                'rgb(153, 102, 255)',
                'rgb(255, 99, 132)'
              ],
              borderWidth: 3
            }
          ]
        },
        options:{
          responsive: true,   
          scales:{
            y:{
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false,
              position: 'top',
            },
            title:{
              display: true,
              text: 'Líderes sociales asesinados por género',
              font:{
                size: 20
              }

            }
          }
        }
      })
      // TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año
      
      /*Setting the second bar chart with year as "labels" on the x axis*/
      const plotByYearChart = new Chart(plotByYearCtx, {
        type: 'line',
        data: {
         
          labels: finaly,
          datasets: [
            {
              // FIXME: Actualiza esta propiedad
              label: 'Hombres',
              data: [muertes.año1,muertes.año2, muertes.año3, muertes.año4, muertes.año5],
              backgroundColor: [
                'rgba(54, 162, 240, 0.2)',
              ],
              borderColor:[
                'rgb(153, 102, 255)',
              ],
              borderWidth: 3
            },{
              label: 'Mujeres',
              data: [muertesm.año1,muertesm.año2, muertesm.año3, muertesm.año4, muertesm.año5],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor:[
                'rgb(255, 99, 132)',
              ],
              borderWidth: 3
            }
          ]
        },
        options:{
          responsive: true,
          scales:{
            y:{
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'top',
            },
            title:{
              display: true,
              text: 'Líderes sociales asesinados por año',
              font:{
                size: 20
              }
            }
          }
        }
      });
    }   

  }



