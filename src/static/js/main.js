import Chart from 'chart.js/auto'
import { plotByGenderCtx } from './contexts'
import { plotByYearCtx } from './contexts'
import { getYear } from 'date-fns'



const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"
let numLideresAsesinados = 0;
var options = {
  responsive:true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      stacked: true,
      gridLines: {
        display: true,
        color: "rgba(255,99,132,0.2)"
      }
    }],
    xAxes: [{
      gridLines: {
        display: false
      }
    }]
  }
};
let labelGender = [];
let dataGender = [];
let labelYear = [];
let dataYear = [];

fetch(endpoint)
.then(data => {return data.json()})
.then((res) => {
  numLideresAsesinados = res.length;
  numeroLideresAsesinados.innerHTML= numLideresAsesinados.toString();
  res.forEach(element => {
    createLabelGender(element)
    createLabelYear(element)
  });
  createDataYear(res);
  createDataGender(res);
})
.catch(err =>{console.error('error', err)})

let numeroLideresAsesinados = document.getElementById('numeroLideresAsesinados');

function createLabelGender(element){
  
  if(element.genero){
    if(labelGender.length >0){
      let encontrado = labelGender.find((res)=>{
        return res == element.genero
      });
      if(!encontrado){
        labelGender.push(element.genero)
      }
    }else{
      labelGender.push(element.genero)
    }
  } 

}

function createLabelYear(element){
  let fecha = new Date(element.fecha)
  let anio= getYear(fecha)
  if(anio){
    if(labelYear.length > 0){
      let encontrado = labelYear.find((res)=>{
        return res == anio
      });
      if(!encontrado){
        labelYear.push(anio)
      }
    }else{
      labelYear.push(anio)
    }
  }

}
function createDataYear(res){
  labelYear.forEach(element => {
    let value;
    value = res.filter((item)=>{
      let fecha = new Date(item.fecha)
      let anio= getYear(fecha)
      if (anio == element){
        return item
      }
    })
    dataYear.push(value.length)
  });
  lineYear();
}
function createDataGender(res){
  labelGender.forEach(element => {
    let value;
    value = res.filter((item)=>{
      if (item.genero == element){
        return item
      }
    })
    dataGender.push(value.length)
  });
  barGender();
}

function barGender(){
  const plotByGenderChart = new Chart(plotByGenderCtx, {
    type: 'bar',
    data: {
      labels: labelGender,
      datasets: [
        {
          label: 'Líderes sociales asesinados por género',
          data: dataGender,
          backgroundColor: [
            '#086788',
            '#07A0C3',
            '#f0c808',
            '#ef798a'
          ],
          options:options,
        }
      ]
    }
  });
}
function lineYear(){
  const plotByYearChart = new Chart(plotByYearCtx, {
    type: 'line',
    data: {
      labels: labelYear,
      datasets: [
        {
          label: 'Líderes sociales asesinados por año',
          data: dataYear,
          backgroundColor: [
            '#086788',
            '#07A0C3',
            '#f0c808',
            '#ef798a'
          ],
          options:options,
        }
      ]
    }
  })
}