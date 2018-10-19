import React from "react";

import * as Style from "./style";
import Subscribe from "../../components/Subscribe";

const Contact = props => {
  return (
    <div className={Style.Container}>
      <p>
        You can find me on&nbsp;
        <a href="//twitter.com/klintmane" target="_blank">
          Twitter
        </a>
        ,&nbsp;
        <a href="//github.com/klintmane" target="_blank">
          GitHub
        </a>
        &nbsp;and&nbsp;
        <a href="//linkedin.com/in/klintmane" target="_blank">
          LinkedIn
        </a>
      </p>
      <Subscribe />
    </div>
  );
};

export default Contact;
