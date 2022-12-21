class User {
  public email: string;
  public password: string;
  public stocks: Array<string>;
  constructor(email: string, password: string, stocks: Array<string>) {
    this.email = email;
    this.password = password;
    this.stocks = stocks;
  }
}

export { User };
