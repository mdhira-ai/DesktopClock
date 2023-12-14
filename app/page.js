'use client'

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";




const page = () => {

  const [mytime, setmytime] = useState(null)

  useEffect(() => {
    setInterval(() => {
      setmytime(new Date().toLocaleTimeString())


    }, 1000);

    return () => {

      clearInterval(setmytime)
    }
  }, [])


  function appQuit() {
    window.electronAPI.send('closebtn', 'close') 
  }




  return (
    <div id="mytitle" className='text-white flex flex-col justify-center items-center'>

   
      <button
        id="mybtn"
        onClick={appQuit}
        className='hover:bg-red-500  rounded p-1 fixed right-0 top-0'
      >
        <IoClose
          size={16}
        />

      </button>




      <div
        className='flex mt-8 flex-col justify-center items-center'
      >

        <label
          className='text-red-500 text-4xl font-bold'
        >
          {mytime}
        </label>

      </div>


    </div>
  );
}

export default page;