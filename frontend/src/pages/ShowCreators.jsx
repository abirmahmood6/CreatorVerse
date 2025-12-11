import supabase from "../client.js";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import CreatorCard from "../components/CreatorCard.jsx";
import NoCreator from "../components/NoCreator.jsx";
import LoadingUI from "../components/LoadingUI.jsx";

/*
- TO-DO:
- complete viewing a Single Content Creator
- Use .env to protect sensitive info like supabase API key 
- complete LL !
*/

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select()

      if (error) {
        console.log("Unable to fetch from supabase: ", error)
        setFetchError("Unable to fetch data from supabase")
        setCreators([])
        setLoading(false)
      };
      if (data) {
        console.log(data)
        setCreators(data)
        setFetchError(null)
        setLoading(false)
      };
    };
    fetchCreators();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {fetchError && (<p>{fetchError}</p>)}
      {isLoading ? (<LoadingUI/>) : creators ? // is it loading? then show loadingUI. If not, check if creators exist, if yes then show creators info. If creators do not exist, display "No Creator"
        (<div className="creators flex justify-center"> {/* centers the grid items*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {creators.map(creator => (
                <CreatorCard key={creator.id} creator={creator} />
              ))
              }
            </div>
          </div>
        ) : (<NoCreator />)
      }
    </div>
  )
}

export default ShowCreators;
