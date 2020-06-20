import React from "react"
import { Link } from "gatsby"

import icon from "../../../content/assets/icon.png"

import "./style.css"

export const Layout = ({ location, title, children }) => {
  return (
    <div className="components-layout">
      <nav>
        <Link to={`/`}>
          <img src={icon} />
        </Link>
      </nav>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with{" "}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}
