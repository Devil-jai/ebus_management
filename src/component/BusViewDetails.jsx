import React, { useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collectionGroup, getDocs } from "firebase/firestore";

function BusViewDetails() {
  const [user] = useAuthState(auth);
  const [busList, setBusList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllBusDetails = async () => {
      setIsLoading(true); // Start loading
      const busDetailsQuery = collectionGroup(db, "busdetails");
      const snapshot = await getDocs(busDetailsQuery);
      const buses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setBusList(buses);
      setFilteredList(buses); // Show all by default
      setIsLoading(false); // Done loading
    };
    fetchAllBusDetails();
  }, [user]);

  const handleSearch = () => {
    if (!source.trim() && !destination.trim()) {
      setFilteredList(busList); // Show all
    } else {
      const filtered = busList.filter(bus => {
        const matchSource = source.trim() === "" || bus.busDetails.source.toLowerCase().includes(source.toLowerCase());
        const matchDestination = destination.trim() === "" || bus.busDetails.destination.toLowerCase().includes(destination.toLowerCase());
        return matchSource && matchDestination;
      });
      setFilteredList(filtered);
    }
  };

  return (
    <div className="pt-10 bg-blue-950 min-h-screen">
      {/* Search Section */}
      <div className="flex justify-center sm:flex-row flex-col gap-4 mt-20 mb-6 sm:text-[14px] text-[12px] lg:text-[16px] items-center">
       <div className="flex justify-center ">
         <input
          type="text"
          placeholder="Source"
          onChange={(e) => setSource(e.target.value)}
          className="border rounded px-4 py-2 bg-white md:w-60 w-40 max-[470px]:w-33 h-8 sm:h-9 me-5 placeholder:text-black"
        />
        <input
          type="text"
          placeholder="Destination"
          onChange={(e) => setDestination(e.target.value)}
          className="border rounded px-4 py-2 bg-white md:w-60 w-40 h-8 sm:h-9 max-[470px]:w-33 placeholder:text-black"
        />
       </div>
        <button
          onClick={handleSearch}
          className="bg-purple-600 text-white md:px-4 px-3 h-8 rounded hover:bg-purple-700 sm:h-9"
        >
          Search
        </button>
      </div>

      {/* Table Section */}
      <div className="relative flex flex-col overflow-x-auto text-gray-700 bg-white shadow-md rounded-xl bg-clip-border mx-4 sm:text-[14px] text-[12px] lg:text-[16px]">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              {[
                "Driver Name", "Bus Number", "Source", "Destination",
                "Date", "Departure Time", "Arrival Time", "Total Seats", "Driver Contact"
              ].map((header, idx) => (
                <th key={idx} className="p-4 border-b bg-purple-gray-50">
                  <p className="text-sm font-semibold">{header}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="text-center p-4 text-purple-600 font-medium">
                  Loading buses...
                </td>
              </tr>
            ) : filteredList.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-4 text-red-600 font-semibold">
                  No matching buses found.
                </td>
              </tr>
            ) : (
              filteredList.map((data, i) => (
                <tr key={data.id || i}>
                  <td className="p-4 border-b">{data.busDetails.driverName}</td>
                  <td className="p-4 border-b">{data.busDetails.busNumber}</td>
                  <td className="p-4 border-b">{data.busDetails.source}</td>
                  <td className="p-4 border-b">{data.busDetails.destination}</td>
                  <td className="p-4 border-b">{data.busDetails.date}</td>
                  <td className="p-4 border-b">{data.busDetails.departureTime}</td>
                  <td className="p-4 border-b">{data.busDetails.arrivalTime}</td>
                  <td className="p-4 border-b">{data.busDetails.seats}</td>
                  <td className="p-4 border-b">{data.busDetails.contact}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusViewDetails;
