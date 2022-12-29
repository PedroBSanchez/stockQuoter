class User {
  public email: string;
  public password: string;
  public stocks: Array<string>;
  public created_at: Date;
  constructor(
    email: string,
    password: string,
    stocks: Array<string>,
    created_at: Date
  ) {
    this.email = email;
    this.password = password;
    this.stocks = stocks;
    this.created_at = created_at;
  }
}

export { User };
