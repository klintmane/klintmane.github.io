import { css } from "emotion";

export const Container = css`
  > section {
    margin-bottom: 2rem;

    > header {
      font-weight: bold;
      margin-bottom: 1rem;
    }
  }

  > section:first-child {
    text-align: justify;

    > header {
      overflow: hidden;
      white-space: nowrap;
      animation: typing 1.5s steps(15, end), blink-caret 0.5s step-end infinite;

      @keyframes typing {
        0% {
          width: 0;
          border-right: 0.15em solid orange;
        }
        99% {
          border-right: 0.15em solid orange;
        }
        100% {
          width: 60px;
          border-right: 0;
        }
      }

      @keyframes blink-caret {
        from,
        to {
          border-color: transparent;
        }
        50% {
          border-color: orange;
        }
      }
    }

    > img {
      margin-left: 2rem;
      margin-bottom: 1rem;

      height: 275px;

      float: right;

      border-radius: 0.5rem;
    }
  }
`;
