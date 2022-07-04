import React from "react";
import {
  Nav,
  Button,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements";

const clickHandler = () => {
  console.log("clicked new button!");
};

const Header = ({ start,solve, reset }) => {
  const resetHandler = () => {
    reset();
  };

  const solveHandler = () => {
    solve();
  };
  return (
    <>
      <Nav>
        <Button onClick={start}>Set Start</Button>
        <Button onClick={clickHandler}>Set End</Button>
        <Button onClick={solveHandler}>Solve</Button>
        <Button onClick={resetHandler}>Reset</Button>
      </Nav>
    </>
  );
};

export default Header;
