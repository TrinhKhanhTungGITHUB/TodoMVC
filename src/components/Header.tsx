import React, { memo, useCallback, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';

import { addTodoApi, fetchTodos } from '../axios';
import {v4 as uuidv4} from "uuid"
import { SEARCH_TODO } from '../redux/Reducers/todos';
import { RootState } from '../redux/store';
const Header = memo(() => {
    const dispatch = useDispatch();

    const isCheckedAll = useSelector((state:RootState) => state.todos.isCheckedAll);

    const [text, setText] = useState('')
    const [searchText, setSearchText] = useState('');

    const validateTodo = (text:string) => {
        if (text !== text.trim()) {
            return "String should not contain spaces at the beginning or end";
        } else if (!/^\S+(\s\S+)*$/.test(text)) {
            return "String should have exactly one space between words";
        } else if (/\d/.test(text)) {
            return "String should not contain numeric characters";
        }
        return null; // Chuỗi hợp lệ
    };

    const onAddTodo = useCallback((e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && text) {
            const validationError = validateTodo(text);
            if (validationError) {
                toast.error(validationError);
            } else {
                const todo = {
                    id: `todo_${uuidv4()}`,
                    text,
                    isCompleted: false
                }
                addTodoApi(todo,dispatch)
                toast.success(`Bạn đã thêm công việc: ${text} thành công`);
                setText('');
            }
        }
    }, [dispatch, text]);

   const onSearchTodo = useCallback((searchText:string) => {
        console.log(searchText)
        if (searchText.startsWith(' ')) {
            toast.error('String should not contain spaces at the beginning');
            fetchTodos(dispatch);
            setSearchText('');
        }
        else if (searchText === "") {
            fetchTodos(dispatch);
        }
        else {
            dispatch(SEARCH_TODO(searchText));
        }
    }, [dispatch]);

    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="search-todo"
                placeholder="Search ?"
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                    onSearchTodo(e.target.value);
                }}
            />
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => onAddTodo(e)}
                checked={isCheckedAll}
            />
        </header>
    )
})

export default Header


