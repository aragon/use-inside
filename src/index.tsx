// This component + hook pair can be used to know that a component is in the
// tree of another component. It works by using a Map containing named contexts.

import React, { ReactNode, useContext } from 'react'

type ProviderProps = {
  children?: ReactNode
  data?: unknown
  name: string
}

type InsideContext = {
  inside: boolean
  data: unknown
}

// List of contexts, created as they are requested
const insideContexts = new Map<string, React.Context<InsideContext>>()

// Creates the required context if it doesn’t exist.
function getContext(name: string) {
  if (!insideContexts.has(name)) {
    insideContexts.set(
      name,
      React.createContext<InsideContext>({ inside: false, data: null })
    )
  }

  return insideContexts.get(name)!
}

// Use this component to declare a new “inside context”, by name.
function Inside({ children, data, name }: ProviderProps) {
  const Context = getContext(name)

  return (
    <Context.Provider value={{ inside: true, data }}>
      {children}
    </Context.Provider>
  )
}

// Use this hook to know if a given component is somewhere
// in the tree of an <Inside> declared with the same name.
function useInside(name: string): [boolean, unknown] {
  const { inside, data } = useContext(getContext(name))
  return [inside, data]
}

export { Inside, useInside }
