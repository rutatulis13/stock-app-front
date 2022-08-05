import React, { useState, useEffect } from 'react'
import './DateRange.scss'

const DateRange = ({
  startDateRange,
  endDateRange,
  setStartDateRange,
  setEndDateRange,
}) => {
  const [minValue, setMinValue] = useState('')
  const [todayValue, setTodayValue] = useState('')

  useEffect(() => {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    let yyyy = today.getFullYear()
    let yyyyBefore = today.getFullYear() - 1
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd
    setTodayValue(today)
    setMinValue(yyyyBefore + '-' + mm + '-' + dd)
    console.log(today)
  }, [])

  const startDateChangeHandler = (event) => {
    setStartDateRange(event.target.value)
  }
  const endDateChangeHandler = (event) => {
    setEndDateRange(event.target.value)
  }

  return (
    <div className="data-range__control">
      <label className="data-range__control--label">Select date range</label>
      <br />
      <label className="data-range__control--label">From</label>
      <input
        type="date"
        min={minValue}
        max={todayValue}
        value={startDateRange}
        onChange={startDateChangeHandler}
      />
      <label className="data-range__control--label">To</label>
      <input
        type="date"
        min={minValue}
        max={todayValue}
        value={endDateRange}
        onChange={endDateChangeHandler}
      />
    </div>
  )
}

export default DateRange
