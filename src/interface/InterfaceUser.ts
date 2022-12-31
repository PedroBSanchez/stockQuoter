interface InterfaceUser {
  email: string;
  password: string;
  stocks: [string];
}

interface InterfaceCreateUser {
  email: string;
  password: string;
  stocks: [] | null;
}

interface InterfaceLogin {
  email: string;
  password: string;
}

interface InterfaceAddStock {
  stock: string;
}

interface InterfaceRemoveStock {
  stock: string;
}

export {
  InterfaceUser,
  InterfaceLogin,
  InterfaceCreateUser,
  InterfaceAddStock,
  InterfaceRemoveStock,
};
