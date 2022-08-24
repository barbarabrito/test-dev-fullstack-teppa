import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import './ToDo.css';
import { useApi } from "../../hooks/useApi";
import { TodoItem } from "../../types/Todo";

export const ToDo = () => {

    const auth = useContext(AuthContext);
    const api = useApi();
    let id = '';

    const storageData = localStorage.getItem('authToken');

    const [todos, setTodos] = useState<TodoItem[]>([{ _id: '0', text: '', done:false }]);
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
                    console.log(todos)
                    return todos
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    const addTodo = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (storageData) {
            //  console.log(typeof inputValue)
            await api.createTodo( inputValue, (storageData) )
            .then(response => {
                setTodos([...todos]);
                setInputValue('');
              }).catch(error => {
                console.log(error)
            })
        }
    }


    return (
        <div className="container-main-todos">
            <form onSubmit={e => addTodo(e)}>
                <input placeholder={'What do you want to do?'}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)} />
            </form>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>
                        <input type={'checkbox'}
                            defaultChecked={todo.done}
                            
                            // onClick={() => updateToDo(todo)}

                        />
                        {todo.done ? <del>{todo.text}</del> : todo.text}
                    </li>
                ))}
            </ul>
        </div>


    );
}

