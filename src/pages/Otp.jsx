import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button"; // Assuming you have a Button component
import axios from "axios";
import { useNavigate } from "react-router";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(otp);
  }, [otp]);

  const handleSubmit = async (e) => {
    // Handle OTP submission logic here
    e.preventDefault()
    if ((otp.length === 4)) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/verify-email`,
          {
            otp,
          },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        console.log("Successfully verified email", response.data);
        navigate('/onboarding')
      } catch (e) {
        console.error("Error submitting OTP: ", e);
        setError(e.response.data.message)
        // Handle error here
      }
    }else {
        setError("OTP is Required")
    }
  };
  const sendOtpCode = async (e) => {
    // Handle sending OTP logic here
    e.preventDefault()
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
      setError(e.response.data.message)
      // Handle error here
    }
  }

  return (
    <div className="flex justify-center items-center h-[400px]">
      <Card className="p-6">
        <div className="text-center flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold">Verify Your Identity</h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to your email. Please enter it below to
            verify your identity.
          </p>
          <div className="relative py-[1px] w-full">
            {error && <p className="text-red-500 text-[15px] absolute top-[-10px] w-full">{error}</p> }
          </div>
          <InputOTP
            maxLength={6}
            className="p-5"
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <Button onClick={handleSubmit} className="w-full mt-4">
            Verify OTP
          </Button>
          <p className="text-sm text-gray-500">
            Didn't receive the code?{" "}
            <button onClick={sendOtpCode} className="text-blue-500 hover:underline">
              Resend Code
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}
