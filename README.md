# 🔬 useInside()

[<img src="https://img.shields.io/npm/v/use-inside" alt="" />](https://www.npmjs.com/package/use-inside) [<img src="https://img.shields.io/bundlephobia/minzip/use-inside" alt="" />](https://bundlephobia.com/result?p=use-inside)

useInside() allows a component to be aware if its "inside" the subtree of another component and receive data from it, in the most straightforward, simple way possible.

## Usage

Add it to your project:

```console
yarn add use-inside
```

Use it in your React app:

```jsx
// App.js

import React from 'react'
import { Inside, useInside } from 'use-inside'

function App() {

  return (
    <>
      <h1>useInside</h1>
      <Inside name="papaya" data={{backgroundColor: 'papayawhip'}}>
        <Greeting />
      </Inside>
    </>
  )
}

function Greeting() {
  const [inside, data] = useInside('papaya')

  return <h2 style={{..data}}>{inside && 'papaya'}</h2>
}

export default App
```

## API

### &lt;Inside />

This is the provider component. It should be placed above any component using `useInside()`. Apart from `children`, it accepts two other props:

#### name (required)

The name of the inside context. Required for storing the context into a map for later retrieval.

#### data

The data passed to the component using `useInside()`. Accepts any type.

### useInside()

This is the hook to be used throughout the app.

It takes a string as a single required param, and returns an array containing the following:

- `inside`: A `boolean` that will be `true` if the component is in the subtree of the provider
  `Inside` component.
- `data`: The data passed through the `Inside` component.
