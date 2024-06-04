import { AboutContext } from "../context/AboutContext";
import { useContext } from "react";

export const useAboutContext = () => {
  const context = useContext(AboutContext);

  if (!context) {
    throw Error("useAbioutContext must be used inside the AboutContextProvider")
  }

  return context;
}