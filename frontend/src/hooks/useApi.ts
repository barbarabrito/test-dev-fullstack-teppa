import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const useApi = () => ({

    validateToken: async (token: string) => {
        const response = await api.post('/users/validate', `Bearer ${token}`,{ headers: {"Authorization" : `Bearer ${token}`} });
        return response.data;
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
    },
    getTodos: async (token: string) => {
        const response = await api.get('/users/todos', {
            headers: {
              'Authorization': `token ${token}`
            }
          });
        return response.data;
    },
    createTodo: async (text:any, token:string) => {
        const response = await api.post('/todo/create', {text}, {
            headers: {
              'Authorization': `token ${token}`
            }
          });
        return response.data;
    },
    updateTodos: async (id: string, token :string) => {
        const response = await api.put(`/users/todos${id}`, `Bearer ${token}`,{ headers: {"Authorization" : `Bearer ${token}`} });
        return response.data; 
    }

});