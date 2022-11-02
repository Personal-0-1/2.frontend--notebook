import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { getUser } from '../helpers/account';
import MenuUser from './more/MenuUser';


const EHeader = styled.main 
  `
    height: 90px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    align-items: center;
    color: white;

    h1 {
      font-family: 'Pacifico';
      font-weight: 400;
      font-size: 26px;
      line-height: 46px;
    }

    .info {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 35px;

      p {
        font-family: 'Kalam';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 26px;
        color: #D5E1FA;
      }

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  `;

class Header extends React.Component<any, any> {
  profileDefault: string = "https://raw.githubusercontent.com/carlos-Espinoza-perez/image-repo/main/profile-icon.svg";
  timerID: any;
  
  handlerMenuUser: any;

  constructor(props: any) {
    super(props);

    this.state = { date: new Date(), user: getUser() }
    this.handlerMenuUser = this.handlerMenuUser?.bind(this);
  }
  
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() { clearInterval(this.timerID) }
  
  handlerOpenMenu(element: any) { 
    this.handlerMenuUser.handlerClick(element); 
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render(): React.ReactNode {
    return (
      <EHeader className='header'>
        <h1>👋 Hola, {this.state.user?.given_name}</h1>

        <div className="info">
          <p>{ moment(this.state.date).format("hh:mm a") }</p>

          <img src={this.state.user?.picture || this.profileDefault} alt="" onClick={(e) => this.handlerOpenMenu(e)}/>

          <MenuUser ref={element => { this.handlerMenuUser = element; }} />
        </div>
      </EHeader>
    )
  }
}

export default Header;