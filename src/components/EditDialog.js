import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { edit, closeEditWindow, submitEditWindow } from "./todoActions";

const EditDialog = props => {
  const { editWindow, edit, closeEditWindow, submitEditWindow } = props;
  return (
    <div>
      <Dialog
        fullWidth
        open={editWindow.open}
        onClose={closeEditWindow}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit description</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="editWindow"
            type="text"
            fullWidth
            defaultValue={editWindow.todo.description}
            onChange={submitEditWindow}
            onKeyPress={e => {
              if (e.key === "Enter") {
                edit(
                  editWindow.todo,
                  editWindow.textValue,
                  editWindow.todo.state
                );
                closeEditWindow();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditWindow} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              edit(
                editWindow.todo,
                editWindow.textValue,
                editWindow.todo.state
              );
              closeEditWindow();
            }}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  editWindow: state.get("editWindow").toObject()
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ edit, closeEditWindow, submitEditWindow }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDialog);
