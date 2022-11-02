import axios from "axios";

function randomNumberInRange(min: number, max: number) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const getListOfGroup = async (internalId: number) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/GroupNote/GetListGroupNote?user_id=${internalId}`);
    return response.data;
}

const inputDateToFormatValid = (date: string) => {
    let format = date.split("/");
    let response =  `${format[2].split(" ")[0]}-${format[0]}-${format[1]}`;
    let hour = format[2].split(" ")[1].split(":")
    
    if (date.toLowerCase().includes("pm")) hour[0] = (parseInt(hour[0]) * 12).toString();
    
    response += " " + hour.join(":");

    return response;
};

export {
    randomNumberInRange,
    getListOfGroup,
    inputDateToFormatValid
}