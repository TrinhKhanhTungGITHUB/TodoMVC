import React, { useEffect } from "react";
import "./App.css";
import "./css/Todo.css";
import { fetchTodos as fetchTodo } from "./axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTodo(dispatch);
  }, [dispatch]);
  const data = useSelector((state: RootState) => state.todos.listTodos);
  console.log(data);
  return (
    <React.Fragment>
      <div className="todoapp">
        <Header />
        <TodoList/>
        <Footer/>
        <ToastContainer/>
      </div>
    </React.Fragment>
  );
}

export default App;
