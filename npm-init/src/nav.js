import React from 'react';
import {NavLink} from 'react-router-dom';

import navStyle from '@/css/nav.scss' 
const NavBar = () =>(
<div>
    <div>
        <NavLink exact className={navStyle.blue} to='/'>Component1</NavLink> |&nbsp;
        <NavLink to='/Component2'>Component2</NavLink> |&nbsp;
        <NavLink to='/Component3/ILoveWeb'>Component3</NavLink> |&nbsp;
        <NavLink to='/react' activeClassName='active'>404</NavLink> |&nbsp;
        <NavLink to='/redirect' activeClassName='active'>Redirect</NavLink> |&nbsp;
         
    </div>
</div>
)
   
export default NavBar;