import React from 'react';
import styled from 'styled-components';
import InfoIcon from '../static/images/info';

import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import moment from 'moment';
import { getUser } from '../helpers/account';
import { randomNumberInRange } from './../helpers/general';
import { Tooltip } from '@mui/material';


const ContainerNote = styled.main
  `
    h2 {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      color: #FFFFFF;

      margin-top: 35px;
      cursor: pointer;

    }

    .list-note {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-top: 35px;
    }
  `;



const colors = [
  "", "#FFEDD6", "#FFCB9B", "#FFB0FF", "#B7DCFF", "#C8BAFD", "#91E4EA"
]

let indiceColor = 0;

class Note extends React.Component <any> {
  Item = styled.div 
    `
      width: 210px;
      height: 153px;
      border-radius: 15px;
      background-color: ${(e) => e.id};
      font-family: 'Poppins';
      padding: 12px 14px;

      h4 {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        color: rgba(18, 20, 24, 0.94);

        text-align: center;
      }

      p {
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        margin-top: 15px;
        max-height: 50px;
        min-height: 50px;

        color: rgba(18, 20, 24, 0.94);
      }

      .info {
        display: flex;
        justify-content: space-between;
        margin-top: 22px;
      }

      svg {
        width: 18px;
        height: 18px;
      }

      strong {
        font-weight: 500;
        font-size: 10px;
        color: rgb(0 0 0 / 50%);
      }
    `;

  constructor(props: any) {
    super(props);

    indiceColor++;
    if (indiceColor >= colors.length - 1) indiceColor = 1;
  }

  render(): React.ReactNode {
    let description: string = this.props.description;
    if (description.length > 80) description = description.substring(0, 80) + '...'; 

    return (
      <this.Item id={colors[indiceColor]}>
        <Tooltip title={this.props.name} placement="top">
          <h4 className='one-line'>{this.props.name}</h4>
        </Tooltip>
        <p>{description || "Descripción: " + this.props.name}</p>

        <div className="info">
          <InfoIcon />
          {
            this.props.ended_date != null 
            ?
              <strong>{moment(this.props.ended_date, "YYYY-MM-DD").format("DD/MM/yyyy")}</strong>
            :
              <strong></strong>
          }
        </div>
      </this.Item>
    )
  }
}



class ListNote extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = { listNote: [] }
  }

  newNote(note: any) {
    this.setState({ listNote: [note, ...this.state.listNote] });
  }

  async componentDidMount(): Promise<void> {
    const user = getUser();

    if (user.internalId) {
      const response = await axios.get(`${process.env.REACT_APP_API}/Note/GetListNote?user_id=${user.internalId}`);
      this.setState({ listNote: response.data });
    }
  }

  render(): React.ReactNode {
    return (
      <ContainerNote>
        <ReactTooltip />

        <h2>Notas activas</h2>


        <div className="list-note">
          {
            this.state.listNote.map((a: any) => (
              <Note key={a.id} name={a.name} description={a.description} ended_date={a.ended_date} />
            ))
          }
        </div>
      </ContainerNote>
    )
  }
}

export default ListNote;
