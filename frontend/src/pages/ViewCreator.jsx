import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../client.js";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import NoCreators from "../components/NoCreator.jsx";
import LoadingUI from "../components/LoadingUI.jsx"

const ViewCreator = () => {
  const [creator, setCreator] = useState(null);
  const [isLoading, setLoading] = useState(false)
  const [bg, setBg] = useState([]);
  const { id } = useParams();
  const bgColors = [
    "bg-red-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-purple-200",
    "bg-yellow-200",
    "bg-pink-200",
  ];

  useEffect(() => {
    setLoading(true)
    const getCreator = async () => {
      const randomIndex = Math.floor(Math.random() * bgColors.length); //// get a random valid index from the bgColors array
      setBg(bgColors[randomIndex]);

      const { data, error } = await supabase
        .from("creators")
        .select()
        .eq("id", id) //find the row where id column equals the id from the URL.
        .single() // one row only, not an array

      if (error) {
        console.log("Error fetching Creator with id: ", error)
        setLoading(false)
      };
      if (data) {
        console.log(data)
        setCreator(data)
        setLoading(false)
      };
    };
    getCreator();
  }, [id]); // if you have a dependency e.g ID, you must put it in the dependency array[]. When you leave the dependency array EMPTY, React runs the effect before id is available → the query runs with "id = undefined"
  // !! Whats a dependency? Anything inside useEffect that comes from outside the effect must go in the dependency array.

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className={`container mx-auto max-w-2xl p-8 ${bg} rounded-xl`}>
        <Link to={"/"} className="flex justify-self-start btn btn-ghost"> <ArrowLeft /> Back </Link>

        {/* for creator: as we assign NULL to creator, in first iteration the value is null which will not be displayed. so we first check if creator exist and then display data */}
        {isLoading ? (<LoadingUI />) : creator ? // is it loading? then show loadingUI. If not, check if creator exist, if yes then show creator info. If creator do not exist, display "No Creator"
          (<div className="card flex flex-col items-center py-4">
            <h1 className="bg-slate-700 text-white mb-4 p-2 font-mono rounded-xl w-full">
              {creator.name}
            </h1>
            <img
              src={creator.imageURL}
              alt={creator.name}
              className="object-cover w-80 h-80 mb-4 p-1  bg-slate-100 rounded-xl"
            />
            <div className="bg-slate-100 border rounded-xl p-2 mb-4 max-h-24 overflow-y-auto">
              <h2 className="font-mono font-bold"> Description </h2>
              <p className=""> {creator.description} </p>
            </div>
            <a
              href={creator.url}
              target="_blank"
              rel="noopener noreferrer" //stops the new tab from messing with this page
              className="text-primary flex mt-8 p-4 bg-violet-300 font-mono font-bold rounded-xl hover:bg-violet-400">
              Visit Creator
            </a>
          </div>)
          : (<NoCreators />)} {/* if no creators exists in DB, display "No Creator" */}
      </div>
    </div>
  )
}

export default ViewCreator;
