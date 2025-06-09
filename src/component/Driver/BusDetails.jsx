import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../Firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function BusDetails() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!user) return toast.error("User not logged in");

    const busDetailsRef = collection(db, 'driver', user.uid, 'busdetails');

    await addDoc(busDetailsRef, {
      busDetails: {
        busNumber: data.busNumber,
        source: data.source,
        destination: data.destination,
        contact: data.contact,
        seats: data.seats,
        arrivalTime: data.arrivalTime,
        departureTime: data.departureTime,
        driverName: data.driverName,
        date: data.date,
      },
    });

    toast.success("Bus details saved!");
    navigate("/busview");
  };

  return (
    <section className="font-inter overflow-hidden min-h-screen">
      {/* Background Image */}
     <div className='flex justify-center relative min-h-screen items-center'>
       <img
        src="https://pagedone.io/asset/uploads/1702362010.png"
        alt="background"
        className="w-full h-full object-cover fixed top-0 left-0 -z-10"
      />

      {/* Form Container */}
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg z-10 px-6 sm:p-10 mt-2 ">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Bus Details Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { name: "driverName", label: "Driver Name" },
            { name: "source", label: "Source" },
            { name: "destination", label: "Destination" },
            { name: "date", label: "Date", type: "date" },
            { name: "contact", label: "Driver Contact", type: "number" },
            
          ].map(({ name, label, type = "text" }) => (
            <div key={name}>
              <input
                type={type}
                placeholder={label}
                {...register(name, { required: `${label} is required` })}
                className="w-full h-10 sm:h-12 text-gray-900 placeholder:text-[16px] sm:placeholder:text-xl placeholder:text-gray-400 text-lg leading-7 rounded-full border border-gray-300 shadow-sm focus:outline-none px-4"
              />
              {errors[name] && <p className="text-red-500 text-sm mt-1 ms-2">{errors[name].message}</p>}
            </div>
          ))}

          {/* Departure & Arrival Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "departureTime", label: "Departure Time" },
              { name: "arrivalTime", label: "Arrival Time" },
            ].map(({ name, label }) => (
              <div key={name}>
                <input
                  type="time"
                  placeholder={label}
                  {...register(name, { required: `${label} is required` })}
                  className="w-full h-10 sm:h-12 text-gray-900 placeholder:text-[16px] sm:placeholder:text-xl placeholder:text-gray-400 text-lg leading-7 rounded-full border border-gray-300 shadow-sm focus:outline-none px-4"
                />
                {errors[name] && <p className="text-red-500 text-sm mt-1 ms-2">{errors[name].message}</p>}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "busNumber", label: "Bus Number" },
              { name: "seats", label: "Total Seats" },
            ].map(({ name, label }) => (
              <div key={name}>
                <input
                  type="number"
                  placeholder={label}
                  {...register(name, { required: `${label} is required` })}
                  className="w-full h-10 sm:h-12 text-gray-900 placeholder:text-[16px] sm:placeholder:text-xl placeholder:text-gray-400 text-lg leading-7 rounded-full border border-gray-300 shadow-sm focus:outline-none px-4"
                />
                {errors[name] && <p className="text-red-500 text-sm mt-1 ms-2">{errors[name].message}</p>}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full sm:h-12 h-10 mt-4 text-white text-center text-base font-semibold leading-6 rounded-full bg-purple-600 hover:bg-purple-800 transition-all duration-700 shadow-sm"
          >
            Submit Bus Details
          </button>
        </form>
      </div>
     </div>
    </section>
  );
}

export default BusDetails;
