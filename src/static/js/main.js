import Chart from 'chart.js/auto'
import { plotByGenderCtx } from './contexts'
import { plotByYearCtx } from './contexts'
const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"
var data;
function listener() { 
  var totMas = 0, totFe = 0 , totTr = 0, totalReal=0, years=[], contAños=new Array(new Date().getFullYear()-2016);
  contAños.fill(0);
  for (let k = 0; k < new Date().getFullYear()-2016; k++) {
     years.push(k+2016); 
  }
  data=JSON.parse(this.response) 
  for (let i= 0; i < data.length; i++) {
    for (let j = 0; j < years.length; j++) {
      if(data[i]['fecha']){
        if(data[i]['fecha'].toString().includes(years[j])){
          contAños[j]++;
        }  
      }
    }
    if(JSON.stringify(data[i])!='{}'){
      totalReal=totalReal+1
    }
    if(data[i]['genero']==='Masculino'){
      totMas=totMas+1;
    }
    if(data[i]['genero']==='Femenino'){
      totFe=totFe+1;
    }
    if(data[i]['genero']=='Transgénero'){
      totTr=totTr+1;
    }
  }
  document.getElementById('lideresTotal').innerText=totalReal;  
  const plotByGenderChart = new Chart(plotByYearCtx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Líderes sociales asesinados por año',
          data: contAños,
          backgroundColor: [
            '#086788',
            '#07A0C3',
            '#f0c808',
            '#ef798a',
            '#A2C5AC',
            '#201E1F'
          ]
        }
      ]
    }
  })
  const plotByYearChart = new Chart(plotByGenderCtx, {
    type: 'bar',
    data: {
      // FIXME: Actualiza esta propiedad
      labels: ['Masculino', 'Femenino','Transgénero'],
      datasets: [
        {
          label: 'Líderes sociales asesinados por género',
          // FIXME: Actualiza esta propiedad
          data: [totMas,totFe,totTr],
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
}
const HTTP = new XMLHttpRequest();
HTTP.addEventListener('load', listener);
HTTP.open('GET',endpoint);
HTTP.send();