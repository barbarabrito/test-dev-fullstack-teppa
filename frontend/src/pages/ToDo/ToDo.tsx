import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import './ToDo.css';
import { useApi } from "../../hooks/useApi";
import { TodoItem } from "../../types/Todo";
import { IoMdTrash } from "react-icons/io";

export const ToDo = () => {

    const auth = useContext(AuthContext);
    const api = useApi();
    let id = '';

    const storageData = localStorage.getItem('authToken');

    const [todos, setTodos] = useState<TodoItem[]>([{ _id: '0', text: '', done: false }]);
    const [inputValue, setInputValue] = useState('');

    if (auth.user?._id) {
        id = auth.user._id;
    }

    useEffect(() => {
        getUserTodos();
    }, [inputValue]);

    const getUserTodos = async () => {

        if (storageData) {

            await api.getTodos(storageData)
                .then(response => {
                    setTodos(response)
                    return todos
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    const updateToDoCompleteness_ = async (todo: any) => {

        const data = { id:todo._id, done:!todo.done };

        if (storageData) {

            await api.updateTodoCompleteness(todo._id, data.done, (storageData))
            .then(() => {
                const newTodos = todos.map(task => {
                    
                    if (task._id === todo._id) {
                        task.done = !task.done;
                    }
                  
                  return task;
                });
                setTodos([...newTodos]);
              });
        }
    }

    const addTodo = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (storageData) {
            await api.createTodo(inputValue, false, (storageData))
                .then(response => {
                    setTodos([...todos]);
                    setInputValue('');
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    const removeTodo = async (id: string) => {

        if (storageData) {

            await api.removeTodo(id, (storageData))
                .then(response => {
                    const updatedTodos = todos.filter((todo) => todo._id != id)
                    setTodos(updatedTodos)
                    return response.data
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    return (
        <div className="container-main-todos">
            <form onSubmit={e => addTodo(e)}>
                <input placeholder="What are you gonna do?"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)} />
            </form>
            <div className="todos">
                <ul>
                    {todos.map((todo) => (
                        <li key={todo._id}>
                            <input type="checkbox"
                                defaultChecked={todo.done}
                                onClick={() => updateToDoCompleteness_(todo)}
                            />
                             {todo.done ? <del>{todo.text}</del> : todo.text}
                            <button id="delete-todo-btn" onClick={(e) => { removeTodo(todo._id) }}><IoMdTrash /></button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}