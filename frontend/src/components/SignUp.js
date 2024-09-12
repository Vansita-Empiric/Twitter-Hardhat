import { PiUser, PiEyeSlashLight, PiNotepadLight } from "react-icons/pi";
import { IoMailOutline } from "react-icons/io5";
import { SlLock } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const SignUp = ({ state, account }) => {
  const { contract } = state;
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerUserFn = async (e) => {
    e.preventDefault();
    try {
      if(password !== confirmPassword) {
        alert("Password does not match");
      }
      
      console.log("data---------",name,desc,email,password);      
      // console.log("contract--------",contract);
      

      const register = await contract.registerUser(name, desc, email, password); 
      // await register.wait();

      // console.log("Register ------------", register);
      
      toast.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.reason);
    }
  };
  return (
    <div className="App">
      <div className="min-h-screen flex">
        {/* Left Side - Twitter Logo */}
        <div className="flex-1 bg-dodger-blue">
          <small className="text-[#373854]">Connected Account - {account}</small>
          <div className="mt-80 flex items-center justify-center">
            <div>
              <img
                src="/twitter_logo.png"
                alt="Twitter Logo"
                className="w-24"
                loading="lazy"
              />
              <p className="text-white font-bold text-2xl">twitter</p>
            </div>
          </div>
        </div>

        {/* Right Side - Sign up form */}
        <div className="flex-1 bg-white flex items-center justify-center flex-col w-full">
          <div className="w-full max-w-xl space-y-5 mb-7">
            <h2 className="text-3xl font-semibold text-[#373854] text-start">
              Sign up
            </h2>

            <div className="text-gray-500 text-left">
              <p>Create a new account by filling in</p>
              <p>info below.</p>
            </div>
          </div>
          <div className="w-full max-w-xl space-y-8">
            <form className="w-full max-w-xl space-y-8" onSubmit={registerUserFn}>
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-300">
                  <img
                    src="Profile Picture.jpg"
                    alt="Profile"
                    className="rounded-full h-16 w-16"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="block text-gray-700">Profile Picture</p>
                  <button className="text-dodger-blue text-left focus:outline-none focus:ring-2 focus:ring-dodger-blue">
                    Update
                  </button>
                </div>
              </div>

              {/* Username */}
              <div className="text-left">
                <p htmlFor="username" className="block text-[#373854]">
                  Username
                </p>
                <div className="relative mt-2 rounded-md shadow-md">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">
                      <PiUser />
                    </span>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                    placeholder="Username"
                    className="block w-full mt-1 py-2.5 pl-9 pr-5 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-dodger-blue"
                  />
                </div>
              </div>

              {/* User Description */}
              <div className="text-left">
                <p htmlFor="userdesc" className="block text-[#373854]">
                  User description
                </p>
                <div className="relative mt-2 rounded-md shadow-md">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">
                      <PiNotepadLight />
                    </span>
                  </div>
                  <input
                    id="userdesc"
                    name="userdesc"
                    type="text"
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                    required
                    placeholder="User description"
                    className="block w-full mt-1 py-2.5 pl-9 pr-5 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-dodger-blue"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="text-left">
                <p htmlFor="email" className="block text-[#373854]">
                  Email
                </p>
                <div className="relative mt-2 rounded-md shadow-md">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">
                      <IoMailOutline />
                    </span>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    placeholder="Email"
                    className="block w-full mt-1 py-2.5 pl-9 pr-5 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-dodger-blue"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="text-left">
                <p htmlFor="password" className="block text-[#373854]">
                  Password
                </p>
                <div className="relative mt-2 rounded-md shadow-md">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">
                      <SlLock />
                    </span>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                    placeholder="Password"
                    className="block w-full mt-1 py-2.5 pl-9 pr-10 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-dodger-blue"
                  />
                  <div className="absolute inset-y-0 right-5 flex items-center">
                    <span className="text-gray-500 sm:text-lg">
                      <button className="focus:outline-none focus:ring-2 focus:ring-dodger-blue">
                        <PiEyeSlashLight />
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              {/* confirmPassword */}
              <div className="text-left">
                <p htmlFor="confirmPassword" className="block text-[#373854]">
                  Confirm Password
                </p>
                <div className="relative mt-2 rounded-md shadow-md">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">
                      <SlLock />
                    </span>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      
                    }}
                    required
                    placeholder="Confirm Password"
                    className="block w-full mt-1 py-2.5 pl-9 pr-10 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-dodger-blue"
                  />
                  <div className="absolute inset-y-0 right-5 flex items-center">
                    <span className="text-gray-500 sm:text-lg">
                      <button className="focus:outline-none focus:ring-2 focus:ring-dodger-blue">
                        <PiEyeSlashLight />
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-x-4 w-full grid grid-flow-col justify-stretch">
                <button
                  type="submit"
                  className="bg-dodger-blue text-white px-4 py-4 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-dodger-blue"
                >
                  Sign up
                </button>
                <button
                  type="button"
                  className="px-4 py-4 rounded-lg border bg-gray-300 border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
