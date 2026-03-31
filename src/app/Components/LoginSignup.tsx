import { useActionState, useState } from "react";
import { login, signup } from "../actions/user";
import { FormState } from "../lib/definitions";
import PMessage from "./PMessage";

export default function LoginSignup({ type }: { type: "login" | "signup" }) {
  const inputWrapperClassname = "relative w-[60%] flex flex-row items-center";
  const inputClassname = "px-2";

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [state, action, isPending] = useActionState<FormState, FormData>(
    type === "login" ? login : signup,
    undefined,
  );

  function handleTogglePassword() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <>
      {isPending && (
        <PMessage
          type="pending"
          message={type === "login" ? "Loging in..." : "Addin manager..."}
        />
      )}
      {state?.error && <PMessage type="error" message={state.error.message} />}
      {state?.success && (
        <PMessage type="success" message={state.success.message} />
      )}
      <form
        action={action}
        className="w-[18rem] lg:w-[20rem] h-fit shadow-lg shadow-black/20 rounded-lg py-3 lg:py-4 flex flex-col gap-4  items-center bg-orange-300"
      >
        <h3 className="text-lg">
          {type === "login" ? "Login" : "Add Manager"}
        </h3>
        <input
          name="username"
          type="text"
          placeholder="Username"
          className={`${inputWrapperClassname} ${inputClassname}`}
        ></input>
        <div className={inputWrapperClassname}>
          <input
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className={`${inputClassname} w-full`}
          ></input>
          <button
            type="button"
            className={`absolute w-5.5 aspect-square bg-contain bg-center bg-no-repeat right-1 ${isPasswordVisible ? 'bg-[url("/eye-off.svg")]' : 'bg-[url("/eye.svg")]'}`}
            onClick={handleTogglePassword}
          ></button>
        </div>
        <button
          type="submit"
          className="w-fit bg-orange-500 px-1 rounded text-white transition-all duration-150 hover:bg-amber-500"
        >
          OK
        </button>
      </form>
    </>
  );
}
