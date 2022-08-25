import axios from "axios";

const api = axios.create({
    baseURL: 'https://todosapitest.herokuapp.com',
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
    createTodo: async (text:string, done:boolean , token:string) => {
        const response = await api.post('/todo/create', {text, done},{
            headers: {
              'Authorization': `token ${token}`
            }
          });
        return response.data;
    },
    updateTodoCompleteness: async (id:string, done:boolean, token:string) => {
        const response = await api.put(`todo/${id}`, {done},{
            headers: {
              'Authorization': `token ${token}`
            }
          });
        return response.data; 
    },
    removeTodo: async (id: string, token:string) => {
      const response = await api.delete(`todo/${id}`, {
        headers: {
          'Authorization': `token ${token}`
        }
      });
      return response.data;
    }
});