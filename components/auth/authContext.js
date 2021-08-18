class LoginContext {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }

  getData() {
    return {
      email: this.email,
      password: this.password,
    };
  }
}

class RegisterContext {
  constructor({ email, password, name }) {
    this.email = email;
    this.password = password;
    this.name = name;
  }

  getData() {
    return {
      email: this.email,
      password: this.password,
      name: this.name,
    };
  }
}

module.exports = { LoginContext, RegisterContext };
