import axios from "axios";

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmlhQGVtYWlsLmNvbSIsImlhdCI6MTY2MTE3NzYxMSwiZXhwIjoxNjYxMjA2NDExfQ.-u7T6rRNh216ULsYWP0_mf4w8z-nGRHqp4r0VrRyyHY';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    // headers: {'Authorization': 'Bearer '+token}
});

// let a = api.interceptors.request.use(function (config) {
//     const token = localStorage.getItem('authToken');
//     api.defaults.headers.common['Authorization'] =  token ? `Bearer ${token}` : '';
//     return config;
// });


export const useApi = () => ({

    validateToken: async (token: string) => {

        const response = await api.post('/users/validate', `Bearer ${token}`,{ headers: {"Authorization" : `Bearer ${token}`} });
        return response.data;
        // return {user: {id: 1, name: 'maria', email: 'maria@email.com', message: message}};
        
        // return {
        //     user: {id: 1, name: 'maria', email: 'maria@email.com'}
        // }
    },
    register: async (name: string, email: string, password: string, confirmPassword:string) => {
        const response = await api.post('/users/register', {name, email, password, confirmPassword});
        return response.data;
    },
    signin: async (email: string, password: string) => {
        const response = await api.post('/users/login', {email, password});
        return response.data;
    },
    logout: async () => {
        return {status: true}
        const response = await api.post('/logout');
        return response.data;
    }
});