import supabase from "../client.js";
import NoCreators from "../components/NoCreator.jsx";
import LoadingUI from "../components/LoadingUI.jsx"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ViewCreator = () => {
  const [creator, setCreator] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [bg, setBg] = useState([]);
  const { id } = useParams();
  const bgColors = [ //random background colors
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
    <div className="min-h-screen p-8">
      <div className={`container mx-auto max-w-xl p-8 ${bg} rounded-xl`}>
        <Link to={"/"} className="btn btn-ghost text-primary"> <ArrowLeft /> Back </Link>

        {/* for creator: as we assign NULL to creator, in first iteration the value is null which will not be displayed. so we first check if creator exist and then display data */}
        {isLoading ? (<LoadingUI />) : creator ? // is it loading? then show loadingUI. If not, check if creator exist, if yes then show creator info. If creator do not exist, display "No Creator"
          (<div className="card flex flex-col items-center py-4 ">
            <h1 className="bg-slate-700 text-white mb-4 p-2 text-center font-mono rounded-xl w-full">
              {creator.name}
            </h1>
            <img
              src={creator.imageURL}
              alt={creator.name}
              className="object-cover w-80 h-80 mb-4 p-1 rounded-xl"
            />
            <div className="bg-slate-100 border rounded-xl p-2 mb-4 max-h-24 overflow-y-auto">
              <h2 className="font-mono font-bold text-center text-primary"> Description </h2>
              <p className="text-slate-500"> {creator.description} </p>
            </div>
            <a
              type="url"
              href={creator.url}
              target="_blank"
              rel="noopener noreferrer" //stops the new tab from messing with this page
              className="inline-flex text-primary mt-8 gap-2 font-mono tracking-tighter rounded-xl underline underline-offset-4 mb-4">
              <LinkIcon /> Visit Creator
            </a>
            <footer className="mt-auto text-sm font-mono text-slate-500 ">
              Created On {" "}{new Date(creator.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </footer>

          </div>)
          : (<NoCreators />)} {/* if no creators exists in DB, display "No Creator" */}

      </div>
    </div>
  )
}

export default ViewCreator;
