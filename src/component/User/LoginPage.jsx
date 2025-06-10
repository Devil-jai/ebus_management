import { signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../Firebase'
import { doc, getDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'

function LoginPage() {
  const {register , handleSubmit , formState : {errors}} = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) =>{
    const {email , password} = data;

    try{
      const userCredential = await signInWithEmailAndPassword(auth, email , password)
      const user = userCredential.user;

      const userRef = doc(db,'user',user.uid)
      const userSnap = await getDoc(userRef)

      if(userSnap.exists()){
        const userData = userSnap.data();
        if(userData.role === 'user'){
          toast.success("User Login Successfully...")
          navigate('/busview')
        }
        else{
          throw new ToastBar.error("User is not exist")
        }
      }
    }
    catch(error){
      if (error.code === 'auth/invalid-credential') {
        toast.error("User not found. Please sign up");
      } else {
        toast.error(error.message);
      }
    }
  }

  return (
   <>
   <div className="font-inter overflow-hidden min-h-screen">
      <section className="flex justify-center relative min-h-screen items-center">
        <img
          src="https://images.pexels.com/photos/7135057/pexels-photo-7135057.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="background"
          className="w-full h-full object-cover fixed inset-0"
        />
        <div className="mx-auto max-w-lg px-6  lg:px-8 absolute py-20">
          
          <div className="rounded-2xl bg-white shadow-xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="lg:p-11 p-7 mx-auto sm:w-96"
            >
              <div className="sm:mb-11 mb-5">
                <h1 className="text-gray-900 text-center font-manrope sm:text-3xl text-xl font-bold leading-10">
                  User Login
                </h1>
             
              </div>

        <div className="mb-5">
                <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Username"
                className="w-full sm:h-12 h-10 text-gray-900 placeholder:text-[16px] sm:placeholder:text-xl placeholder:text-gray-400 text-lg leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none sm:px-4 px-3 "
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ms-3">{errors.email.message}</p>
              )}
        </div>

          <div className="mb-4">
                <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
               className="w-full sm:h-12 h-10 text-gray-900 placeholder:text-[16px] sm:placeholder:text-xl placeholder:text-gray-400 text-lg leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none sm:px-4 px-3 "
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 ms-3">{errors.password.message}</p>
              )}
          </div>

            

              <button
                type="submit"
                className="w-full sm:h-12 h-10 mt-2 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-purple-800 transition-all duration-700 bg-purple-600  shadow-sm sm:mb-11 mb-5"
              >
                Login
              </button>

              <div className="flex sm:text-[16px] text-[12px] justify-center text-gray-900 text-base font-medium leading-6">
                Don’t have an account?
                <Link to='/userSignup' className="text-purple-600 font-semibold pl-2 cursor-pointer">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default LoginPage