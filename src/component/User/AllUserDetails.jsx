import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import toast from 'react-hot-toast';
import Loader from '../Loader';


function AllUserDetails() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRef = collection(db, 'user');
        const snapshot = await getDocs(userRef);

        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserList(users);
      } catch (error) {
        toast.error('Error fetching users data');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen  text-2xl ">
      <Loader />
    </div>
  )

  return (
    <div className="pt-40 bg-blue-950 min-h-screen">
      <div className="flex justify-center">
        <div className="relative flex flex-col lg:overflow-x-hidden overflow-x-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border w-5xl">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                {['First Name', 'Last Name', 'Email', 'Role'].map((header, i) => (
                  <th
                    key={i}
                    className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
                  >
                    <p className="block font-sans text-sm font-normal leading-none text-blue-gray-900 opacity-70">
                      {header}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userList.map((data, i) => (
                <tr key={data.id || i}>
                  <td className="p-4 border-b">{data?.firstName}</td>
                  <td className="p-4 border-b">{data?.lastName}</td>
                  <td className="p-4 border-b">{data?.email}</td>
                  <td className="p-4 border-b">{data?.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllUserDetails;
