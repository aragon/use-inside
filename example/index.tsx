import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { Inside, useInside } from 'use-inside'

type CardProps = {
  header?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  color: string
}

function Card({ header, children, footer, color = 'white' }: CardProps) {
  // Inside elements can be seen as a way to declare “slots” in the component.
  // They can be seen as part of its API, and are particularily useful for reusable
  // components that need to behave differently based on where they are being used.
  return (
    <Inside name="Card" data={{ cardColor: color }}>
      <section
        style={{
          background: color,
          textAlign: 'center',
          marginBottom: '8px',
        }}
      >
        <h1>
          <Inside name="Card:header">{header}</Inside>
        </h1>
        <div>
          <Inside name="Card:content">{children}</Inside>
        </div>
        <footer>
          <Inside name="Card:footer">{footer}</Inside>
        </footer>
      </section>
    </Inside>
  )
}

type ButtonProps = {
  label: string
}

function Button({ label }: ButtonProps) {
  // true if Button is being used inside of Card
  const [insideCard, cardData] = useInside('Card')

  // @ts-ignore
  const buttonColor = insideCard ? cardData.cardColor : 'grey'

  // true if Button is being used inside of the Card’s footer
  const [insideCardFooter] = useInside('Card:footer')

  return (
    <button
      style={{
        background: buttonColor,
        fontWeight: insideCard ? 'bold' : 'normal',
        width: insideCardFooter ? '100%' : 'auto',
      }}
    >
      {label}
    </button>
  )
}

function App() {
  // The Button’s text will be bold and have “tomato” as a background color
  const card1 = (
    <Card color="tomato">
      <Button label="Card button" />
    </Card>
  )

  // Button will get a 100% width and have “papayawhip” as a background color
  const card2 = (
    <Card color="papayawhip" footer={<Button label="Footer button" />} />
  )

  // Default Button
  const button = <Button label="Normal button" />

  return (
    <>
      {card1}
      {card2}
      {button}
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
  document.getElementById('root')
)
