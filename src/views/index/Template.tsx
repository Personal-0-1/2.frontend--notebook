import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { getUser, parametersToLogin, setLogin, setParameterToLogin } from "../../helpers/account";
import { SnackbarProvider } from 'notistack';


import App from './App';

const IsLogin = () => {
    let [user] = useState(getUser());

    setParameterToLogin("onSuccess", async (e: any) => { await setLogin(e); window.location.replace(''); });
    if (JSON.stringify(user) === "{}") GoogleLogin(parametersToLogin);

    return true;
};

function TemplateIndex() {
    IsLogin();
    
    return (
        <SnackbarProvider maxSnack={10} autoHideDuration={1000000}>
            <App />
        </SnackbarProvider>
    )
}

export default TemplateIndex;