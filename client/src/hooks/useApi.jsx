import { useState } from 'react';
import API from '../services/api';  // importing api.js

const useApi = (urlObject) => {  // object received as parameter from compose mail
    const [response, setResponse] = useState(null);  // usestate used 
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);  // spinner showing api is loading , initially spinner is not there

    const call = async (payload, type = '') => {  // api call
        setResponse(null);   // needed to be initiated by default values because api call will be there several times and if there is a previous value in setresponse, it will return that value    
        setIsLoading(true);  // once api call is made spinner loads
        setError("");
        
        try {  // asynchronous request and so try catch needed to be used
            let res = await API(urlObject, payload, type);  // api call is asynchronous and so await needed to be used
            setResponse(res.data);  // many headers are there so we need to use .data to extract it
        } catch (error) {
            setError(error.message);  // error is in string form only in hook
        } finally {  // whether execution is in try or catch, finally always runs
            setIsLoading(false);  // finally api loads, spinner need to be set false everytime
        }
    }

    return { call, response, error, isLoading };
}

export default useApi;