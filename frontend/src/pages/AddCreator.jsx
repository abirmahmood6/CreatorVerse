import supabase from "../client";
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const AddCreator = () => {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const navigate = useNavigate();

  const handleAddCreator = async (e) => {
    e.preventDefault();
    if (!name || !imageURL || !description || !url) {
      toast.error("Please enter all fields!")
      return;
    };
    const { data, error } = await supabase
      .from("creators")
      .insert([{ name, imageURL, description, url }]) // each object{} is inserting a new row of data, if you give multiple {},{}, that means inserting multiple rows at once
      .select() // you must select() to have your inserted data to be returned as "data"
    console.log({ data, error });

    if (error) {
      console.log("Error adding creator!");
      toast.error("Error adding creator!");
    };
    if (data) {
      console.log("Creator Added: ", data);
      toast.success("Creator Added!");
      navigate("/");
    };
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-8"> {/* Outer-most wrapper centers whole page*/}
      <div className="max-w-xl p-4 w-full bg-slate-50 rounded-xl">
        <Link to="/" className="btn btn-ghost"> <ArrowLeft /> Back </Link>
        <h1 className="font-mono mx-auto w-fit p-2 mb-4 rounded-xl tracking-wide text-xl">Add Creator</h1>
        {/* structure and repeat */}
        <form onSubmit={handleAddCreator} className="border-2 border-slate-500 p-4 rounded-xl">
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 w-full font-mono font-bold mx-auto hover:bg-blue-700 rounded-xl"> Save </button>
        </form>
      </div>
    </div>
  );
};

export default AddCreator;





