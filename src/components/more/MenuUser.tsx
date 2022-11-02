import { Logout, Settings } from "@mui/icons-material";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { googleLogout } from "@react-oauth/google";
import React from "react";
import { getUser } from "../../helpers/account";

class MenuUser extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = { open: false, anchorEl: null, user: getUser() }
  }

  handlerClick(event: any) {
    this.setState({ anchorEl: event.currentTarget, open: true })
  };

  handleClose() {
    this.setState({ anchorEl: null, open: false })
  };

  logout() {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("userLogin");

    googleLogout();
    window.location.reload();
  }

  render(): React.ReactNode {
    return (
      <Menu
        anchorEl={this.state.anchorEl}
        id="account-menu"
        open={this.state.open}
        onClose={() => this.handleClose() }
        onClick={() => this.handleClose() }
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            width: 300,
            backgroundColor: 'var(--background-color-navbar)',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              backgroundColor: 'var(--background-color-navbar)',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar src={this.state.user?.picture}/> {this.state.user?.name}
        </MenuItem>
        <Divider />

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configuraciones
        </MenuItem>
        
        <MenuItem onClick={() => this.logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar sessión
        </MenuItem>
      </Menu>
    )
  }
}

export default MenuUser;