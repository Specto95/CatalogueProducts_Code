// import jwt from "jsonwebtoken";
// import { users } from "../users.mjs";
// import {
//   validateDeleteProductSchema,
//   validatePartialProductSchema,
//   validateProductSchema,
// } from "./validations/productValidations.mjs";

// export const product = {
//   getProfile: (req, res) => {
//     try {
//       const { token } = req.body;
//       const decoded = jwt.verify(token, JWT_SECRET);
//       const user = users.find((u) => u.id === decoded.id);
//       if (!user)
//         res.status(404).json({
//           message: "Usuario no encontrado",
//         });
//       return res.status(200).json({
//         user,
//       });
//     } catch {
//       return res.status(401).json({
//         message: "Unauthorized",
//       });
//     }
//   },

//   getAllUsers: (req, res) => {
//     try {
//       const { token } = req.body;
//       const decoded = jwt.verify(token, JWT_SECRET);
//       if (decoded.role !== "ADMIN")
//         throw new Error("Acceso denegado: Solo administradores");
//       return res.status(200).json({
//         data: users.map(({ password, ...rest }) => rest),
//       });
//     } catch {
//       return res.status(401).json({
//         message: "Unauthorized",
//       });
//     }
//   },

//   // // -------------- Product operations ----------------
//   // listProducts: async (req, res) => {
//   //   if (!req.isAuth)
//   //     return res.status(401).json({
//   //       message: "Unauthorized",
//   //     });
//   //   const response = await fetch("https://dummyjson.com/products");
//   //   const data = await response.json();
//   //   return res.status(200).json({
//   //     data,
//   //   });
//   // },

//   // // --- PRODUCT MUTATIONS (Admin only) ---

//   // createProduct: async (req, res) => {
//   //   console.log('EL BODY ES:', req.body)
//   //   let result;
//   //   try {
//   //     result = validateProductSchema(req.body);

//   //     if (!result.success) {
//   //       return res.status(422).json({
//   //         message: JSON.parse(result.error.message),
//   //         errors: result.error.errors,
//   //       });
//   //     }
//   //   } catch (error) {
//   //     return res.status(500).json({
//   //       message: error.message,
//   //     });
//   //   }

//   //   const input = result.data;
//   //   if (!req.isAuth) {
//   //     return res.status(401).json({
//   //       message: "Unauthorized",
//   //     });
//   //   }
//   //   if(req.user.role !== "ADMIN"){
//   //     return res.status(401).json({
//   //       message: "Unauthorized, ADMIN ONLY",
//   //     });
//   //   }

//   //   try {
//   //     const response = await fetch("https://dummyjson.com/products/add", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(input),
//   //     });

//   //     const data = await response.json();
//   //     console.log("Created product:", data);

//   //     return res.status(201).json({
//   //       data,
//   //     });
//   //   } catch (error) {
//   //     return res.status(400).json({
//   //       message: error.message,
//   //     });
//   //   }
//   // },

//   // updateProduct: async (req, res) => {
//   //   let result;
//   //   try {
//   //     result = validatePartialProductSchema(req.body);

//   //     if (!result.success) {
//   //       return res.status(422).json({
//   //         message: JSON.parse(result.error.message),
//   //         errors: result.error.errors,
//   //       });
//   //     }
//   //   } catch (error) {
//   //     return res.status(500).json({
//   //       message: error.message,
//   //     });
//   //   }

//   //   const input = result.data;
//   //   const { id } = req.params;

//   //   if (!req.isAuth || req.user.role !== "ADMIN") {
//   //     return res.status(401).json({
//   //       message: "Unauthorized: Admins only",
//   //     });
//   //   }

//   //   try {
//   //     const response = await fetch(`https://dummyjson.com/products/${id}`, {
//   //       method: "PUT",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(input),
//   //     });
//   //     const data = await response.json();
//   //     return res.status(201).json({
//   //       data,
//   //     });
//   //   } catch (error) {
//   //     return res.status(400).json({
//   //       message: error.message,
//   //     });
//   //   }
//   // },

//   // deleteProduct: async (req, res) => {
//   //   const { id } = req.params;
  
//   //   let result;
//   //   try {
//   //     result = validateDeleteProductSchema({ id });
  
//   //     if (!result.success) {
//   //       return res.status(422).json({
//   //         message: JSON.parse(result.error.message),
//   //         errors: result.error.errors,
//   //       });
//   //     }
//   //   } catch (error) {
//   //     return res.status(500).json({ message: error.message });
//   //   }
  
//   //   if (!req.isAuth || req.user.role !== "ADMIN") {
//   //     return res.status(401).json({
//   //       message: "Unauthorized: Admins only",
//   //     });
//   //   }
  
//   //   try {
//   //     const response = await fetch(`https://dummyjson.com/products/${id}`, {
//   //       method: "DELETE",
//   //     });
//   //     const data = await response.json();
//   //     return res.status(200).json({ data });
//   //   } catch (error) {
//   //     return res.status(400).json({ message: error.message });
//   //   }
//   // }
  
// };
