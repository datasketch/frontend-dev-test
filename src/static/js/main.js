import { plotByGenderCtx, plotByYearCtx } from './contexts'
import { createChart } from './utils'

const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"


;(async () => {
  try {
    const response = await fetch(endpoint)
    const data = await response.json()
    document.querySelector('.section-title').textContent = data.length

    const initialValue = {
      byGender: {},
      byYear: {}
    }

    const aggregatedData = data.reduce((result, record) => {
      const gender = record.genero
      const date = record.fecha

      if (!gender || !date) {
        return result
      }

      const year = new Date(date).getFullYear()

      result.byYear[year] = result.byYear[year] ? result.byYear[year] +  1 : 1
      result.byGender[gender] = result.byGender[gender] ? result.byGender[gender] + 1 : 1

      return result
    }, initialValue)

    const plotByGenderChart = createChart({
      ctx: plotByGenderCtx,
      type: 'bar',
      label: 'Líderes sociales asesinados por género',
      dataLabels: Object.keys(aggregatedData.byGender),
      dataValues: Object.values(aggregatedData.byGender),
    })
    
    const plotByYearChart = createChart({
      ctx: plotByYearCtx,
      type: 'line',
      label: 'Líderes sociales asesinados por año',
      dataLabels: Object.keys(aggregatedData.byYear),
      dataValues: Object.values(aggregatedData.byYear),
    })

  } catch (error) {

  }
})()
