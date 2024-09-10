import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Profile from "./components/Profile";

const Login = lazy(() => import("./components/Login"));
const SignUp = lazy(() => import("./components/SignUp"));
const Home = lazy(() => import("./components/Home"));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div className="text-center">Sign Up page is loading...</div>}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div className="text-center">Login page is loading...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/home"
          element={
            <Suspense fallback={<div className="text-center">Twitter feed is loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route 
          path="/profile"
          element={
            <Suspense fallback={<div className="text-center">Profile is loadingt...</div>}>
              <Profile />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
