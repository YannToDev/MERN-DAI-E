
import { useEffect, useState } from "react";
import { Loader, Card, FormField } from "../components";

// Si on a des données on boucles à travers et pour chacun d'elle on passent les données
// au composant Card
const RenderCard = ({ data, title}:any)=> {
    if(data?.length > 0) {
        return data.map((post:any) => <Card key={post.id} {...post}/>) 
    }

    return (
        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
            {title}
        </h2>
    )
};

const Home = () => {

    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);
    const [searchText, setSearchText] = useState('');

  return (
    <section className="max-w-7xl mx-auto">
        <div>
            <h1 className="font-extrabold text-[#222328] text-[32px]">The Community Showcase</h1>
            <p className="mt-2 text-[#666e75] text-[16px] max-x-[500px]">
                Browse throught a collection of imaginative and visually stunning images generated by DALL-E AI
            </p>
        </div>
        <div className="mt-16">
            {/* <FormField /> */}
        </div>

        <div className="mt-10">
        {loading? (
            <div className="flex justify-center items-center">
                <Loader />
            </div>
        ):(
            <>
            {searchText &&(
                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                    Showing results for <span className="text-[#222328]">{searchText}</span>
                </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1">
                {searchText?(
                    <RenderCard
                        data={[]}
                        title="No search results found"
                    />
                )
                :(
                <RenderCard 
                    data={[]}
                    title="No posts found"
                />
                )}
            </div>
            </>
        )}
        </div>

    </section>
  )
}

export default Home;

// Dans la seconde partie du JSX on a un rendu conditionnel, si on a des données en chargement on affiche le loader.
// Si on a fait une recherche alors:
//  - on affiche la recherche effectuée puis on affiche les résultats
//  - si on a pas de recherche faites alors on affiche tous les posts disponibles.