import React from "react";

import * as Style from "./style";
import content from "../../content";

const Posts = props => {
  const { match = {}, content = {} } = props;
  const { posts = [] } = content;

  const { date, Markdown } =
    posts.find(p => p.date === match.params.date) || {};

  return (
    <div className={Style.Container}>
      <header>{date}</header>
      <Markdown />
    </div>
  );
};

export default Posts;
