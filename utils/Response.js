class Response {
  constructor(data) {
    this.data = data;
  }

  toObject() {
    return { data: this.data };
  }
}

module.exports = { Response };
