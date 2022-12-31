class User {
  public email: string;
  public password: string;
  public stocks: [string];
  public created_at: Date;
  constructor(
    email: string,
    password: string,
    stocks: [string],
    created_at: Date
  ) {
    this.email = email;
    this.password = password;
    this.stocks = stocks;
    this.created_at = created_at;
  }
}

export { User };
