import React from "react";

import * as Style from "./style";

const Projects = props => {
  const { projects = [] } = props;

  return (
    <div className={Style.Container}>
      <ul>
        {projects.map(({ link, title, description }) => (
          <li key={link + title}>
            <a href={link} target="_blank">
              {title}
            </a>
            <div>{description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
