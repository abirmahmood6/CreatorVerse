import supabase from "../client";
import toast from "react-hot-toast";
import LoadingUI from "../components/LoadingUI";
import { Link, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Trash2Icon } from "lucide-react";

const EditCreator = () => {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("creators")
        .select() //gives all rows from the creators table
        .eq("id", id) // this is a `filter condition`. Find the row where id column equals the id from the URL.
        .single() // by default, supabase returns an array[] even if we expect just one row. With single(), its returns the row as a object{}
      if (error) {
        console.log("Error fetching creator: ", error)
        toast.error("Error fetching creator")
        setLoading(false)
      };
      if (data) {
        setName(data.name)
        setImageURL(data.imageURL)
        setDescription(data.description)
        setURL(data.url)
        console.log("creator: ", data)
        setLoading(false)
      };
    };
    fetchCreator();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure to delete the creator?")) {
      return;
    };
    const { data, error } = await supabase
      .from("creators")
      .delete()
      .eq("id", id)
      .select()
    if (error) {
      console.log("Error deleting creator: ", error)
      toast.error("Error deleting creator")
    };
    if (data) {
      console.log("Created deleted successfully: ", data)
      toast.success("Creator Deleted Successfully")
      navigate("/")
    };
  };

  const handleEditCreator = async (e) => {
    e.preventDefault(); //prevents form submit from refreshing the page (needed for onSubmit only)
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
    <div className="min-h-screen p-8 flex flex-col items-center"> {/* Outer-most wrapper centers whole page*/}
      {!isLoading ?
        (<div className="max-w-xl p-4 w-full bg-slate-50 rounded-xl ">
          <div className="flex items-center justify-between">
            <Link to="/" className="btn btn-ghost"> <ArrowLeft /> Back </Link>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2  hover:bg-red-700 rounded-xl"> <Trash2Icon /> </button>
          </div>
          <h1 className="font-mono mx-auto w-fit p-2 mb-4 rounded-xl tracking-wide text-xl">Edit Creator</h1>
          <form onSubmit={handleEditCreator} className="border-2 border-slate-500 p-4 rounded-xl">
            {/* structure and repeat */}
            <div className="form-control mb-4 flex justify-between ">
              <label className="label mr-2">
                <span className="label-text font-mono font-bold ">Name:</span>
              </label>
              <input
                type="text"
                value={name}
                placeholder="Creator name (e.g., Marques Brownlee)"
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
                placeholder="Image URL (e.g., https://example.com/creator.jpg)"
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
                placeholder="Channel or profile link (e.g., https://youtube.com/@mkbhd)"
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
                placeholder="Brief description of the creator and their content..."
                className="textarea border border-slate-300 p-2"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 w-full font-mono font-bold mx-auto hover:bg-blue-700 rounded-xl"> Update </button>
            </div>

          </form>
        </div>)
        : (<LoadingUI />)}
    </div>
  );
};


export default EditCreator;
