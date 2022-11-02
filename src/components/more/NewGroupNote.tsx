import { Box, Button, CircularProgress, Paper, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import axios from "axios";
import React, { useState } from "react";
import { getUser } from "../../helpers/account";


function NewGroupNote(props: any) {
  const [loading, setLoading] = useState(false);

  const create = async () => {
    const user = getUser();
    const name = (document.getElementById("name") as HTMLInputElement).value;
    setLoading(true);

    try
    {
      var response = await axios.post(`${process.env.REACT_APP_API}/GroupNote/Create`, { name, user_id: user.internalId });
      props.eventHandler(response.data);
    }
    catch(error) {}

    setLoading(false);
  }


  return (
    <React.Fragment>
      <form className='form-group' id="form-new-note">
        <TextField id="name" className='form-control' label="Nombre" />
      </form>
      
      <Paper elevation={1} className='footer'>
        <Box sx={{ m: 1, position: 'relative' }} gap="12px" display="flex">

          <Button variant="contained" disabled={loading} onClick={create}> Guardar </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{ color: blue[100], position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }}
            />
          )}

          <Button variant="outlined" onClick={props.close}>Cerrar</Button>
        </Box>
      </Paper>
    </React.Fragment>
  )
}

export default NewGroupNote;