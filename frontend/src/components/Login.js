import { PiUser, PiEyeSlashLight } from "react-icons/pi";
import { SlLock } from "react-icons/sl";

const Login = () => {
  return (
    <div className="App">
      <div className="min-h-screen flex">
        {/* Left Side - Twitter Logo */}
        <div className="flex-1 bg-dodger-blue flex items-center justify-center">
          <div>
            <img src="/twitter_logo.png" alt="Twitter Logo" className="w-24" loading="lazy" />
            <p className="text-white font-bold text-2xl">twitter</p>
          </div>
        </div>
        {/* Right Side - Sign up form */}
        <div className="flex-1 bg-white flex items-center justify-center flex-col w-full">
          <div className="w-full max-w-lg space-y-5 mb-7">
            <h2 className="text-3xl font-semibold text-[#373854] text-start">
              Login
            </h2>

            <div className="text-gray-500 text-left">
              <p>Welcome Back! Please login to</p>
              <p>your account.</p>
            </div>
          </div>
          <div className="w-full max-w-lg space-y-8">
            <form className="w-full max-w-lg space-y-8">
              {/* Username */}
              <div className="text-left">
                <p htmlFor="username" className="block text-[#373854]">
                  Username
                </p>
                <div className="relative mt-2 rounded-md shadow-md ">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm ">
                      <PiUser className="text-dodger-blue" />
                    </span>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value="vini"
                    placeholder="Username"
                    className="block w-full mt-1 py-2.5 pl-9 pr-5 border border-gray-100 rounded-lg text-dodger-blue focus:outline-none focus:bg-blue-50 focus:ring-2 focus:ring-dodger-blue"
                    autoFocus
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

              {/* remember me & forget password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className="h-4 w-4 text-dodger-blue focus:outline-none focus:ring-2 focus:ring-dodger-blue border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-gray-500">
                    Remember Me
                  </label>
                </div>
                <a
                  href=""
                  className="text-dodger-blue font-semibold focus:outline-none focus:ring-2 focus:ring-dodger-blue"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <div className=" space-x-4 w-full grid grid-flow-col justify-stretch">
                <button
                  type="submit"
                  className="bg-dodger-blue font-semibold text-white px-4 py-4 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-dodger-blue"
                >
                  Login
                </button>
              </div>

              {/* Sign up link */}
              <div className="flex items-center justify-center gap-1">
                <p className="text-gray-500">Doesn't have an account yet?</p>
                <a
                  href="/"
                  className="text-dodger-blue font-medium focus:outline-none focus:ring-2 focus:ring-dodger-blue"
                >
                  <u>SIGN UP</u>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
