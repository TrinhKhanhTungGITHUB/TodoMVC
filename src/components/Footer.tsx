import React, { memo } from "react";
import { filterByStatus } from "../helpers/todoHelpers";
import { SET_STATUS_FILTER } from "../redux/Reducers/todos";
import { clearCompletedApi } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface IPropTypeFooter {
  title: string;
  onClick: () => void;
  link: string;
  isActive: boolean;
}

export enum ETodoStatus {
  Active = "ACTIVE",
  Completed = "COMPLETED",
  All = "ALL",
}

const Footer = memo(() => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.todos.status);
  const numOfTodosLeft = useSelector(
    (state: RootState) => filterByStatus(state.todos.listTodos, ETodoStatus.Active).length
  );
  const numOfTodos = useSelector(
    (state: RootState) => state.todos.listTodos.length
  );
  const idsTodoCompleted: string[] = useSelector((state: RootState) =>
    filterByStatus(state.todos.listTodos, ETodoStatus.Completed).map((todo) => todo.id)
  );

  //setStatusFilter
  const filterBtns = [
    {
      title: "All",
      isActive: status === "ALL", //Biến để kích hoạt sự kiện
      onClick: () => {
        dispatch(SET_STATUS_FILTER("ALL"));
      },
      link: "",
    },
    {
      title: "Active",
      isActive: status === "ACTIVE",
      onClick: () => {
        dispatch(SET_STATUS_FILTER("ACTIVE"));
      },
      link: "active",
    },
    {
      title: "Completed",
      isActive: status === "COMPLETED",
      onClick: () => {
        dispatch(SET_STATUS_FILTER("COMPLETED"));
      },
      link: "completed",
    },
  ];

  const handleClearCompleted = () => {
    console.log("Clean todo đã hoàn thành");
    clearCompletedApi(idsTodoCompleted, dispatch);
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {/* Todo chưa hoàn thành */}
        <p style={{ margin: 0 }}>
          {`${numOfTodosLeft} ${ numOfTodosLeft > 1 ? "items" : "item"
        } left`}
        </p>
      </span>
      <ul className="filters">
        {filterBtns.map((btn) => (
          <FilterBtn key={`btn${btn.title}`} {...btn} />
        ))}
      </ul>
      {
        // Event Xóa Todo đã hoàn thành.
        // numOfTodosLeft < numOfTodos && <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
        numOfTodosLeft < numOfTodos && (
          <button
            className="clear-completed"
            onClick={() => handleClearCompleted()}
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
});

const FilterBtn = memo(({ title, onClick, link, isActive }: IPropTypeFooter) => {
  return (
    <React.Fragment>
      <li>
        <a
          href={`#/${link}`}
          className={`${isActive && "selected"}`}
          onClick={onClick}
        >
          {title}
        </a>
      </li>
      <span></span>
    </React.Fragment>
  );
});

export default Footer;
