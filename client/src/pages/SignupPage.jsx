import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { useState } from "react";
import axios from 'axios';

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/auth/signup', {
      name,
      email,
      password
    }).then(res => {
      console.log(res)
      if(res.data.status === "ok"){
        navigate('/signin')
      }
    }).catch( err => {
      console.log(err)
    })
  };

  return (
    <>
      <div className="h-screen flex">
        <div className="w-1/2 h-full bg-teal-600 flex justify-center items-center">
          <div className="flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              <img src={logo} alt="logo" className="w[100px] h[100px] py-5" />
            </div>
            <h1 className="text-3xl text-white font-bold">Imago Verse</h1>
          </div>
        </div>

        <div className="w-1/2 h-full bg-slate-300 flex justify-center items-center">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-semibold leading-tight tracking-tight md:text-2xl text-white">
                Create a new account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    id="name"
                    className=" border sm:text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Jhon Doe"
                    required=""
                  />
                </div>
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
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className=" border sm:text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-teal-500 focus:border-teal-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <p className="text-sm font-light text-gray-400">
                      Already have an account ? &nbsp;
                      <Link
                        to="/signin"
                        className="font-medium hover:underline text-teal-500"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center bg-teal-600 hover:bg-teal-700 focus:ring-teal-800"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
