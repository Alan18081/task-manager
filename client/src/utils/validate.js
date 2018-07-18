import isEmail from "isemail";

const testMask = /\d{2}\.\d{2}\.\d{4}/;

export const validateProfile = ({ name, email, birth }) => {
  const errors = {};

  if (!name) {
    errors.name = "Please provide your name";
  }

  if (!email) {
    errors.email = "Please, provide your email";
  } else if (!isEmail.validate(email)) {
    errors.email = "Please, write your email properly";
  }

  if (!birth) {
    errors.birth = "Please, provide your date of birth";
  } else if (!testMask.test(birth)) {
    errors.birth = "Please, write your date of birth properly";
  }

  return errors;
};

export const validateMessage = ({ text }) => {
  const errors = {};

  if (!text) {
    errors.text = "Message cannot be empty";
  }

  return errors;
};

export const validateLogin = ({ login, password }) => {
  const errors = {};

  if (!login) {
    errors.login = "Please, write your name or email";
  }

  if (!password) {
    errors.password = "Please, write your password";
  } else if (password.length < 4) {
    errors.password = "Password should be at least 4 characters";
  }

  return errors;
};

export const validateRegister = ({
  name,
  email,
  password,
  confirmPassword
}) => {
  const errors = {};

  if (!name) {
    errors.name = "Please, write your name";
  }

  if (!email) {
    errors.email = "Please, write your email";
  } else if (!isEmail.validate(email)) {
    errors.email = "Please, write email properly";
  }

  if (!password) {
    errors.password = "Please, write password";
  } else if (password.length < 4) {
    errors.password = "Password should be at least 4 characters";
  } else if (password !== confirmPassword) {
    errors.password = "Passwords should match";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please, write password";
  } else if (confirmPassword.length < 4) {
    errors.confirmPassword = "Password should be at least 4 characters";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords should match";
  }

  return errors;
};

export const validateCreateTask = ({ title, description }) => {
  const errors = {};

  if (!title) {
    errors.title = "Please, provide title";
  }

  if (!description) {
    errors.description = "Please, provide description";
  }

  return errors;
};
