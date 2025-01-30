import React from 'react'
import Chatpage from './Component/Chatpage'
import { Link } from 'react-router-dom'

const Aichatbot = () => {
  return (
    <div className='flex relative'>
      <img className='h-full' src="https://img.freepik.com/premium-photo/chat-bot-set-using-chatting-artificial-intelligence-chat-bot-developed-by-tech-company-digital-chat-bot-robot-application-conversation-assistant-conceptillustration_837518-14108.jpg" alt="" />
      <Chatpage/>
      <Link to='/'>
      <div className='absolute left-5 top-5 bg-gray-500 p-1.5 rounded-[10px] cursor-pointer font-bold text-white'>Return Home</div>
      </Link>
    </div>
  )
}

export default Aichatbot
