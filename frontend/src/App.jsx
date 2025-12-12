import './App.css'
import AddCreator from './pages/addCreator'
import EditCreator from './pages/editCreator'
import ShowCreators from './pages/showCreators'
import ViewCreator from './pages/viewCreator'
import {Route,Routes} from "react-router"

const App = () => {
  return (
    <div>  {/* add the theme here*/}
    <Routes>
      <Route path="/" element={<ShowCreators/>}/>
      <Route path="/add" element={<AddCreator/>}/>
      <Route path="/edit/:id" element={<EditCreator/>}/>  
      <Route path="/view/:id" element={<ViewCreator/>}/>  
    </Routes>

    </div>
  )
}

export default App
