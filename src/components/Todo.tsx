import React, { memo, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { GET_TODO_EDITING_ID } from "../redux/Reducers/todos";
import { markCompletedApi,removeTodoApi } from "../axios";
import { RootState } from "../redux/store";
import { ITodoType } from "../helpers/interface";
import { Popup } from "./Modal";


interface IPropsType { //IProps
  todo: ITodoType; // ITodo
  index: number;
}

const Todo = memo(({ todo, index }: IPropsType) => {
  const dispatch = useDispatch();

  const todoEditingId = useSelector(
    (state: RootState) => state.todos.todoEditingId
  );
  const isEditing = todoEditingId === todo.id; // Kiểm tra xem todo nào đang cần sửa.

  const handleMarkCompleted = useCallback(
    (todo: ITodoType) => {
      console.log("Event Cập nhật trạng thái todo");
      console.log(todo.isCompleted);
      markCompletedApi(todo, dispatch);
      toast.success(
        `Cập nhật  trạng thái todo thành công: ${
          !todo.isCompleted === true ? "Hoàn thành" : "Chưa hoàn thành"
        } `
      );
    },
    [dispatch]
  );

  const handleRemoveTodo = useCallback(
    (todo: ITodoType) => {
      console.log("remove Todo");
      removeTodoApi(todo.id, dispatch);
      toast.warning(`Bạn đã xóa Todo thành công `);
    },
    [dispatch]
  );

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <li
      className={`${isEditing ? "editing" : ""} ${
        todo.isCompleted ? "completed" : ""
      }`}
    >
      {/* {!isEditing ? ( */}
      <div className="view">
        <Popup
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          setIsOpen={setIsOpen}
          todo={todo}
          index={index}
        />
        <input
          className="toggle"
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => handleMarkCompleted(todo)}
        />

        <label
          onDoubleClick={() => {
            dispatch(GET_TODO_EDITING_ID(todo.id)); // Update todoEditingId
            openModal();
          }}
        >
          {todo.text}
        </label>
        <button
          className="destroy"
          onClick={() => {
            handleRemoveTodo(todo);
          }}
        />
      </div>

      {/* ) :
       (
        <input
          className="edit"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            handleEditTodo(todo);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && text) {
              handleEditTodo(todo);
            }
          }}
        />
      )} */}
    </li>
  );
});

export default Todo;
