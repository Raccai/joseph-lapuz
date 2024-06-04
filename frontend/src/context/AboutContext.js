import { createContext, useReducer } from "react";

export const AboutContext = createContext();

export const aboutReducer = (state, action) => {
  switch (action.type) {
    case "SET_ABOUT":
      return {
        about: action.payload
      }
    case "UPDATE_ABOUT":
      return {
        about: action.payload
      }
    default:
      return state
  }
}

export const AboutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(aboutReducer, {
    about: null
  })

  return (
    <AboutContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AboutContext.Provider>
  )
}