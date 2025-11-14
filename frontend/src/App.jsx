import './App.css'
import {Route,Routes} from "react-router"
import HomePage from './pages/homePage'
import AddCreator from './pages/addCreator'
import EditCreator from './pages/editCreator'
import ShowCreators from './pages/showCreators'
import ViewCreator from './pages/viewCreator'

const App = () => {
  return (
    <div>  {/* add the theme here*/}
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/show" element={<ShowCreators/>}/>  
      <Route path="/add" element={<AddCreator/>}/>
      <Route path="/edit" element={<EditCreator/>}/>  
      <Route path="/view" element={<ViewCreator/>}/>  
    </Routes>

    </div>
  )
}

export default App
