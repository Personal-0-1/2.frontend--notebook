import React from 'react';
// import DashboardIcon from './../static/images/dashboard';
import DashboardIcon from './../static/images/tab/dashboard';
import CardIcon from '../static/images/tab/card';
import CalendarIcon from './../static/images/tab/calendar';

import styled from "styled-components";


const ListIcons = styled.main 
  `
    width: 80px;
    height: 100%;
    box-shadow: 0px 4px 4px rgba(27, 31, 36, 0.25);
    border-radius: 12px;
    background-color: var(--background-color-navbar);
    padding-top: 90px;
  `;

const Icon = styled.div
  `
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 45px;

    ${       
      // @ts-ignore
      props => props['data-active'] ? 'background-color: rgba(38, 41, 47, 0.79);' : ''
    }

    svg {
      width: 18px;
      height: 18px;
    }
  `;


class Navbar extends React.Component<any> {
  render(): React.ReactNode {
    return (
      <ListIcons className='navbar'>
        <Icon data-active={true}>
          <DashboardIcon />
        </Icon>

        <Icon> 
          <CardIcon /> 
        </Icon>          

        <Icon> 
          <CalendarIcon /> 
        </Icon>
      </ListIcons>
    )
  }
}

export default Navbar;