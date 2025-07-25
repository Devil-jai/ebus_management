import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth, db } from '../Firebase'
import { doc, setDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function SignupPage() {

  const {
    register ,
    handleSubmit,
    formState : {errors},
  } = useForm()

  const navigate = useNavigate()

  const onSubmit = async (formData) =>{
    const {firstName , lastName , email , password} = formData;
    const role = "user"

    try{
      const userCredential = await createUserWithEmailAndPassword(auth,email, password)
      const user = userCredential.user;

      await setDoc(doc(db,'user', user.uid),{
        firstName,
        lastName,
        email,
        role,
      });
      toast.success("Signup Successfully...")
      navigate('/userLogin')
    }
    catch(error){
      if (error.code === 'auth/email-already-in-use') {
        toast.error("This user already exists. Please login.");
      } else {
        toast.error(error.message);
      }
    }
  }

  return (
    <>
     <section className="flex justify-center relative font-inter  min-h-screen">
      <img
        src="https://images.pexels.com/photos/7135057/pexels-photo-7135057.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="gradient background"
        className="w-full h-full object-cover fixed"
      />
      <div className="mx-auto max-w-lg sm:px-6 px-2 lg:px-8 absolute sm:py-10 py-16 w-full">
        <div className="rounded-2xl bg-white shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="lg:p-11 sm:py-7 py-4 sm:px-7 px-3 mx-auto">
            <div className="sm:mb-11 mb-4">
              <h1 className="text-gray-900 text-center sm:text-3xl text-xl font-bold leading-10">Create User Account</h1>
            </div>

            {/* First Name */}
       <div className='mb-4'>
             <input
              type="text"
              placeholder="First Name"
              {...register('firstName', { required: 'First name is required' })}
              className="w-full sm:h-12 h-10 text-gray-900 placeholder:text-[16px] sm:placeholder:text-xl placeholder:text-gray-400 text-lg leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none sm:px-4 px-3 "
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1 ms-3">{errors.firstName.message}</p>}
       </div>

            {/* Last Name */}
          <div className='mb-4'>
              <input
              type="text"
              placeholder="Last Name"
              {...register('lastName', { required: 'Last name is required' })}
             className="w-full sm:h-12 h-10 text-gray-900 placeholder:text-[16px] sm:placeholder:text-xl placeholder:text-gray-400 text-lg leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none sm:px-4 px-3 "
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1 ms-3">{errors.lastName.message}</p>}
          </div>

            {/* Email */}
            <div className='mb-4'>
              <input
              type="email"
              placeholder="Email Address"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email',
                },
              })}
             className="w-full sm:h-12 h-10 text-gray-900 placeholder:text-[16px] sm:placeholder:text-xl placeholder:text-gray-400 text-lg leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none sm:px-4 px-3 "
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 ms-3">{errors.email.message}</p>}

            </div>
            {/* Password */}
           <div className='mb-4'>
             <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
             className="w-full sm:h-12 h-10 text-gray-900 placeholder:text-[16px] sm:placeholder:text-xl placeholder:text-gray-400 text-lg leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none sm:px-4 px-3 "
            />
            {errors.password && <p className="text-red-500 text-sm mt-1 ms-3">{errors.password.message}</p>}
           </div>

     

            <button
              type="submit"
              className="w-full sm:h-12 h-10 mt-5 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-purple-800 transition-all duration-700 bg-purple-600 shadow-sm sm:mb-11 mb-5"
            >
              Sign up
            </button>

           <div className="flex sm:text-[16px] text-[12px] justify-center text-gray-900 text-base font-medium leading-6">
                Already have an account?
                <Link to='/userLogin' className="text-purple-600 font-semibold pl-2 cursor-pointer">Login</Link>
              </div>
          </form>
        </div>
      </div>
    </section>
    </>
  )
}

export default SignupPage