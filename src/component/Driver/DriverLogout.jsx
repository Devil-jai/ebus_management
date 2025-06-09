import { signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../Firebase'
import toast from 'react-hot-toast'

function DriverLogout() {
    const navigate = useNavigate()

    const handleLogout = async () =>{
        try{
            await signOut(auth)
            toast.success("Logout Successfully...")
            navigate("/")
        }
        catch(error){
            toast.error("Failed to Logout")
        }

    }
  return (
   <>
    <button onClick={handleLogout} className='rounded-2xl max-[470px]:text-[12px] text-white bg-purple-600 hover:bg-purple-700 cursor-pointer font-bold px-2 py-1 shadow border-2'>   Logout</button>
   </>
  )
}

export default DriverLogout