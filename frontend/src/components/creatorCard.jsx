import { Link } from "react-router-dom"
import {InfoIcon} from "lucide-react"

const CreatorCard = ({creator}) => {
  return (
    <div className="border border-collapse rounded-xl m-6 w-80 bg-slate-100 p-2">
      <h3 className="font-bold font-mono bg-slate-700 text-white p-2"> {creator.name} </h3>
      <img src={creator.imageURL} alt={creator.name} className="w-40 h-40 object-cover rounded-xl py-2 mx-auto"/>
      <p> 
      {creator.description.length > 15 ?
      (creator.description.slice(0,15) + "...") //slice and shows only first 15 characters of description
      : (creator.description)} 
      </p>
      <Link to={`/view/${creator.id}`} className="flex justify-center"> <InfoIcon/> </Link>
      
    </div>
  )
}

export default CreatorCard
