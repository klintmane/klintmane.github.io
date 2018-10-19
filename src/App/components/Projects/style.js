import { css } from "emotion";

export const Container = css`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      margin: 0.5rem;

      > a {
        color: #000;
      }

      > *:first-child {
        color: #888;
        margin-right: 1rem;
      }
    }
  }
`;
