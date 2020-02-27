import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Inside, useInside } from 'use-inside'

function Card({ insideName }) {
  const [inside, data] = useInside(insideName)
  return (
    <div
      style={{
        width: '300px',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...data,
      }}
    >
      <h2>{inside && insideName}</h2>
    </div>
  )
}

Card.propTypes = {
  insideName: PropTypes.string.isRequired,
}

function App() {
  return (
    <>
      <h1>use-inside</h1>
      <Inside name="Card:red" data={{ backgroundColor: 'red' }}>
        <Card insideName="Card:red" />
      </Inside>
      <Inside
        name="Card:blue"
        data={{ backgroundColor: 'blue', marginTop: '24px' }}
      >
        <Card insideName="Card:blue" />
      </Inside>
    </>
  )
}

ReactDOM.render(
  <>
    <App />
    <style>
      {`
        body {
          width: 40rem;
          margin: 0 auto;
          font-family: sans-serif;
          font-size: 18px;
          line-height: 1.5;
        }
        h1 {
          font-weight: 400;
        }
      `}
    </style>
  </>,
  document.querySelector('#app')
)
