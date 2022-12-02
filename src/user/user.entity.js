class User {
  static schema = {
    type: "object",
    properties: {
      username: {
        type: "string",
        errorMessage: "must be of string type",
      },
      completeName: {
        type: "string",
        errorMessage: "must be of string type",
      },
      password: {
        type: "string",
        errorMessage: "must be of string type",
      },
      // post:{//tabla pivot de sus posts
      //     type: "number",  errorMessage: "must be of number type"
      // },
      // commentary:{//tabla pivot de sus commentarios
      //     type: "number",  errorMessage: "must be of number type"
      // }
    },
    required: ["username", "completeName", "password"],
  };
  constructor(userId, username, completeName, password) {
    this.userId = userId;
    this.username = username;
    this.completeName = completeName;
    this.password = password;
  }
}

module.exports = User;
