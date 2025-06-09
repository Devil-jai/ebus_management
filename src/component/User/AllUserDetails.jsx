import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect ,useState } from 'react'
import { db } from '../Firebase'
import toast from 'react-hot-toast'

function AllUserDetails() {
  const [userList , setuserList] = useState([])
    const [loading , setLoading] = useState(true)


    useEffect(()=>{
        const fetchusers = async () =>{
            try {
                const userRef = collection(db,'user')
                const snapshot = await getDocs(userRef)
                
                const users = snapshot.docs.map(doc =>({
                    id:doc.id,
                    ...doc.data()
                }))
                setuserList(users)
             
                setLoading(false)
            } catch (error) {
                toast.error("Error fetching users data")
                setLoading(false)
            }
        }
        fetchusers()
    },[])

    if(loading){
        return <div className='loader'></div>
    }
    console.log(userList);
    
  return (
   <div className="pt-40 bg-blue-950 h-screen ">
       <div className='flex justify-center'>
        <div className="relative flex flex-col lg:overflow-x-hidden overflow-x-scroll   text-gray-700 bg-white shadow-md rounded-xl bg-clip-border w-5xl ">
        <table className="w-full text-left table-auto min-w-max ">
          <thead>
            <tr>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Driver First Name
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Driver Last Name
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Email
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  role
                </p>
              </th>
             
            </tr>
          </thead>
          <tbody>
            {
              userList.map((data)=>(
                <tr>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {data?.firstName}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {data?.lastName}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {data?.email}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {data?.role}
                </p>
              </td>
            </tr>
              ))
            }
            
          </tbody>
        </table>
      </div>
       </div>
     </div>
  )
}

export default AllUserDetails