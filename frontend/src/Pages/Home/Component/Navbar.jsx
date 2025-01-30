import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [visible,setVisible] = useState(false)
  return (
    <nav className='flex justify-between p-[20px] bg-red-400 relative h-[70px] max-w-[100vw] text-white'>

      <div className="text-red-600  font-bold text-2xl">Travel<span className='text-white'>Plan</span></div>

      <div className="flex justify-between gap-11 text-white font-bold">
        <div className="cursor-pointer hover:underline">Home</div>

        <Link to="/plan-my-trip"><div className="cursor-pointer hover:underline">Plan my Trip</div></Link>
        <Link to="/aichatbot"><div className="cursor-pointer hover:underline">AI Helper</div></Link>
        <div className="cursor-pointer hover:underline" onClick={()=>{setVisible(!visible)}}>More</div>
      </div>

      {
        visible && 
        <div className={`absolute w-[200px] h-[calc(100vh-70px)] bg-black top-[70px] right-0 opacity-60 transition-transform duration-300 ease-in-out  ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
          <ul className='p-[20px]'>
            <li className='py-1.5 cursor-pointer hover:underline'>About</li>
            <li className='py-1.5 cursor-pointer hover:underline'>Reward Program</li>
            <li className='py-1.5 cursor-pointer hover:underline'>Help and Support</li>
          </ul>
        </div>
      }
    </nav>
  )
}

export default Navbar
