// -- Mise en place d'express connection de l'API et de la base de données
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

// immport de la connexion de mongoDB
import connectDB from './mongodb/connect';

// Pour le typage 
import { Request, Response } from "express";

// Import des routes
import postRoutes from './routes/postRoutes';
import dalleRoutes from './routes/dalleRoutes';

dotenv.config();

// On créer un instance d'Express et on met en place deux middleware
// 1. le premier Cors pour autoriser un appel à l'API depuis l'extérieur
// 2. Le second pour avoir les données au bon format JSON et limité à 50mb les données reçues.
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb'}));

// middleware pour que les routes soient disponibles pour l'API
app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

// Mise en place de la route de base.
app.get('/', async(req:Request,res:Response) => {
    res.send('Hello from DALL-E');
});

const  PORT = process.env.port || 8080;

const startServer = async() => {

    try {
        connectDB()
         app.listen(PORT, () => {
        console.log(`Server has started on http://localhost:${PORT}`);
        })

    } catch (error) {
        console.log(error);
    }
}
   

startServer();