import Modal from "@mui/material/Modal";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { onEditTodoApi } from "../axios";
import { ITodoType } from "../helpers/interface";
import { GET_TODO_EDITING_ID } from "../redux/Reducers/todos";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface IPopupType {
  modalIsOpen: boolean;
  closeModal: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo: ITodoType;
  index: number;
}
export const Popup = ({
  modalIsOpen,
  closeModal,
  setIsOpen,
  todo,
  index,
}: IPopupType) => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>(todo.text);

  const closePopup = () => {
    setIsOpen(!modalIsOpen);
  };

  const validateTodo = (text: string) => {
    if (text !== text.trim()) {
      return "String should not contain spaces at the beginning or end";
    } else if (!/^\S+(\s\S+)*$/.test(text)) {
      return "String should have exactly one space between words";
    } else if (/\d/.test(text)) {
      return "String should not contain numeric characters";
    }
    return null; // Chuỗi hợp lệ
  };

  const handleEditTodo = () => {
    const validationError = validateTodo(text);
    if (validationError) {
      toast.error(validationError);
    } else {
      onEditTodoApi(todo, text, index, dispatch);
      dispatch(GET_TODO_EDITING_ID(""));
      toast.success(`Bạn đã sửa công việc: ${text} thành công `);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2, fontSize: "28px" }}
          >
            Edit Todo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mb: 2 }}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                fontSize: "24px",
              }}
            />
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button sx={{ mr: 1 }} onClick={closePopup} variant="outlined">
              Close
            </Button>
            <Button onClick={handleEditTodo} variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
