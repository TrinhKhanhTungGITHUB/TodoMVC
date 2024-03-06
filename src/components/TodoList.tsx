import React, { memo, useCallback } from "react";
import Todo from "./Todo";
import { filterByStatus } from "../helpers/todoHelpers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { checkAllTodosApi } from "../axios";
import { ITodoType } from "../helpers/interface";

const TodoList = memo(() => {
  const dispatch = useDispatch();
  const listTodos = useSelector((state: RootState) =>
    filterByStatus(state.todos.listTodos, state.todos.status)
  );
  const isCheckedAll = [...listTodos].every(
    (e: ITodoType) => e.isCompleted === true
  );

  const onToggleAll = useCallback(() => {
    console.log("check all todos");
    console.log(isCheckedAll);
    console.log(listTodos);
    checkAllTodosApi(listTodos, isCheckedAll, dispatch);
  }, [dispatch, listTodos, isCheckedAll]);

  return (
    <section className="main">
      <input
        className="toggle-all"
        type="checkbox"
        onChange={() => {
          console.log("mark done");
        }}
        checked={isCheckedAll}
      />
      <label htmlFor="toggle-all" onClick={onToggleAll}></label>
      <ul className="todo-list">
        {listTodos.map((todo, index) => (
          <Todo index={index} key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
});

export default TodoList;
