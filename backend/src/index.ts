import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();
const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

app.listen (port, () => {
  console.log(`Server is running on port ${port}`);
});
// const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;
// if (!mongoConnectionString) {
//   throw new Error(
//     "MONGO_CONNECTION_STRING is not defined in the environment variables"
//   );
// }

// mongoose.connect(mongoConnectionString).then(() => {
//   console.log("Database connected");
// });

// Routers
// app.use("/api/auth",);

