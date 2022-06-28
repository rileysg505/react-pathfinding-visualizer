import React from 'react';
import {
  Nav,
  Button,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavBarElements';


const clickHandler=()=>{
    console.log('clicked new button!')
}
const Header = () => {
    return ( <>
    <Nav>
    <Button onClick={clickHandler}>
        test
        </Button>
    </Nav>
    </> );
}
 
export default Header;