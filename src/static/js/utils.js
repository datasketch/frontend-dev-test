import Chart from 'chart.js/auto'

function createChart(opts) {
  const chart = new Chart(opts.ctx, {
    type: opts.type,
    data: {
      labels: opts.dataLabels,
      datasets: [
        {
          label: opts.label,
          data: opts.dataValues,
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
  return chart
}

export { createChart }