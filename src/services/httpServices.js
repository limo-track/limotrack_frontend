import axios from 'axios';

const http = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_SERVER
});

// axios.defaults.headers.common['x-auth-token'] = auth.token;

http.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        console.log(error);
    }
    return Promise.reject(error);
});

export default {
    get: http.get,
    post: http.post,
    put: http.put,
    patch: http.patch,
    delete: http.delete
};