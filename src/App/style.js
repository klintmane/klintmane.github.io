import { css } from "emotion";

export const Container = css`
  min-height: 100%;
  max-width: 600px;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  padding: 2rem 1rem;
  margin: 0 auto;

  @import url("https://fonts.googleapis.com/css?family=Titillium+Web");
  font-family: "Titillium Web", sans-serif;

  a {
    outline: none;
    color: #888;
  }
`;

export const Page = css`
  flex: 1;
`;
