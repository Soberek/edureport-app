import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 200,
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 2,
  borderRadius: "5px"
};

interface BasicModalPropsI {
  children: React.ReactNode;
  handleClose: () => void;
  open: boolean;
}

export default function BasicModal({ children, handleClose, open }: BasicModalPropsI) {
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </Box>
  );
}
