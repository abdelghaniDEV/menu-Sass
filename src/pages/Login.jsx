import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "../assets/logo-v2.png";
import React, { useEffect, useState } from "react";
import { Eye, LogIn } from "lucide-react";
import axios from "axios";
// import { useToast } from "@/hooks/use-toast"
import loadingImg from "../assets/loading.svg";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const notify = () => toast("Wow so easy!");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [ShowPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handelRedirect = (data) => {
    const { isAcountVerified, isInfoAvailable } = data.user;
  
    if (!isAcountVerified) {
      sendOtpCode()
      return navigate("/verify-email");
    }
  
    if (isInfoAvailable) {
      return navigate("/dashboard");
    }
  
    return navigate("/onboarding");
  };

  // check data after send
  const checkData = () => {
    let isValid = true;

    // check email
    if (data.email === "") {
      setError((prev) => ({
        ...prev,
        email: "Email is required.",
      }));
      isValid = false;
    } else if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      isValid = false;
    } else {
      setError((prev) => ({
        ...prev,
        email: "",
      }));
    }

    // check password
    if (data.password === "") {
      setError((prev) => ({
        ...prev,
        password: "Password is required.",
      }));
      isValid = false;
    } else if (data.password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters long.",
      }));
      isValid = false;
    } else {
      setError({ ...error, password: "" });
    }

    return isValid;
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    checkData();
    if (checkData()) {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      // send data to server
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/login`,
          {
            email: data.email,
            password: data.password,
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        console.log("sucessfully registered", response.data);

        // save token in local storage
        localStorage.setItem("authToken", response.data.token);
        setLoading(false);
        toast.success("sucessfully Logged in");
        handelRedirect(response.data);
      } catch (e) {
        setLoading(false);
        if (e.response) {
          console.error("Error:", e.response.data);
          toast({
            title: e.response.data.message,
            variant: "destructive",
          });
        } else {
          console.error("Network error or server is down");
          toast({
            title: "Network error",
            variant: "destructive",
          });
        }
      }
    }
  };

  // send otp if no verfication
  const sendOtpCode = async () => {
    // Handle sending OTP logic here
   
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/send-verifay-otp`,{},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Successfully sent OTP", response.data);
      // Handle success here
    } catch (e) {
      console.error("Error sending OTP: ", e);
      
      // Handle error here
    }
  }

  return (
    <div className="relative">
      <ToastContainer />
      <div className="flex justify-center container my-[30px]  relative z-[1000]">
        <Card className="py-10 px-4   md:px-16 w-full md:w-[460px] mb-10 relative overflow-hidden">
          <div className="flex justify-center flex-col items-center">
            <img src={logo} className="w-[150px] " alt="logo" />
            <h2 className="text-center text-[30px] font-[700]">
              Log In an Account
            </h2>
          </div>
          <form className="py-[10px] mb-[10px] flex flex-col gap-5 ">
            <div className="flex flex-col gap-2 relative">
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="Entre your Email"
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
                className={error.email && "border-red-500"}
              />
              {error.email && (
                <p className="text-[12px]  leading-[10px] absolute bottom-[-15px] text-red-500">
                  {error.email}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 relative">
              <Label>Password</Label>
              <Input
                type={ShowPassword ? "text" : "password"}
                placeholder="Entre your Password"
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                className={error.password && "border-red-500"}
              />
              <Eye
                className="absolute right-[10px] w-5 h-5 top-[50%] cursor-pointer"
                onClick={() => setShowPassword(!ShowPassword)}
              />
              {error.password && (
                <p className="text-[12px]  leading-[10px] absolute bottom-[-15px] text-red-500">
                  {error.password}
                </p>
              )}
            </div>
            <Button
              className="mt-2 text-[16px]"
              onClick={(e) => handleSubmit(e)}
            >
              {loading ? (
                <img src={loadingImg} width={30} alt="loading" />
              ) : (
                <span>Sign up</span>
              )}
            </Button>
          </form>

          <div className="flex text-[14px] items-center gap-1 justify-center  absolute bottom-2 ">
            <span>Already Have a Account?</span> <LogIn className="w-5 h-5" />{" "}
            <Link className="font-[600]" to={"/register"}>
              Log In
            </Link>
          </div>
          <div className="absolute bg-main-primary md:w-[50px] w-[20px] h-[300px] top-[-100px] rotate-45"></div>
        </Card>
      </div>
      <img
        src={logo}
        className="w-[px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-[0.7] z-[100]  absolute "
        alt="logo"
      />
    </div>
  );
}
