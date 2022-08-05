import React, { useState } from 'react'
import axios from 'axios'
import DateRange from './DateRange'
import Chart from './Chart'
import Button from './Button'
import { UserData } from '../constants/Data'
import './CompanyInfo.scss'

const CompanyInfo = () => {
  const [enteredText, setEnteredText] = useState('')
  const [stockPriceHistory, setStockPriceHistory] = useState('')
  const [constantCompanyData, setConstantCompanyData] = useState([])
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [startDateRange, setStartDateRange] = useState('')
  const [endDateRange, setEndDateRange] = useState('')
  const [showSelect, setShowSelect] = useState(false)
  const [selectedPriceValue, setSelectedPriceValue] = useState('h')
  const [generatedChart, setGeneratedChart] = useState({
    labels: UserData.map((item) => item.year),
    datasets: [
      {
        label: 'example',
        data: UserData.map((item) => item.highCost),
        backgroundColor: ['#25ced1', '#fceade', '#ff8a5b', '#ea526f'],
        borderColor: '#404040',
        borderWidth: 2,
      },
    ],
  })
  const symbolChangeHandler = (event) => {
    const check = /^[A-Za-z\s]*$/.test(event.target.value)
    if (check === true && [...enteredText].length < 35) {
      setEnteredText(event.target.value)
    } else setShowErrorMessage(true)
  }

  const getInfo = () => {
    const start = Math.floor(new Date(startDateRange).getTime() / 1000)
    const end = Math.floor(new Date(endDateRange).getTime() / 1000)
    axios
      .get(
        `https://finnhub.io/api/v1/stock/candle?symbol=${enteredText}&resolution=D&from=${start}&to=${end}&token=cbjoooaad3iarlnd68lg`,
      )
      .then((res) => {
        console.log(res.data)
        setStockPriceHistory(res.data)
        console.log(res.data)
        sendDataToServer(res.data)
        setShowSelect(true)
        console.log(selectedPriceValue)
        setGeneratedChart({
          labels: res.data.t.map((item) =>
            new Date(item * 1000).toLocaleDateString('en-US'),
          ),
          datasets: [
            {
              label: 'price',
              data: res.data[selectedPriceValue].map((item) => item),
              backgroundColor: ['#25ced1', '#fceade', '#ff8a5b', '#ea526f'],
              borderColor: 'white',
              borderWidth: 2,
            },
          ],
        },
        )
      })
  }

  const sendDataToServer = (dataTest) => {
    const dataForServer = {
      companyName: constantCompanyData.name,
      test: dataTest,
      openPrice: stockPriceHistory.o,
      closePrice: stockPriceHistory.c,
      highestPrice: stockPriceHistory.h,
      lowestPrice: stockPriceHistory.l,
    }
    axios
      .post('http://localhost:3005', dataForServer)
      .then((response) => {
        console.log('Data submitted successfully')
      })
      .catch((error) => {
        console.log('got errr while posting data', error)
      })
  }

  return (
    <div className="company-data">
      <div className="company-data__search">
        <form>
          <div className="company-data__search--name">
            <label>Symbol of the company:</label>
            {showErrorMessage ? (
              <p className="company-data__search--error">Invalid Input</p>
            ) : null}
            <div className="company-data__search--input-btn">
              <input
                className="company-data__search--input"
                type="text"
                placeholder="AAPL e.g."
                value={enteredText}
                onChange={symbolChangeHandler}
              />
              <Button
                enteredText={enteredText}
                setConstantCompanyData={setConstantCompanyData}
                setShowErrorMessage={setShowErrorMessage}
              />
            </div>
          </div>
        </form>
        {Object.keys(constantCompanyData).length !== 0 ? (
          <div className="company-data__list">
            <ul>
              <li onClick={getInfo}>
                Company name:{' '}
                <span className="company-data__list--name">
                  {constantCompanyData.name}
                </span>
              </li>
              <DateRange
                startDateRange={startDateRange}
                endDateRange={endDateRange}
                setStartDateRange={setStartDateRange}
                setEndDateRange={setEndDateRange}
              />
              <li>Country: {constantCompanyData.country}</li>
              <li>Currency: {constantCompanyData.currency}</li>
              <li>
                Web Url:{' '}
                <a
                  className="company-data__list--url"
                  href={constantCompanyData.weburl}
                >
                  {constantCompanyData.weburl}
                </a>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
      <Chart
        chartData={generatedChart}
        showSelect={showSelect}
        selectedPriceValue={selectedPriceValue}
        setSelectedPriceValue={setSelectedPriceValue}
      />
    </div>
  )
}

export default CompanyInfo
