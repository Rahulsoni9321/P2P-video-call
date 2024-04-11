import React, { useEffect } from 'react'
import { useSocketContext } from '../Context/Socketcontext'
import RoomArea from '../Components/RoomArea';
import Appbar from '../Components/Appbar';

const Room = () => {
    const {socket} = useSocketContext();
   
  return (
    <div className='w-full relative h-screen'>
        <Appbar></Appbar>
      <RoomArea></RoomArea>
    </div>
  )
}

export default Room
