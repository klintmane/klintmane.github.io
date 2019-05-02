import React from "react";
import "./style.css";

const App = props => {
  return (
    <div className="app">
      <img src="https://en.gravatar.com/avatar/f443f4f495d6d44947b674a09abd6f47?s=200" />
      <header>Klint Mane</header>
      <ul>
        <li>
          <a
            href="https://github.com/klintmane"
            rel="noopener noreferrer"
            target="_blank"
          >
            Software
          </a>
        </li>
        <li>
          <a
            href="https://unsplash.com/@klintmane"
            rel="noopener noreferrer"
            target="_blank"
          >
            Photography
          </a>
        </li>
        <li>
          <a
            href="https://soundcloud.com/klintmane"
            rel="noopener noreferrer"
            target="_blank"
          >
            Music
          </a>
        </li>
      </ul>
      <footer>
        <ul>
          <li>
            <a
              href="https://twitter.com/klintmane"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i class="fab fa-twitter" />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/klintmane"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i class="fab fa-instagram" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/klintmane"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i class="fab fa-github" />
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/klintmane"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i class="fab fa-linkedin-in" />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default App;
