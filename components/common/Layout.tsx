import * as React from "react";
import { css } from "emotion";
import Prizes from "../Prizes";

const container = css`
  width: auto;
  max-width: 1300px;
  margin: 0 auto;
  padding: 15px;
  box-sizing: border-box;

  display: grid;
  grid-template:
    "header header" auto
    "prizes sidebar" auto
    "content sidebar" 1fr
    / 1fr 360px;
  grid-column-gap: 10px;

  & h4 {
    font-size: 17px;
    text-transform: uppercase;
    font-family: "Roboto Condensed";
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-left: 5px;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 1300px) {
    grid-template:
      "header header" auto
      "sidebar prizes" auto
      "sidebar content" auto
      / 360px 1fr;
  }

  @media screen and (max-width: 800px) {
    width: 380px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const header = css`
  grid-area: header;
  order: 0;

  display: flex;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px;
  margin-top: 2%;
`;

const logo = css`
  width: 180px;
  height: 60px;

  background: url("/static/images/logo.png") no-repeat;
  background-size: contain;

  color: #7aaeff;
  font-weight: bold;
  font-size: 35px;

  & > b {
    color: black;
  }
`;

const sidebar = css`
  grid-area: sidebar;
  order: 2;
  animation: fadeIn 1s ease;
`;

const prizes = css`
  grid-area: prizes;
  position: relative;
  order: 1;
`;

const content = css`
  grid-area: content;
  order: 3;
`;

class Layout extends React.Component<{}> {
  static Sidebar: React.SFC<{}> = ({ children }) => (
    <div className={sidebar}>{children}</div>
  );
  static Content: React.SFC<{}> = ({ children }) => (
    <div className={content}>{children}</div>
  );

  render() {
    return (
      <div className={container}>
        <div className={header}>
          <div className={logo} />
        </div>
        <div className={prizes}>
          <h4>Prizes</h4>
          <Prizes />
        </div>

        {this.props.children}
      </div>
    );
  }
}

export default Layout;