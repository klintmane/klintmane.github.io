import React from "react";
import { Link } from "react-router-dom";

import * as Style from "./style";
import Posts from "../../components/Posts";
import Projects from "../../components/Projects";
import Subscribe from "../../components/Subscribe";
import avatar from "./avatar.jpg";

const Home = props => {
  const { content = {} } = props;
  const { posts = [], projects = [] } = content;

  const latestPosts = posts.slice(0, 5);
  const latestProjects = projects.slice(0, 5);

  return (
    <div className={Style.Container}>
      <section>
        <header>Hello 🌍</header>
        <img src={avatar} />
        <p>
          My name is Klint and you just discovered my secret lair on the
          internet. I'm a software developer by profession, currently living in
          Tirana, Albania&nbsp;
          <em>(a small country in Europe)</em>.
        </p>
        <p>
          I work as a <em>Software Engineer</em> at&nbsp;
          <a href="//airfind.com/">Airfind</a> and am mainly responsible for its
          web clients. Its current stack consists mostly of React & Node.
        </p>
        <p>
          I could talk your ear off about my profession, although I would prefer
          not to. I admire complex software that is expressed simply and strive
          to always keep that in mind when writing code. I hate unnecessary
          abstractions and often find myself peeking under the hood and
          rewriting things recreationally.
        </p>
      </section>
      <section>
        <header>Projects</header>
        <Projects projects={latestProjects} />
        {projects.length > latestProjects.length && (
          <Link to="/projects">All Projects {">"}</Link>
        )}
      </section>
      <section>
        <header>Posts</header>
        <Posts posts={latestPosts} />
        {posts.length > latestPosts.length && (
          <Link to="/posts">All Posts {">"}</Link>
        )}
      </section>
      <Subscribe />
    </div>
  );
};

export default Home;
