import React from "react";

import * as Style from "./style";

const Subscribe = props => {
  return (
    <div className={Style.Container}>
      In case you want to be kept up to date with what I'm up to and currently
      working on, I may send out an occasional email or two.&nbsp;
      <em>No spamming of course!</em>
      <a href="//mailchi.mp/c9c1c7837c1d/klintm" target="_blank">
        Subscribe
      </a>
    </div>
  );
};

export default Subscribe;
