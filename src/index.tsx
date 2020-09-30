// This component + hook pair can be used to know that a component is in the
// tree of another component. It works by using a Map containing named contexts.

import React, { useContext } from 'react'
import PropTypes from 'prop-types'

// List of contexts, created as they are requested
const insideContexts = new Map()

// Creates the required context if it doesn’t exist.
// @ts-ignore
function getContext(name) {
  if (!insideContexts.has(name)) {
    insideContexts.set(name, React.createContext({ inside: false, data: null }))
  }
  // eslint-disable-next-line
  return insideContexts.get(name)
}

// Use this component to declare a new “inside context”, by name.
// @ts-ignore
function Inside({ children, data, name }) {
  // eslint-disable-next-line
  const Context = getContext(name)
  return (
    // eslint-disable-next-line
    <Context.Provider value={{ inside: true, data }}>
      {children}
    </Context.Provider>
  )
}

Inside.propTypes = {
  children: PropTypes.node,
  data: PropTypes.any,
  name: PropTypes.string.isRequired,
}

// Use this hook to know if a given component is somewhere
// in the tree of an <Inside> declared with the same name.
// @ts-ignore
function useInside(name) {
  // eslint-disable-next-line
  const { inside, data } = useContext(getContext(name))
  // eslint-disable-next-line
  return [inside, data]
}

export { Inside, useInside }
