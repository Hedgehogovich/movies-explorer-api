class UserEditContext {
  constructor({ email, name }) {
    this.email = email;
    this.name = name;
  }

  getData() {
    return {
      email: this.email,
      name: this.name,
    };
  }
}

module.exports = { UserEditContext };
