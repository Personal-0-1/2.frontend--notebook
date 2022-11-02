import { GoogleLogin, GoogleLoginProps } from "@react-oauth/google";
import axios from "axios";
import jwtDecode from 'jwt-decode';

const setLogin = async (response: any) => {
    if (!response.credential) return alert("Error al momento de iniciar sessión")
    window.localStorage.setItem("userLogin", response.credential);

    const userInfo: any = getUser();

    const userId = await axios.post(`${process.env.REACT_APP_API}/User/Login`, userInfo);
    window.localStorage.setItem("userId", userId.data.id);
};


const parametersToLogin: GoogleLoginProps = { onSuccess: setLogin, useOneTap: true, cancel_on_tap_outside: false, context: 'use',}

const setParameterToLogin = (name: string, value: any) => {
    // @ts-ignore
    parametersToLogin[name] = value;
};

const login = () => {
    GoogleLogin(parametersToLogin);
};

const getUser = () => {
    const credential = window.localStorage.getItem("userLogin");
    if (!credential) return {};
    
    const userId = window.localStorage.getItem("userId");
    let user: any = jwtDecode(credential);
    user.internalId = userId;
    return user;
};


export {
    login,
    getUser,
    setLogin,
    parametersToLogin,
    setParameterToLogin
}