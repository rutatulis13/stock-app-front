import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import './Chart.scss'

const Chart = ({ chartData }) => {
  return (
    <div className="chart">
      <Line data={chartData} />
    </div>
  )
}

export default Chart
