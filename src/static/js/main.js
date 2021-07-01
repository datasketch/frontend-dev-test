import Chart from 'chart.js/auto'
import { plotByGenderCtx, plotByYearCtx } from './contexts'

const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos
const getLeaders = async(endpoint) => {
    try {
        //petición HTTP al endpoint declarado para obtener los datos (por fecha y genero)
        const response = await fetch(endpoint)
        const data = await response.json()
        const dataGendersAndYears = data.map(element => {
            const keys = Object.keys(element)
            if (keys.length > 0 && element.fecha) {
                const year = getYear(element.fecha)
                return {
                    genero: element.genero,
                    year
                }
            } else {
                return {}
            }
        })
        const cleanData = dataGendersAndYears.filter(element => Object.keys(element).length > 0)
        return cleanData
    } catch (error) {
        console.log(error)
        return []
    }
}

// TODO: Actualiza el HTML con el número de líderes sociales asesinados
const updateTotalLeaders = leaders => {
    const leadersDiv = document.getElementById("number-leaders")
    leadersDiv.innerHTML = leaders.length
}

// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género
const getTotalGenderFemale = leaders => leaders.reduce((accumulator, current) => current.genero === "Femenino" ? accumulator + 1 : accumulator, 0)
const getTotalGenderMale = leaders => leaders.reduce((accumulator, current) => current.genero === "Masculino" ? accumulator + 1 : accumulator, 0)
const getTotalGenderTrans = leaders => leaders.reduce((accumulator, current) => current.genero === "Transgénero" ? accumulator + 1 : accumulator, 0)
const drawChartGenders = leaders => {
    const totalMale = getTotalGenderMale(leaders)
    const totalFemale = getTotalGenderFemale(leaders)
    const totalTrans = getTotalGenderTrans(leaders)
    const plotByGenderChart = new Chart(plotByGenderCtx, {
        type: 'bar',
        data: {
            // FIXME: Actualiza esta propiedad
            labels: ["Hombres", "Mujeres", "Transgénero"],
            datasets: [{
                label: 'Líderes sociales asesinados por género',
                // FIXME: Actualiza esta propiedad

                data: [totalMale, totalFemale, totalTrans],
                backgroundColor: [
                    '#080426',
                    '#c307bd',
                    '#00db9d'
                ],
                color: '#000',

            }]
        }
    })
}

// TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año
const getYear = dateIn => {
    const date = new Date(Date.parse(dateIn))
    return date.getFullYear()
}
const totalMurdersForYears = leaders => {
    const firstYear = getYear(leaders[0].year)
    const totalMurders = [{
        year: firstYear,
        count: 1
    }]
    for (let index = 0; index < leaders.length; index++) {
        const element = leaders[index]
        const year = getYear(element.year)
        const foundIndex = totalMurders.findIndex(murder => murder.year === year)
        if (foundIndex > -1) {
            totalMurders[foundIndex].count = totalMurders[foundIndex].count + 1
        } else {
            totalMurders.push({
                year,
                count: 1
            })
        }
    }
    return totalMurders
}
const drawChartYears = leaders => {
    const dataForYear = totalMurdersForYears(leaders)
    const years = dataForYear.map(data => data.year.toString())
    const count = dataForYear.map(data => data.count)
    const plotByGenderChart = new Chart(plotByYearCtx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Líderes sociales asesinados por año',
                data: count,
                backgroundColor: [
                    '#080426'
                ],
                borderColor: '#000',
                borderWidth: 5,
            }]
        }
    })
}

const main = async() => {
    const leaders = await getLeaders(endpoint)
    updateTotalLeaders(leaders)
    drawChartGenders(leaders)
    drawChartYears(leaders)
}

main()