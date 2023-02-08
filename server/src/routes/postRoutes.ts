// ---- Route qui permet de récupérer tous les postes mais aussi d'en créer un nouveau.

import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// Pour utiliser le model définit pour MongoDB.
import Post from '../mongodb/models/post';

// Pour typer les données.
import { PostType } from '../types/post.type'

// Pour s'assurer que les variables d'environnements soient bien remplies;
dotenv.config();

// Pour le typage de la requete/response 
import { Request, Response } from "express";

// mise en place du router
const router = express.Router();

// Configuration de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// ---- route pour récupérer tous les posts ----
router.route('/').get(async(req:Request, res:Response) => {

    try {
        const posts:PostType[] = await Post.find({});
        res.status(200).send({ success: true, data: posts})

    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
});

// ---- route pour soumettre un nouveau post ----
// 1. on récupère les propriétés passées dans le corps de la requête.
// 2. on utilise l'uploader de cloudinary pour télécharger la photo provenant du Front.
// 3. On créer un nouveau post avec la méthode create() en passant le nom et le prompt récupérer dans le body de la requête.
//    pour la photo, on passe l'url qui nous est fournie par Cloudinary, cest pour cela qu'on l'a dabord stockée avant de créer le post.
router.route('/').post(async(req:Request, res:Response) => {

    try {
        
        const { name, prompt, photo }:PostType = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
    
        const newPost:PostType = await Post.create<PostType>({
            name,
            prompt,
            photo: photoUrl.url,
        });

        res.status(201).json({ success : true, data : newPost });

    } catch (error) {
        res.status(500).json({ success: false, message: error })
    };
});

export default router;