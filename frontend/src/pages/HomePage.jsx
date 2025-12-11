import supabase from "../client.js"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar.jsx"
import CreatorCard from "../components/CreatorCard.jsx"
import NoCreator from "../components/NoCreator.jsx"

/*
- TO-DO:
- Use .env to protect sensitive info like supabase API key 
- complete LL !
*/

const HomePage = () => {
  const [creators, setCreators] = useState([])
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select()
        
      if (error) {
        console.log("Unable to fetch from supabase: ", error)
        setFetchError("Unable to fetch data from supabase")
        setCreators([])
      }
      if (data) {
        console.log(data)
        setCreators(data)
        setFetchError(null)
      }
    }
    fetchCreators()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      {fetchError && (<p>{fetchError}</p>)}
      {creators.length > 0 ?
        (
          <div className="creators flex justify-center"> {/* centers the grid items*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {creators.map(creator => (
                <CreatorCard key={creator.id} creator={creator} />
              ))
              }
            </div>
          </div>
        ) :
        (<NoCreator />)
      }
    </div>
  )
}

export default HomePage;
