import React from "react";
import { Link } from "react-router-dom";

import * as Style from "./style";
import Posts from "../../components/Posts";

const PostsPage = props => {
  const { content = {} } = props;
  const { posts = [] } = content;

  return (
    <div className={Style.Container}>
      <header>Posts</header>
      <Posts posts={posts} />
    </div>
  );
};

export default PostsPage;
