import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { getUser } from '../helpers/account';

const Background = styled.main 
  `
    height: 205px;
    border-radius: 9px;
    background-image: url(https://raw.githubusercontent.com/carlos-Espinoza-perez/image-repo/main/dasboard-image.svg);
    background-repeat: no-repeat;
    background-position: right;

    background-color: #88ccba;
    display: flex;
    align-items: center;
    padding-left: 45px;
    gap: 23px;

    .card-info-note {
      background: #439D9D;
      box-shadow: 0px 4px 4px rgba(67, 157, 157, 0.25);
      border-radius: 12px;

      width: 110px;
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h3 {
        font-family: 'M PLUS Rounded 1c';
        font-weight: 500;
        font-size: 28px;
        text-align: center;
        color: #0C121D;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }

      p {
        font-family: 'Poppins';
        font-weight: 400;
        font-size: 15px;
        color: rgba(18, 20, 24, 0.69);
        text-align: center;
      }
    }
  `;

class Dashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = { listActive: "-", listComplete: "-", listOverdue: "-" };
  }
  
  async updateUser() {
    const user = getUser();

    if (user.internalId) {
      const response = await axios.get(`${process.env.REACT_APP_API}/Note/GetDashboardInfo?user_id=${user.internalId}`);
      
      this.setState({ 
        listActive: response.data.list_active, 
        listComplete: response.data.list_complete, 
        listOverdue: response.data.list_overdue  
      });
    }
  }


  async componentDidMount(): Promise<void> {
    this.updateUser();
  }

  render(): React.ReactNode {
    return (
      <Background className='container dashboard-background'>
        <div className="card-info-note">
          <h3>{this.state.listActive}</h3>
          <p>Activas</p>
        </div>

        <div className="card-info-note">
          <h3>{this.state.listComplete}</h3>
          <p>Completas</p>
        </div>
        
        <div className="card-info-note">
          <h3>{this.state.listOverdue}</h3>
          <p>Atrasadas</p>
        </div>
      </Background>
    )
  }
}

export default Dashboard;