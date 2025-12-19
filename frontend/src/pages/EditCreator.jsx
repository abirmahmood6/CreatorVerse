import supabase from "../client";
import toast from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const EditCreator = () => {
  // CLEANUP and push
  // add edit button on homepage
  // fetch the single creator data from the url id. (useEffect)
  // handleEdit() to update the fields and submit btn to save the update

  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCreator = async () => {

      const { data, error } = await supabase
        .from("creators")
        .select() //gives all rows from the creators table
        .eq("id", id) // this is a `filter condition`. Find the row where id column equals the id from the URL.
        .single() // by default, supabase returns an array[] even if we expect just one row. With single(), its returns the row as a object{}

      if (error) {
        console.log("Error fetching creator: ", error)
        toast.error("Error fetching creator")
      }
      if (data) {
        setName(data.name)
        setImageURL(data.imageURL)
        setDescription(data.description)
        setURL(data.url)
        console.log("creator: ", data)
      }
    }
    fetchCreator();

  }, [id])


  const handleEditCreator = async (e) => {
    e.preventDefault();
    if (!name || !imageURL || !description || !url) {
      toast.error("Please enter all fields!")
      return;
    };
    const { data, error } = await supabase
      .from("creators")
      .update([{ name, imageURL, description, url }]) // update() to update the data fields, and insert() to add the data fields
      .eq("id", id)
      .select() // you must select() to have your inserted data to be returned as "data"
      .single() // by default, supabase returns an array[] even if we expect change in just one row. With single(), its returns the row as a object{}
    console.log({ data, error });

    if (error) {
      console.log("Error updating creator!");
      toast.error("Error updating creator!");
    };
    if (data) {
      console.log("Creator Updated: ", data);
      toast.success("Creator Updated!");
      navigate("/");
    };
  }

  return (
    <div className="p-8 flex flex-col items-center"> {/* Outer-most wrapper centers whole page*/}
      <div className="max-w-2xl p-4">
        <Link to="/" className="btn btn-ghost"> <ArrowLeft /> Back </Link>
        <h1 className="font-mono mx-auto w-fit p-2 mb-4 rounded-xl tracking-wide text-xl">Edit Creator</h1>
        <form onSubmit={handleEditCreator} className="border-2 border-sky-500 p-4 rounded-xl">
        {/* structure and repeat */}
          <div className="form-control mb-4 flex justify-between ">
            <label className="label mr-2">
              <span className="label-text font-mono font-bold ">Name:</span>
            </label>
            <input
              type="text"
              value={name}
              placeholder="Enter Name:"
              className="border border-slate-300 mb-4 p-2"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control mb-4 flex justify-between">
            <label className="label mr-2">
              <span className="label-text font-mono font-bold">Image URL:</span>
            </label>
            <input
              type="text"
              value={imageURL}
              placeholder="Enter Image URL:"
              className="border border-slate-300 mb-4 p-2"
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>
          <div className="form-control mb-4 flex justify-between">
            <label className="label mr-2">
              <span className="label-text font-mono font-bold">Social URL:</span>
            </label>
            <input
              type="text"
              value={url}
              placeholder="https://youtube.com/@channelname"
              className="border border-slate-300 mb-4 p-2"
              onChange={(e) => setURL(e.target.value)}
            />
          </div>
          <div className="form-control mb-4 ">
            <label className="label mr-2">
              <span className="label-text font-mono font-bold">Description:</span>
            </label>
            <textarea
              value={description}
              placeholder="Description here"
              className="textarea border border-slate-300 p-2"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-slate-400 px-4 py-2 mt-2 w-full font-mono font-bold mx-auto hover:bg-slate-500 rounded-xl"> Save </button>
        </form>
      </div>
    </div>
  );
};


export default EditCreator
