import React, {ReactElement} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  body: ReactElement;
  handleSave: () => void; // TODO fix name;
}

const Modal = (props: ModalProps): ReactElement => {
  const {isOpen, handleClose, title, body} = props;
  return <Dialog open={isOpen} onClose={handleClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      {body}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>OK</Button>
    </DialogActions>
  </Dialog>
}

export default Modal;