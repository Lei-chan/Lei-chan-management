"use client";
import LoginSignup from "./Components/LoginSignup";

export default function Home() {
  return (
    <div className="w-full h-full text-center flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl">
        Lei-chan
        <br />
        -Management Page-
      </h1>
      <LoginSignup type="login" />
      <p className="absolute bottom-2.5 text-sm">Designed by Freepik</p>
    </div>
  );
}
