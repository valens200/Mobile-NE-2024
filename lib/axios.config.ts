import _ from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tokens } from "react-native-paper/lib/typescript/styles/themes/v3/tokens";

const baseURL =  "http://10.5.222.24:8000/api/v1";
export const axios = _.create({
    baseURL: baseURL,
    timeout: 5000,// 5 seconds
});

export const authApi = _.create({
    baseURL:baseURL,
    timeout:500,

})

// Get the token from AsyncStorage
AsyncStorage.getItem("token")
    .then((token) => {
        console.log("Tokennn ======== ", token)
        // Set the token as the authorization header
        authApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    })
    .catch((error) => {
        console.log("Error retrieving token from AsyncStorage:", error);
    });

export default axios;