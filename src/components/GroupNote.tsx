import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { getUser } from '../helpers/account';
import FolderIcon from '../static/images/folder';

const ContainerGroupList = styled.main
  `
    width: 100%;

    .group-note {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .group {
      display: flex;
      height: 43px;
      color: white;
      margin-top: 35px;
      align-items: center;
      gap: 10px;
      font-family: 'Poppins';
    
    
      p {
        padding: 11px 26px;
        font-size: 14px;
        border: 1px solid white;
        border-radius: 12px;
        text-align: center;
        width: 100%;
        cursor: pointer;
      
        &.active {
          background-color: white;
          color: #131418;
        }
      }
    }

    .list-group {
      margin-top: 20px;
      position: relative;
    }

    [data-index="0"] {
      display: none !important;
    }

    [data-index] {
      background: #2F2F3F;
      box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
      border-radius: 16px;
      width: 264.23px;
      height: 305px;
      position: absolute;
      z-index: 3;
      cursor: pointer;

      .icon {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #232330;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 55px;

        svg {
          width: 50px;
          height: 50px;
        }
      }

      h4 {
        margin-top: 20px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 16px;
        color: #FFFFFF;
      }

      p {
        margin-top: 80px;
        color: #7D7E8B;
        font-family: 'Poppins';
        font-weight: 500;
        font-size: 12px;
      }
    }

    [data-index="2"] {
      transform: scale(0.93);
      z-index: 2;
      margin-top: 7.45%;
    }
    
    [data-index="3"] {
      transform: scale(0.88);
      z-index: 1;
      margin-top: 13.45%;
    }
  `;



class Group extends React.Component<any> {
  render(): React.ReactNode {
    return (
      <div className="group-note" data-index={this.props.index}>
        <div className="icon">
          <FolderIcon />
        </div>

        <h4>{this.props.name}</h4>
        
        <p className="info">{this.props.count_note || 0} {this.props.count_note > 1 ? 'notas' : 'nota'}</p>
      </div>
    )
  }
}

class GroupNote extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = { listGroup: [] };
  }

  async componentDidMount(): Promise<void> {
    const user = getUser();
    
    if (user.internalId) {
      const response = await axios.get(`${process.env.REACT_APP_API}/GroupNote/GetListGroupNote?user_id=${user.internalId}`);
      this.setState({ listGroup: response.data });
    }
  }

  newGroup(groupNote: any) {
    this.setState({ listGroup: [groupNote, ...this.state.listGroup] });
  }

  printListGroup(): any {
    let listGroupNode = [];

    for (const [index, item] of this.state.listGroup.entries()) {
      listGroupNode.push(  
        <Group key={index} index={index+1} name={item.name} count_note={item.count} />
      )
    }

    return listGroupNode;
  }

  render(): React.ReactNode {
    return (
      <ContainerGroupList className='container-group-list'>
        <div className="group">
          <p className='active'>Notas</p>
          <p>Recordatorio</p>
        </div>

        <div className="list-group">
          { this.printListGroup() }
        </div>
      </ContainerGroupList>
    )
  }
}

export default GroupNote;