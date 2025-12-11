import { Link } from "react-router-dom"

const CreatorCard = ({creator}) => {
  return (
    <div className="border border-collapse rounded-xl m-6 w-80 bg-slate-100 p-2">
      <h3 className="font-bold font-mono bg-slate-700 text-white p-2"> {creator.name} </h3>
      <img src={creator.imageURL} alt={creator.name} className="w-40 h-40 object-cover rounded-xl py-2 mx-auto"/>
      <p> {creator.description} </p>
      <a 
      href={creator.url} 
      rel="noopener noreferrer" 
      target="_blank"  
      className="text-primary block mt-2"> 
      Visit Creator
      </a>
      
    </div>
  )
}

export default CreatorCard
