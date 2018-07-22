import React, {Component} from "react";
import {connect} from "react-redux";
import {reduxForm,Field} from "redux-form";

import {Dialog,DialogContent,DialogActions,Button} from "@material-ui/core";
import {getActiveMessage,resetActiveMessage,updateMessage} from "../../store/actions/index";
import {validateMessage} from "../../utils/validate";

import Input from "../Input/index";

class MessageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
    this.submit = this.submit.bind(this);
  }

  submit({text}) {
    const {initialValues,onUpdateMessage, onResetActiveMessage} = this.props;
    onUpdateMessage(initialValues._id,text);
    onResetActiveMessage();
  }

  render() {
    const {handleSubmit,onResetActiveMessage,editing} = this.props;
    return (
      <Dialog
        open={editing}
        onClose={onResetActiveMessage}
      >
        <form onSubmit={handleSubmit(this.submit)}>
          <DialogContent>
            <Field name="text" component={Input} multiline/>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              Save
            </Button>
            <Button onClick={onResetActiveMessage} variant="outlined" color="secondary">
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = ({messages}) => ({
  initialValues: messages.get("activeMessage") && messages.get("activeMessage").toJS(),
  editing: messages.get("editing")
});

const mapDispatchToProps = dispatch => ({
  onGetActiveMessage: id => dispatch(getActiveMessage(id)),
  onUpdateMessage: (id,text) => dispatch(updateMessage(id,text)),
  onResetActiveMessage: () => dispatch(resetActiveMessage())
});

export default connect(mapStateToProps,mapDispatchToProps)(
  reduxForm({
    form: "editMessage",
    validate: validateMessage
  })(MessageEdit)
);