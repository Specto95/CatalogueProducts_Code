const { buildSchema } = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../users");

const JWT_SECRET = "supersecretkey123";

const schema = buildSchema(`

  enum Role {
    ADMIN
    USER
  }

  type User {
    id: ID!
    email: String!
    password: String!
    role: Role!
  }

  type AuthPayload {
    message: String!
    token: String!
    user: User
  }

  type LogoutPayload {
    message: String!
  }

  type RegisterPayload {
    message: String!
    user: User
  }

  """ DummyJSON Product model """
  type Product {
    id: ID!
    title: String!
    description: String!
    price: Float!
    discountPercentage: Float
    rating: Float
    stock: Int
    brand: String
    category: String
    thumbnail: String
    images: [String]
  }

  type ProductsResponse {
    products: [Product!]!
    total: Int
    skip: Int
    limit: Int
  }

  input ProductInput {
    id: ID
    title: String!
    description: String!
    price: Float!
    category: String!
    thumbnail: String
  }

  type Query {
    getProfile(token: String!): User
    isUserAuthenticated(token: String!): Boolean
    getAllUsers(token: String!): [User]

    listProducts: ProductsResponse
    isEmailAvailable(email: String!): Boolean
  }

  type Mutation {
    register(email: String!, password: String!, role: String!): RegisterPayload
    login(email: String!, password: String!): AuthPayload
    logout(token: String!): LogoutPayload

    createProduct(input: ProductInput!): Product
    updateProduct(id: ID!, input: ProductInput!): Product
    deleteProduct(id: ID!): Product
  }
`);

const activeTokens = new Set();

const rootValue = {
  //? --- Auth ---
  register: async ({ email, password, role }) => {
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("El correo ya existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      role: role.toUpperCase() === "ADMIN" ? "ADMIN" : "USER",
    };
    users.push(user);

    return {
      message: "Usuario registrado exitosamente",
      user,
    };
  },

  login: async ({ email, password }) => {
    const user = users.find((u) => u.email === email);
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    activeTokens.add(token);

    return {
      message: "Inicio de sesión exitoso",
      token,
      user,
    };
  },

  logout: ({ token }) => {
    if (activeTokens.has(token)) {
      activeTokens.delete(token);
      return { message: "Logout successful" };
    }
    throw new Error("Token expirado");
  },

  isUserAuthenticated: ({ token }) => {
    if (!token) return false;
    if (!activeTokens.has(token)) return false;

    try {
      jwt.verify(token, JWT_SECRET);
      return true;
    } catch {
      return false;
    }
  },

  getProfile: ({ token }) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = users.find((u) => u.id === decoded.id);
      if (!user) throw new Error("Usuario no encontrado");
      return user;
    } catch {
      throw new Error("Unauthorized");
    }
  },

  getAllUsers: ({ token }) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.role !== "ADMIN")
        throw new Error("Acceso denegado: Solo administradores");
      return users.map(({ password, ...rest }) => rest);
    } catch {
      throw new Error("Unauthorized");
    }
  },

  // -------------- Product operations ----------------
  listProducts: async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data;
  },

  isEmailAvailable: ({ email }) => {
    const user = users.find((u) => u.email === email);
    return !user;
  },

  // --- PRODUCT MUTATIONS (Admin only) ---

  createProduct: async ({ input }, req) => {
    if (!req.isAuth || req.user.role !== "ADMIN") {
      throw new Error("Unauthorized: Admins only");
    }

    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const data = await response.json();
    console.log("Created product:", data);

    return data;
  },

  updateProduct: async ({ id, input }, req) => {
    if (!req.isAuth || req.user.role !== "ADMIN") {
      throw new Error("Unauthorized: Admins only");
    }

    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await response.json();
    return data;
  },

  deleteProduct: async ({ id }, req) => {
    if (!req.isAuth || req.user.role !== "ADMIN") {
      throw new Error("Unauthorized: Admins only");
    }

    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("Deleted product:", data);
    return data;
  },
};

module.exports = {
  schema,
  rootValue,
};
