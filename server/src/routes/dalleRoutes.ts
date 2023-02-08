// ---- Route coté server qui permet de générer une image grâce à l'IA ----

import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi} from 'openai';

type ImageProps ={
    prompt:string,
    n:number,
    size:string,
    response_format:string,
}

// Pour le typage de la requete/response 
import { Request, Response } from "express";

// Pour s'assurer que les variables d'environnements soient bien remplies;
dotenv.config();

// on importe le route d'express.
const router = express.Router();

// on met en place d'une configuration pour OpenAIApi et on l'instancie.
const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Mise en place de la route de type get pour obtenir une image générer par l'IA
router.route('/').get((req:Request,res:Response) => {
    res.send('hello from DALL-E route')
});

router.route('/').post(async(req:Request,res:Response) => {
    
    try {
        const { prompt } = req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n:1,
            size: '1024x1024',
            response_format : 'b64_json'
        });

        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({ photo: image});

    } catch (error) {
        console.log(error);
        // erreur avec typescript , à régler
        // res.status(500).send(error?.response.data.error.message);
        res.status(500).send(error)
    }
})

// on exporte cette route pour qu'elle soit utilisable dans le fichier principal.
export default router;