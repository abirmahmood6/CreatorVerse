import { Link } from "react-router-dom";
import { InfoIcon, PenIcon } from "lucide-react";

const CreatorCard = ({ creator }) => {
  return (
    <div className="rounded-xl m-6 w-80 bg-slate-100 pb-2">
      <h3 className="font-bold text-center font-mono bg-primary text-white p-2 rounded-t-xl"> {creator.name} </h3>
      <img src={creator.imageURL} alt={creator.name} className="w-60 h-60 object-cover rounded-xl py-2 mx-auto" />
      <p className="text-slate-500 p-2">
        {creator.description.length > 35 ?
          (creator.description.slice(0, 35) + "...") //slice and shows only first 15 characters of description
          : (creator.description)}
      </p>
      <div className="flex justify-center gap-2">
        <Link to={`/view/${creator.id}`} className="btn btn-ghost btn-sm"> <InfoIcon /> </Link>
        <Link to={`/edit/${creator.id}`} className="btn btn-ghost btn-sm"> <PenIcon /> </Link>
      </div>
    </div>
  )
}

export default CreatorCard;
