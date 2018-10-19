import { css } from "emotion";

export const Container = css`
  margin-bottom: 3rem;

  font-weight: 600;
  font-size: 0.9rem;

  > * {
    display: inline-block;
    margin: 0.5rem;

    :first-child {
      margin-left: 0;
    }
  }

  header {
    color: #000;
    font-size: 1rem;
  }

  header > em {
    font-weight: normal;
    font-style: normal;
    color: #444;
  }

  a {
    text-decoration: none;

    :hover {
      color: #000;
    }
  }
`;
