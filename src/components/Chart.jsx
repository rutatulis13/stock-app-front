import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import './Chart.scss'

const Chart = ({
  chartData,
  showSelect,
  selectedPriceValue,
  setSelectedPriceValue,
}) => {
  const changeSelect = (e) => {
    setSelectedPriceValue(e.target.value)
  }

  console.log(selectedPriceValue)
  return (
    <div className="chart">
      <Line data={chartData} />
      {!!showSelect ? (
        <form>
          <p>Select:</p>
          <select
            className="chart__select-prices"
            value={selectedPriceValue}
            onChange={changeSelect}
          >
            <option value="l">Low Price</option>
            <option value="c">Close Price</option>
            <option value="o">Open Price</option>
            <option value="h">High Price</option>
          </select>
        </form>
      ) : null}
    </div>
  )
}

export default Chart
