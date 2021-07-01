import  Chart  from 'chart.js/auto';
import { plotByGenderCtx } from './contexts';


// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos

const endpoint =  "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json";


fetch(endpoint)
.then((resp) => resp.json())
.then((data) => {

console.log(data);

  let genero = data.map((elem) => {  

    return elem.genero
  
  });

  let keys = [];
  let values = [];
  let h = 0;
  let m = 0;
  let t = 0;

  for (let cont = 0; cont < genero.length; cont++) {

    if (genero[cont] === "Masculino") {

      h ++;
    }else if(genero[cont] === "Femenino"){
      m++
    }else if(genero[cont] === "Transgénero"){
      t++;
    }
  }
  const plotByGenderChart = new Chart(plotByGenderCtx, {
    type: 'bar',
    data: {
      // FIXME: Actualiza esta propiedad
      labels: ['Masculino', 'Femenino','Transgénero'],
      datasets: [
        {
          label: 'Líderes sociales asesinados por género',
          // FIXME: Actualiza esta propiedad
          data: [h,m,t],
          backgroundColor: [
            '#086788',
            '#07A0C3',
            '#f0c808',
            '#ef798a',
          ],
          borderColor: 'red',
        }
      ]
    }
  })

  keys = data.map(obj => obj.fecha);


  keys.forEach(function(numero) {
    values[numero] = (values[numero] || 0) + 1;
  });
  console.log(values);

  var ctx = document.getElementById('plot-by-year').getContext('2d');
var chart = new Chart(ctx, {
  type: 'line',
  data:{
    labels:keys,
    datasets: [{
      label: "número de líderes sociales asesinados por año",
      backgroundColor: 'rgb(0,176,80)',
      borderColor: "rgb(0,176,80)",
      data: values,
      fill: false
    }]
  }
})
 
})



// TODO: Actualiza el HTML con el número de líderes sociales asesinados


// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género






// TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año