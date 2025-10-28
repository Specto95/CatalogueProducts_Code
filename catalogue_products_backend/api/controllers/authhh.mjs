// import { users, activeTokens } from "../users.mjs";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import crypto from "crypto";
// import {
//   validateChangePassword,
//   validateRegister,
// } from "./validations/authValidations.mjs";

// export const auth = {
//   register: async (req, res) => {
//     if (!req.isAuth) {
//       return res.status(401).json({
//         message: "Unauthorized",
//       });
//     }
//     if (req.user.role !== "ADMIN") {
//       return res.status(401).json({
//         message: "Unauthorized, ADMIN ONLY",
//       });
//     }

//     try {
//       const result = validateRegister(req.body);

//       if (!result.success) {
//         return res.status(422).json({
//           message: "Validation failed",
//           errors: result.error.errors,
//         });
//       }

//       const { email, password, role } = result.data;

//       const existingUser = users.find((u) => u.email === email);
//       if (existingUser) {
//         return res.status(409).json({ message: "El usuario ya existe" });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = {
//         id: users.length + 1,
//         email,
//         password: hashedPassword,
//         role: role.toUpperCase() === "ADMIN" ? "ADMIN" : "USER",
//       };
//       users.push(user);

//       return res.status(201).json({
//         message: "Usuario registrado exitosamente",
//         user,
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   },

//   isEmailAvailable: async (req, res) => {
//     console.log(req.isAuth)
//     if (!req.isAuth) {
//       return res.status(401).json({
//         message: "Unauthorized",
//       });
//     }
//     if (req.user.role !== "ADMIN") {
//       return res.status(401).json({
//         message: "Unauthorized, ADMIN ONLY",
//       });
//     }

//     const { email } = req.body;
//     const user = users.find((u) => u.email === email);
//     return res.status(200).json({
//       message: !user,
//     });
//   },

//   login: async (req, res) => {
//     const { email, password } = req.body;
//     const user = users.find((u) => u.email === email);
//     if (!user)
//       res.status(404).json({
//         message: "Usuario no encontrado",
//       });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       res.status(422).json({
//         message: "Contraseña incorrecta",
//       });

//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );
//     activeTokens.add(token);

//     return res.status(200).json({
//       message: "Inicio de sesión exitoso",
//       token,
//       user,
//     });
//   },

//   logout: (req, res) => {
//     if (!req.isAuth)
//       return res.status(401).json({
//         message: "Unauthorized",
//       });
//     const authHeader = req.get("Authorization");
//     const token = authHeader.split(" ")[1];
//     console.log(token);
//     if (activeTokens.has(token)) {
//       activeTokens.delete(token);
//       return res.status(200).json({ message: "Logout successful" });
//     }
//     throw new Error("Token expirado");
//   },

//   forgotPassword: async (req, res) => {
//     const { email } = req.body;
//     const user = users.find((u) => u.email === email);

//     if (!user) res.status(404).text("Usuario no encontrado");

//     const confirmationCode = crypto
//       .randomBytes(3)
//       .toString("hex")
//       .toUpperCase();

//     user.resetCode = confirmationCode;

//     return res.status(201).json({
//       message:
//         "Instrucciones para restablecer la contraseña enviadas al correo",
//       user,
//     });
//   },

//   isValidOldPassword: async (req, res) => {
//     const { email, oldPassword } = req.body;
//     const user = users.find((u) => u.email === email);
//     if (!user) return res.status(404).send("Usuario no encontrado");

//     const isMatch = bcrypt.compareSync(oldPassword, user.password);
//     if (!isMatch) return res.status(401).send("Contraseña antigua incorrecta");

//     return res.status(200).send(true);
//   },

//   changePassword: (req, res) => {
//     const { email, oldPassword, newPassword } = req.body;
//     const user = users.find((u) => u.email === email);
//     if (!user) return res.status(404).send("Usuario no encontrado");

//     const isMatch = bcrypt.compareSync(oldPassword, user.password);
//     if (!isMatch) return res.status(400).send("Contraseña antigua incorrecta");

//     let result;

//     try {
//       result = validateChangePassword(req.body);

//       if (!result.success) {
//         return res.status(422).json({
//           message: JSON.parse(result.error.message),
//           errors: result.error.errors,
//         });
//       }
//     } catch (error) {
//       return res.status(500).json({ message: error.message });
//     }

//     try {
//       const hashedPassword = bcrypt.hashSync(newPassword, 10);
//       user.password = hashedPassword;

//       return res.status(200).json({
//         message: "Contraseña cambiada exitosamente",
//         user,
//       });
//     } catch (error) {
//       return res.status(500).json({ message: error.message });
//     }
//   },

//   resetPassword: (req, res) => {
//     const { email, newPassword } = req.body;
//     const user = users.find((u) => u.email === email);
//     if (!user) return res.status(404).text("Usuario no encontrado");

//     const hashedPassword = bcrypt.hashSync(newPassword, 10);
//     user.password = hashedPassword;

//     return res.status(201).json({
//       message: "Contraseña restablecida exitosamente",
//       user,
//     });
//   },

//   isUserAuthenticated: (req, res) => {
//     //const { token } = req.body;
//     if (req.isAuth) return res.status(200).send(true);

//     return res.status(401).send(false);
//     // console.log('token is:', token)

//     // console.log('active tokens are:', activeTokens)

//     // if (!token) return res.status(404).send(false)
//     // if (!activeTokens.has(token)) return res.status(404).send(false)

//     // try {
//     //   jwt.verify(token, JWT_SECRET);
//     //   return res.status(200).send(true)
//     // } catch {
//     //   return res.status(500).send(false)
//     // }
//   },

//   isRegisteredEmail: (req, res) => {
//     const { email } = req.body;
//     const user = users.find((u) => u.email === email);
//     if (user) {
//       return res.status(200).json({
//         message: true,
//       });
//     }
//     return res.status(404).json({
//       message: false,
//     });
//   },
// };
