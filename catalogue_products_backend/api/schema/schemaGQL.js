// const { buildSchema } = require("graphql");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { users } = require("../users.mjs");
// const crypto = require("crypto");

// const JWT_SECRET = "supersecretkey123";

// const schema = buildSchema(`

//   enum Role {
//     ADMIN
//     USER
//   }

//   type User {
//     id: ID!
//     email: String!
//     password: String!
//     role: Role!
//   }

//   type AuthPayload {
//     message: String!
//     token: String!
//     user: User
//   }

//   type LogoutPayload {
//     message: String!
//   }

//   type ForgotPasswordPayload {
//     message: String!
//     user: User
//   }

//   type ChangePasswordPayload {
//     message: String!
//     user: User
//   }

//   type ResetPasswordPayload {
//     message: String!
//     user: User
//   }

//   type RegisterPayload {
//     message: String!
//     user: User
//   }

//   """ DummyJSON Product model """
//   type Product {
//     id: ID!
//     title: String!
//     description: String!
//     price: Float!
//     discountPercentage: Float
//     rating: Float
//     stock: Int
//     brand: String
//     category: String
//     thumbnail: String
//     images: [String]
//   }

//   type ProductsResponse {
//     products: [Product!]!
//     total: Int
//     skip: Int
//     limit: Int
//   }

//   input ProductInput {
//     id: ID
//     title: String!
//     description: String!
//     price: Float!
//     category: String!
//     thumbnail: String
//   }

//   type Query {
//     getProfile(token: String!): User
//     isUserAuthenticated(token: String!): Boolean
//     getAllUsers(token: String!): [User]

//     listProducts: ProductsResponse
//     isEmailAvailable(email: String!): Boolean
//     isRegisteredEmail(email: String!): Boolean
//   }

//   type Mutation {
//     register(email: String!, password: String!, role: String!): RegisterPayload
//     login(email: String!, password: String!): AuthPayload
//     logout(token: String!): LogoutPayload
//     changePassword(email: String!, oldPassword: String!, newPassword: String!): ChangePasswordPayload
//     forgotPassword(email: String!): ForgotPasswordPayload
//     resetPassword(email: String!, newPassword: String!): ResetPasswordPayload

//     createProduct(input: ProductInput!): Product
//     updateProduct(id: ID!, input: ProductInput!): Product
//     deleteProduct(id: ID!): Product
//   }
// `);

// const activeTokens = new Set();

// const rootValue = {

//   getProfile: ({ token }) => {
//     try {
//       const decoded = jwt.verify(token, JWT_SECRET);
//       const user = users.find((u) => u.id === decoded.id);
//       if (!user) throw new Error("Usuario no encontrado");
//       return user;
//     } catch {
//       throw new Error("Unauthorized");
//     }
//   },

//   getAllUsers: ({ token }) => {
//     try {
//       const decoded = jwt.verify(token, JWT_SECRET);
//       if (decoded.role !== "ADMIN")
//         throw new Error("Acceso denegado: Solo administradores");
//       return users.map(({ password, ...rest }) => rest);
//     } catch {
//       throw new Error("Unauthorized");
//     }
//   },

//   // -------------- Product operations ----------------
//   listProducts: async () => {
//     const response = await fetch("https://dummyjson.com/products");
//     const data = await response.json();
//     return data;
//   },

//   isEmailAvailable: ({ email }) => {
//     const user = users.find((u) => u.email === email);
//     return !user;
//   },

//   // --- PRODUCT MUTATIONS (Admin only) ---

//   createProduct: async ({ input }, req) => {
//     if (!req.isAuth || req.user.role !== "ADMIN") {
//       throw new Error("Unauthorized: Admins only");
//     }

//     const response = await fetch("https://dummyjson.com/products/add", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(input),
//     });

//     const data = await response.json();
//     console.log("Created product:", data);

//     return data;
//   },

//   updateProduct: async ({ id, input }, req) => {
//     if (!req.isAuth || req.user.role !== "ADMIN") {
//       throw new Error("Unauthorized: Admins only");
//     }

//     const response = await fetch(`https://dummyjson.com/products/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(input),
//     });
//     const data = await response.json();
//     return data;
//   },

//   deleteProduct: async ({ id }, req) => {
//     if (!req.isAuth || req.user.role !== "ADMIN") {
//       throw new Error("Unauthorized: Admins only");
//     }

//     const response = await fetch(`https://dummyjson.com/products/${id}`, {
//       method: "DELETE",
//     });
//     const data = await response.json();
//     console.log("Deleted product:", data);
//     return data;
//   },
// };

// module.exports = {
//   schema,
//   rootValue,
// };
