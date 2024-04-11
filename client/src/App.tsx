
import { Route, Routes } from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import Room from './pages/Room'


function App() {
  

  return (
   <Routes>
     <Route path='/' element={<Landingpage></Landingpage>}></Route>
     <Route path='/room' element={<Room></Room>}></Route>
   </Routes>
  )
}

export default App
