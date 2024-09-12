import { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Profile from "./components/Profile";
import abi from "./artifacts/contracts/Twitter.sol/Twitter.json";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";

const Login = lazy(() => import("./components/Login"));
const SignUp = lazy(() => import("./components/SignUp"));
const Home = lazy(() => import("./components/Home"));

const App = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
      const contractABI = abi.abi;

      try {
        if (window.ethereum !== null) {
          const account = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setAccount(account?.[0]);
          setState({ provider, signer, contract });
        } else {
          alert("Install Metamask");
        }
      } catch (error) {
        console.error(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <div
    // style={{
    //   display: "flex",
    //   justifyContent: "space-evenly",
    //   alignItems: "center",
    // }}
    >
      <Router>
        {/* <Sidebar state={state} /> */}
        <Routes>
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <div className="text-center">Sign Up page is loading...</div>
                }
              >
                <SignUp state={state} account={account} />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense
                fallback={
                  <div className="text-center">Login page is loading...</div>
                }
              >
                <Login state={state} account={account} />
              </Suspense>
            }
          />
          <Route
            path="/home"
            element={
              <Suspense
                fallback={
                  <div className="text-center">Twitter feed is loading...</div>
                }
              >
                <Home state={state} />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense
                fallback={
                  <div className="text-center">Profile is loadingt...</div>
                }
              >
                <Profile state={state} />
              </Suspense>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
