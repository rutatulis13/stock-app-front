import React from 'react'
import axios from 'axios'
import './Button.scss'

const Button = ({
  enteredText,
  setConstantCompanyData,
  setShowErrorMessage,
}) => {
  const submitHandler = () => {
    axios
      .get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${enteredText}&token=cbjoooaad3iarlnd68lg`,
      )
      .then((res) => {
        if (Object.keys(res.data).length === 0) {
          setShowErrorMessage(true)
        }
        setConstantCompanyData(res.data)
        console.log(res.data)
      })
  }
  return (
    <button className="button" type="button" onClick={submitHandler}>
      Search
    </button>
  )
}

export default Button
