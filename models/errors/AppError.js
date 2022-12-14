class AppError extends Error {
  constructor() {
    super();
  }
}

class ValidationError extends AppError {
  constructor(validationObject) {
    super();
    this.code = 400;
    this.message = 'Incorrect input data';
    this.errors = validationObject.array();
  }
}

class CustomError extends AppError {
  constructor(msg, code) {
    super(msg);
    this.code = code;
    this.message = msg;
  }
}

class UserAlreadyExistError extends CustomError {
  constructor() {
    super('Such user already exist', 400);
  }
}

class UserNotFoundError extends CustomError {
  constructor() {
    super('User doesn\t exist', 400);
  }
}

class WrongPasswordError extends CustomError {
  constructor() {
    super('Incorrect password', 403);
  }
}

module.exports = {
  AppError,
  ValidationError,
  UserAlreadyExistError,
  UserNotFoundError,
  WrongPasswordError,
};
