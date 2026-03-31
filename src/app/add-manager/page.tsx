"use client";
import LoginSignup from "../Components/LoginSignup";

export default function Add() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <LoginSignup type="signup" />
    </div>
  );
}
