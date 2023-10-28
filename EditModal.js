import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { updatePost } from "../app/store/slices/PostSlice";
import { useDispatch } from "react-redux";
import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InsertOrUpdateForm from "./InsertOrUpdateForm";

const style = {
  position: "absolute",
  top: "7%",
  right: "30%",
  left: "30%",
  width: "auto",
  height: "auto",
  bgcolor: "#d1d5db",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function EditModal({ defaultValues, id }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleEdit = (data) => {
    dispatch(updatePost({ id: id, ...data }));
    handleClose();
  };

  return (
    <>
      <Button onClick={handleShow}>Edit</Button>
      <Modal open={show} onClose={handleClose}>
        <Box sx={style}>
          <IconButton onClick={handleClose} sx={{ position: "absolute", top: "8px", right: "8px", color: "grey" }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h4">Edit Modal</Typography>
          <InsertOrUpdateForm defaultValues={defaultValues} onSubmit={handleEdit} />
        </Box>
      </Modal>
    </>
  );
}