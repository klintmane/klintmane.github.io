import React from "react";
import { Link } from "react-router-dom";

import * as Style from "./style";

const links = [
  { name: "Posts", mark: "New!", to: "/posts" },
  { name: "Projects", to: "/projects" },
  // { name: "Photography", to: "/photography" },
  // { name: "Music", to: "/music" },
  { name: "Contact", to: "/contact" }
];

const Nav = props => {
  return (
    <nav className={Style.Container}>
      <Link to="/">
        <header>
          Klint M<em>ane</em>
        </header>
      </Link>
      {links.map(link => (
        <Link key={link.to} to={link.to}>
          {link.name}
          {link.mark ? (
            <span>
              &nbsp;(
              <mark>{link.mark}</mark>)
            </span>
          ) : null}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
