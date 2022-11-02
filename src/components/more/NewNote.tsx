import { Box, Button, Chip, CircularProgress, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Switch, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { getUser, setLogin } from '../../helpers/account';
import { uploadFile } from "../../helpers/firebase";
import { inputDateToFormatValid, randomNumberInRange } from "../../helpers/general";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AttachmentIcon from '@mui/icons-material/Attachment';

import { blue } from '@mui/material/colors';
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from "moment";

const DateInput = (props: any) => {
    const [dateValue, setDateValue] = useState(moment(new Date()).format("yyyy-MM-DD"));

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
                label={props.label}
                onChange={(e: any) => setDateValue(e)}
                value={dateValue}
                renderInput={(params: any) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
};

const NewNote = (props: any) => {
    const [indications, setIndications] = useState<any[]>([]);
    const [reminders, setReminders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    
    const [listGroup, setGroup] = useState([]);
    const [isValue, setValue] = useState(false);
    const [vencimiento, setVencimiento] = useState(false);


    const [groupSelect, setGroupSelect] = React.useState('');
    const user = getUser();
  
  
    const handleChange = (event: SelectChangeEvent) => {
      setGroupSelect(event.target.value as string);
    };
  
    const create = async () => {
      setLoading(true);
  
      const form = document.getElementById("form-new-note") as HTMLFormElement;
      const data = { 
        // @ts-ignore
        name: form.elements['name-note'].value, description: form.elements['description'].value,  group_note_id: form.elements['groupId'].value, 
        user_id: user.internalId, type: 0, list_value_of_note: [], list_reminders: []
      };


  
      const valueOfNote = form.querySelectorAll('.list-value-of-note') as any as Array<HTMLElement>;
      const listreminders = form.querySelectorAll(".list-reminders") as any as Array<HTMLElement>;

      for (const item of valueOfNote) {
        if (item === null) continue;
  
        const name = (item.querySelector(`*[name="name"]`) as HTMLInputElement).value;
        const value = (item.querySelector(`*[name="value"]`) as HTMLInputElement).value;
        const fileString = (item.querySelector(`*[name="fileString"]`) as HTMLInputElement).files;
        
        let stringUrl = "";
        if (fileString?.length !== 0 && fileString !== null) stringUrl = await uploadFile(fileString[0])
      
        /* @ts-ignore */
        data.list_value_of_note.push({ name, value, file_string: stringUrl });
      }

      for (const item of listreminders) {
        if (item === null) continue;
  
        const name = (item.querySelector(`*[name="name"]`) as HTMLInputElement).value;
        const dateOfRemember = (item.querySelector(`*[type="tel"]`) as HTMLInputElement).value;
        const format = inputDateToFormatValid(dateOfRemember)

        // @ts-ignore
        data.list_reminders.push({ name, date_of_remember: format });
      }

      if (vencimiento === true) {
        // @ts-ignore
        data.ended_date = inputDateToFormatValid((form.querySelector(".input-vencimiento input") as HTMLInputElement).value);
      } 

  
      try {
        const response = await axios.post(`${process.env.REACT_APP_API}/Note/Create`, data);
        
        props.eventHandler(response.data);
        setLoading(false);
      } 

      catch (error) {
        setLogin(false);
      }
    };
  
    const getGroup = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API}/GroupNote/GetListGroupNote?user_id=${user.internalId}`);
      setGroup(response.data);
      setValue(true);
    };
  
    if (!isValue) getGroup();
    
  
  
    return (
      <React.Fragment>
        <form className='form-group' id="form-new-note">
          <TextField id="name-note" className='form-control' label="Nombre" />
          <TextField id="description" className='form-control' label="Descripción" multiline minRows={3} />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Grupo para nota</InputLabel>
            <Select labelId="demo-simple-select-label" id="groupId" name='groupId' label="Grupo para nota" value={groupSelect} onChange={handleChange}>
              {
                listGroup.map((a: any) => (
                  <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>

          <FormControlLabel
            value="Tiene fecha de vencimiento."
            control={<Switch color="primary" />}
            label="Tiene fecha de vencimiento."
            labelPlacement="end"
            onChange={(e) => setVencimiento(!vencimiento)}
          />

          <div className="input-vencimiento" style={{ width: '100%' }}>
            {
              vencimiento ? <DateInput label="Fecha de vencimiento"  defaultValue="" /> : ''
            }
          </div>
  
  
          { indications.length > 0 ? <Divider /> : '' }
          
          {
            indications.map((a: any) =>(
              <div key={a.id} className='group-form list-value-of-note'>
                <TextField name='name'  className='form-control' label="Nombre"/>
  
                <div className="form-icon">
                  <TextField name='value' className='form-control' label="Valor" />
                  
                  <AttachmentIcon onClick={(e: any) => (e.currentTarget.nextElementSibling as HTMLInputElement).click()}/>
                  <input type='file' hidden name='fileString'/>
                </div>
              </div>
            ))
          }
  
          { reminders.length > 0 ? <Divider /> : '' }
          {
            reminders.map((a: any) => {

                return (
                    <div key={a.id} className='group-form list-reminders'>
                        <TextField name='name'  className='form-control' label="Nombre"/>
        
                        <div className="form-icon">
                            <DateInput label="Fecha para recordar"/>
                        </div>
                    </div>
                )
            })
          }
  
          <div className="list-chips">
            <Chip onClick={() => setIndications((prev: any) => [...prev, { id: randomNumberInRange(1, 100), name: '', description: '' }])} icon={<AddCircleOutlineIcon />} label="Agregar indicaciones" className='chip'/>
            <Chip onClick={() => setReminders((prev: any) => [...prev, { id: randomNumberInRange(1, 100), name: '', date: '' }])} icon={<AddCircleOutlineIcon />} label="Agregar recordatorio" className='chip'/>
          </div>
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

export default NewNote;