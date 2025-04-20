
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";


dotenv.config();

const app = express();
const PORT= process.env.PORT || 3000;





app.use(express.json());//express.json() is a built-in middleware function in Express that parses incoming requests with JSON payloads and is based on body-parser.
app.use(helmet());//helmet is a middleware that helps secure Express apps by setting various HTTP headers
app.use(cors());
app.use(morgan());//morgan is a middleware that logs HTTP requests and responses in the console

app.use("/api/products",productRoutes);


async function initDB(){
   try{
      await sql`
         CREATE TABLE IF NOT EXISTS products(
         id SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         image VARCHAR(255) NOT NULL,
         price DECIMAL(10,2) NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         )
      `
   }
   catch(error)
   {
    console.log("Error initDB",error)
   }
}


initDB().then(()=>{
   
 app.listen(PORT, () => {
   console.log('Server is running on port '+ PORT);
   });



})