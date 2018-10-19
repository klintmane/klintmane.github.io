import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as Style from "./style";

import content from "./content";

import Footer from "./components/Footer";
import Nav from "./components/Nav";

import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Photography from "./pages/Photography";
import Post from "./pages/Post";
import Posts from "./pages/Posts";
import Projects from "./pages/Projects";

const withContent = Comp => props => <Comp {...props} content={content} />;

const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/contact", component: Contact },
  { path: "/music", component: Music },
  { path: "/photography", component: Photography },
  { path: "/posts/:date", component: Post },
  { path: "/posts", component: Posts },
  { path: "/projects", component: Projects }
];

const App = props => {
  return (
    <Router>
      <div className={Style.Container}>
        <Nav />
        <div className={Style.Page}>
          <Switch>
            {routes.map(({ path, exact, component }) => (
              <Route
                key={path}
                path={path}
                exact={exact}
                component={withContent(component)}
              />
            ))}
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
