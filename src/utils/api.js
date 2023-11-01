import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TBBD_TOKEN = import.meta.env.VITE_APP_TMBD_TOKEN;

//headers is an object that contains the token that we need to send with each request to the api
const headers = {
    Authorization: "Bearer " + TBBD_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    //axios.get return a promise so we can use async/await to wait for the response
    // axios is a library that helps us to make http requests to an api it directly returns the response object  (response.data) we have't to use json() method to get the data from the response object


    /*
        axios
        .get(BASE_URL + url, {
            // get request take 2 params: url and config object (optional) with params and headers
            params,
            headers,
        })
        .then(({ data }) => {
            // destructuring data from response object
            console.log("From api.js");
            console.log(data);
            return data;
        })
        .catch((err) => {
            console.log("error" + err);
            return err;
        });
    */
    
    
    try {
        const { data } = await axios.get(BASE_URL + url, {
            params,
            headers,
        });

        return data;
    }
    catch (err) {
        console.log("error" + err);
        return err;
    }
};
