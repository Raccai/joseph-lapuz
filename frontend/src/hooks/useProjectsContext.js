import { ProjectsContext } from "../context/ProjectsContext";
import { useContext } from "react";

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw Error("useProjectContext must be used inside the ProjectContextProvider")
  }

  return context;
}