import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate()

  axios.defaults.withCredentials = true
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/auth/forgot-password", {
      email,
    }).then(res => {
      console.log(res.data)
      if(res.data.status=== 'ok'){
        navigate('/signin')
      }
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <>
    <div className="h-screen bg-slate-300 flex justify-center items-center">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-semibold leading-tight tracking-tight md:text-2xl text-white">
              Forgot Password
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  id="email"
                  className=" border sm:text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-teal-500 focus:border-teal-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center bg-teal-600 hover:bg-teal-700 focus:ring-teal-800"
              >
                Send
              </button>
             
              <div className="flex justify-center items-center">
                <Link to="/signin" className="text-sm text-center font-medium hover:underline text-blue-500">Back to Sign in</Link>
              </div>
              
            </form>
          </div>
        </div>
    </div>
  </>
  )
}