// Import
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../store";

//Type
interface todoType {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface initial {
  listTodos: todoType[];
  isCheckedAll: boolean;
  status: string;
  todoEditingId: string;
}

// Khởi tạo state
const initialState: initial = {
  listTodos: [],
  isCheckedAll: false,
  status: "ALL",
  todoEditingId: "",
};

// 
export const todo = createSlice({
  name: "todo", 
  initialState,
  reducers: {
    FETCH_TODOS_SUCCESS: (state, action) => {
      state.listTodos = action.payload;
    },
    SEARCH_TODO: (state, action) => {
      console.log('Reducers action search ', action.payload);
      const list = state.listTodos;
      state.listTodos = list.filter((item) =>
        item.text.includes(action.payload)
      );
    },
    GET_TODO_EDITING_ID: (state, action) => {
      state.todoEditingId = action.payload
    },
    CHECK_ALL_TODOS: (state) => {
      toast.warning(
        `Bạn đã cập nhật list Todo: ${
          state.isCheckedAll === !true ? "Hoàn thành" : "Chưa Hoàn Thành"
        } `
      );
      state.isCheckedAll = !state.isCheckedAll;
    },
    SET_STATUS_FILTER: (state, action) => {
      toast.warning(`Danh sách todos ${action.payload} thành công `);
      state.status = action.payload;
    },
  },
});

export const {
  GET_TODO_EDITING_ID,
  CHECK_ALL_TODOS,
  SET_STATUS_FILTER,
  FETCH_TODOS_SUCCESS,
  SEARCH_TODO,
} = todo.actions;

export const listTodo = (state: RootState) => state.todos.listTodos

export default todo.reducer
