import axios from "axios";
import { FETCH_TODOS_SUCCESS, CHECK_ALL_TODOS } from "../redux/Reducers/todos";
import { Dispatch } from "redux";
// Base url
export const BaseUrl = "http://localhost:3000/todos";

interface todoType {
  id: string;
  text: string;
  isCompleted: boolean;
}

export const fetchTodos = async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(BaseUrl); // Điều chỉnh URL nếu cổng không phải là 3001
    // console.log("Response data:", response.data); // In ra để kiểm tra
    if (response.data !== undefined) {
      dispatch(FETCH_TODOS_SUCCESS(response.data));
    } else {
      console.log("Error fetching todos: Invalid API response");
    }
  } catch (error) {
    console.log("Error fetching todos:", error);
  }
};

export const addTodoApi = async (todo: todoType, dispatch: Dispatch) => {
  try {
    // Gửi yêu cầu POST để thêm Todo mới vào fake API
    const response = await axios.post(BaseUrl, todo);
    // Kiểm tra xem yêu cầu đã thành công chưa
    if (response.status === 201) {
      console.log("Dữ liệu được thêm mới:", response.data);
      fetchTodos(dispatch);
    } else {
      console.error(
        "Error adding todo: Unexpected response status",
        response.status
      );
    }
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

export const removeTodoApi = async (id: string, dispatch: Dispatch) => {
  console.log("id", id);
  try {
    // Gửi yêu cầu DELETE để xóa Todo khỏi fake API
    const response = await axios.delete(`${BaseUrl}/${id}`);
    // Kiểm tra xem yêu cầu đã thành công chưa
    if (response.status === 200) {
      fetchTodos(dispatch);
      // Nếu thành công, cập nhật store để loại bỏ todo đã xóa
      // dispatch(removeTodo(id));
      console.log("Todo đã được xóa thành công.");
    } else {
      console.error(
        "Lỗi khi xóa todo: Trạng thái phản hồi không mong muốn",
        response.status
      );
    }
  } catch (error) {
    console.error("Lỗi khi xóa todo:", error);
  }
};

export const clearCompletedApi = async (ids: string[], dispatch: Dispatch) => {
  console.log("ids", ids);
  try {
    // Gửi yêu cầu DELETE để xóa nhiều todos khỏi fake API
    await Promise.all(
      ids.map(async (id) => {
        const response = await axios.delete(`${BaseUrl}/${id}`);
        // Kiểm tra xem yêu cầu đã thành công chưa
        if (response.status === 200) {
          // Nếu thành công, cập nhật store để loại bỏ todo đã xóa
          console.log(`Todo với id ${id} đã được xóa thành công.`);
        } else {
          console.error(
            `Lỗi khi xóa todo với id ${id}: Trạng thái phản hồi không mong muốn`,
            response.status
          );
        }
      })
    );
    fetchTodos(dispatch);
    console.log("Các todos đã được xóa thành công.");
  } catch (error) {
    console.error("Lỗi khi xóa todos:", error);
  }
};

export const checkAllTodosApi = async (
  listTodos: todoType[],
  isCheckedAll: boolean,
  dispatch: Dispatch
) => {
  const updatedListTodos = listTodos.map((item) => ({
    ...item,
    isCompleted: !isCheckedAll,
  }));
  console.log(updatedListTodos);
  // Sử dụng Promise.all để đợi tất cả các yêu cầu hoàn tất
  try {
    await Promise.all(
      updatedListTodos.map(async (todo) => {
        const response = await axios.put(`${BaseUrl}/${todo.id}`, todo);
        if (response.status !== 200) {
          console.error("Lỗi khi cập nhật công việc:", response.status);
        }
      })
    );
    fetchTodos(dispatch);
    // Sau khi tất cả yêu cầu đã hoàn tất, bạn có thể dispatch action ở đây
    dispatch(CHECK_ALL_TODOS());
  } catch (error) {
    console.error("Lỗi khi cập nhật toàn bộ công việc:", error);
  }
};

export const markCompletedApi = async (todo: todoType, dispatch: Dispatch) => {
  console.log("todo:", todo);
  try {
    // Gửi yêu cầu PUT để sửa Todo khỏi fake API
    const response = await axios.put(`${BaseUrl}/${todo.id}`, {
      isCompleted: !todo.isCompleted, // Toggle giá trị trạng thái
      text: todo.text,
    });
    // Kiểm tra xem yêu cầu đã thành công chưa
    if (response.status === 200) {
      fetchTodos(dispatch);
      // Nếu thành công, cập nhật store để cập nhật trạng thái todos
      // dispatch(markCompleted(todo.id));
    } else {
      console.error(
        "Lỗi khi cập nhật trạng thái todo: Trạng thái phản hồi không mong muốn",
        response.status
      );
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái todo:", error);
  }
};

export const onEditTodoApi = async (
  todo: todoType,
  text: string,
  index: number,
  dispatch: Dispatch
) => {
  console.log("todo: ", todo, "text: ", text, "index: ", index);
  try {
    // Gửi yêu cầu PUT để sửa Todo khỏi fake API
    const response = await axios.put(`${BaseUrl}/${todo.id}`, {
      isCompleted: todo.isCompleted, // Toggle giá trị trạng thái
      text,
    });
    // Kiểm tra xem yêu cầu đã thành công chưa
    if (response.status === 200) {
      // Nếu thành công, cập nhật store để cập nhật trạng thái todos
      fetchTodos(dispatch);
      console.log("Todo đã được cập nhật thành công.");
    } else {
      console.error(
        "Lỗi khi cập nhật todo: Trạng thái phản hồi không mong muốn",
        response.status
      );
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật todo:", error);
  }
};