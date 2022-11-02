import { createTheme, Drawer, Paper, SpeedDial, SpeedDialAction, SpeedDialIcon, ThemeProvider } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Dashboard from '../../components/Dashboard';
import GroupNote from '../../components/GroupNote';
import Header from '../../components/Header';
import ListNote from '../../components/ListNote';
import Navbar from '../../components/Navbar';
import './App.css';
import './Responsive.css';

import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import NewNote from '../../components/more/NewNote';
import NewGroupNote from '../../components/more/NewGroupNote';
import { appMessaging, getTokenNotification } from '../../helpers/firebase';

import ReactAudioPlayer from 'react-audio-player';
import { onMessage } from 'firebase/messaging';

import { withSnackbar } from 'notistack';
import axios from 'axios';
import { getUser } from '../../helpers/account';


const Container = styled.main
`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 30px;
  height: 100%;

  .note-section {
    display: grid;
    grid-template-columns: 1fr 270px;
    gap: 45px;
  }
 `;


class App extends React.Component<any, any> {
  darkTheme = createTheme({ palette: { mode: 'dark' } });
  actions = [
    { icon: <InsertDriveFileIcon sx={{ color: 'white', fontSize: 16 }}/>, name: 'Crear nuevo registro' },
    { icon: <CreateNewFolderIcon sx={{ color: 'white', fontSize: 16 }}/>, name: 'Crear nuevo grupo' },
  ];

  handlerListNote: any;
  handlerListGroupNote: any;

  constructor(props: any) {
    super(props);

    this.state = { title: "", open: false };
    this.handlerListNote = this.handlerListNote?.bind(this);
    this.handlerListGroupNote = this.handlerListGroupNote?.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const token = await getTokenNotification();
    if (token !== '') this.sendTokenId(token);

    const action = (snackbarId: any) => (
      <>
        <button onClick={() => { this.props.closeSnackbar(snackbarId) }}>
          Dismiss
        </button>
      </>
    );
  

    onMessage(appMessaging, (payload: any) => {
      const notificationTitle = payload.notification.title;
      const notificationOptions = { body: payload.notification.body, icon: "/logo192.png" };

      this.props.enqueueSnackbar(`${notificationTitle}: ${notificationOptions.body}`, { className: 'alert', action });
    });
  }

  async sendTokenId(tokenId: string) {
    const user = getUser();
    if (JSON.stringify(user) === "{}") return;


    await axios.post(`${process.env.REACT_APP_API}/UserToken/SaveToken/${user.internalId}/${tokenId}`);
  }
  
  
  handlerNewNote(note: any) { this.handlerListNote.newNote(note); this.setState({ open: false }); }
  handlerNewGroupNote(groupNote: any) { this.handlerListGroupNote.newGroup(groupNote); this.setState({ open: false }); }
  setTitle(value: any) { this.setState({ title: value }) }
  toggleOpen(value: any) { this.setState({ open: value }) }

  render(): React.ReactNode {
    return (
      <ThemeProvider theme={this.darkTheme}>
        <ReactAudioPlayer src="windows-notificacion.mp3" autoPlay={true} controls={false} style={{ display: 'none' }}/>

        <Container className='view-main'>
          <Navbar /> 
          
          <div className="right-main">
            <Header />
            <Dashboard />
            
            <div className="note-section container">
              <ListNote ref={element => { this.handlerListNote = element }} />
              <GroupNote ref={element => { this.handlerListGroupNote = element }} />
            </div>
          </div>
        </Container>
  
        
        <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'absolute', bottom: 40, right: 40 }} icon={<SpeedDialIcon />} >
          {this.actions.map((action: any) => (
            <SpeedDialAction
              onClick={() => {this.toggleOpen(!this.state.open); this.setTitle(action.name)}}
              key={action.name} icon={action.icon} tooltipTitle={action.name} tooltipOpen={true} className="bg-hover"
            />
          ))}
        </SpeedDial>
  
        <Drawer anchor="right" className="off-canvas" open={this.state.open} onClose={() => { this.toggleOpen(false); return this.state.open; }} >
          <Paper elevation={1} className='header'> <h3 className='title'>{this.state.title}</h3> </Paper>
  
          { this.state.title === this.actions[0].name ? <NewNote close={() => this.toggleOpen(false)} eventHandler={(e: any) => this.handlerNewNote(e)} /> : '' }
          { this.state.title === this.actions[1].name ? <NewGroupNote close={() => this.toggleOpen(false)} eventHandler={(e: any) => this.handlerNewGroupNote(e)}/> : '' }
        </Drawer>
      </ThemeProvider>
    )
  }
}

export default withSnackbar(App);