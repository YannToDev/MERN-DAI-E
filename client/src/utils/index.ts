import { surpriseMePrompts } from "../constants";

//  on génére un index aléatoire compris entre 0 et 49(la taille du tableau) puis on recupère l'élément du tableau
// correspondant. On vérifie que l'élément récupéré n'est pas égale au précédent. Si c'est le cas on génère un nouvel élément.
// cela évite d'avoir plusieurs fois de suite le même élément.
export function getRandomPrompt(prompt:string):string {

    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    if(randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt;
};