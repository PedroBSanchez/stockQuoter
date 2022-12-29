interface InterfaceUser {
  email: string;
  password: string;
  stocks: [string];
}

interface InterfaceLogin {
  email: string;
  password: string;
}

export { InterfaceUser, InterfaceLogin };
