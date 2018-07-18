import React from "react";
import { reduxForm, Field } from "redux-form";
import { Button, withStyles } from "@material-ui/core";

import AccountIcon from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import DateIcon from "@material-ui/icons/DateRange";
import { validateProfile } from "../../utils/validate";

import Input from "../Input/index";
import FormCard from "../FormCard";

import styles from "./styles";

const ProfileEdit = ({ handleSubmit, classes, onSave, toggle }) => (
  <FormCard title="Edit profile">
    <form onSubmit={handleSubmit(onSave)}>
      <Field name="name" component={Input} label="Name" Icon={AccountIcon} />
      <Field name="email" component={Input} label="Email" Icon={MailIcon} />
      <Field
        name="birth"
        component={Input}
        label="Date of birth"
        Icon={DateIcon}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.mainBtn}
        fullWidth
      >
        Save
      </Button>
      <Button onClick={toggle} variant="outlined" color="secondary" fullWidth>
        Cancel
      </Button>
    </form>
  </FormCard>
);

export default reduxForm({
  form: "editProfile",
  validate: validateProfile
})(withStyles(styles)(ProfileEdit));
