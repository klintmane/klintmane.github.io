import React from "react";
import { Link } from "react-router-dom";

import * as Style from "./style";

const Posts = props => {
  const { posts = [] } = props;

  return (
    <div className={Style.Container}>
      <ul>
        {posts.map(({ date, title }) => (
          <li key={date + title}>
            <div>
              <small>{date}</small>
            </div>
            <Link to={`/posts/${date}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
