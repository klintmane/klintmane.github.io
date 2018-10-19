import React from "react";
import { Link } from "react-router-dom";

import * as Style from "./style";
import Projects from "../../components/Projects";

const ProjectsPage = props => {
  const { content = {} } = props;
  const { projects = [] } = content;

  return (
    <div className={Style.Container}>
      <header>Projects</header>
      <Projects projects={projects} />
    </div>
  );
};

export default ProjectsPage;
