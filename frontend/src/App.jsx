import React from 'react'
import Home from './Pages/Home/Home'
import {Route,Routes} from 'react-router-dom'
import Plan_my_trip from './Pages/Plan_my_trip/Plan_my_trip'
import Aichatbot from './Pages/AI_Chatbot/Aichatbot'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/plan-my-trip' element={<Plan_my_trip/>}/>
        <Route path='/aichatbot' element={<Aichatbot/>}/>
      </Routes>
    </div>
  )
}

export default App
