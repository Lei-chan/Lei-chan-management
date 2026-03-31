"use client";
import Image from "next/image";
import PMessage from "../../Components/PMessage";
import { useParams } from "next/navigation";
import { startTransition, useActionState } from "react";
import sendNotification from "@/app/actions/sendNotification";
import { FormState, NotificationData, Project } from "@/app/lib/definitions";

export default function SendNotification() {
  const { project } = useParams<{ project: Project }>();

  const labelClassName =
    "w-full flex flex-row items-start justify-center gap-2.5 md:w-[90%] xl:w-[80%] 2xl:w-[75%]";
  const inputTextaresClassName = "px-[5px] trackng-tight w-[70%]";

  const [state, action, isPending] = useActionState<
    FormState,
    NotificationData
  >(sendNotification, undefined);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!project) return;

    startTransition(() =>
      action({ type: project, formData: new FormData(e.currentTarget) }),
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      {isPending && (
        <PMessage type="pending" message="Sending notification..." />
      )}
      {state?.error && <PMessage type="error" message={state.error.message} />}
      {state?.success && (
        <PMessage type="success" message={state.success.message} />
      )}
      <form
        onSubmit={handleSubmit}
        className="relative bg-amber-200 w-[18rem] sm:w-[20rem] h-fit pt-5 py-4 flex flex-col  items-center rounded shadow-lg shadow-black/20 overflow-hidden sm:mt-1.75 gap-3 lg:gap-3.5 xl:gap-4 md:w-88 md:gap-3 lg:w-104 xl:w-120  xl:py-6.25 xl:px-2.5 2xl:w-136"
      >
        <div className="absolute w-full h-full top-0 flex-col justify-center items-center bg-black/20 hidden">
          <Image
            src="/loading.png"
            alt="loading icon"
            width={30}
            height={30}
            className="aspect-square animate-spin duration-1000"
          />
        </div>
        <h3 className="text-lg xl:text-xl">Create Push Notification</h3>
        <label className={labelClassName}>
          Title:
          <input
            name="title"
            placeholder="title"
            className={inputTextaresClassName}
          />
        </label>
        <label className={labelClassName}>
          Body:
          <textarea
            name="body"
            placeholder="body"
            className={inputTextaresClassName}
          ></textarea>
        </label>
        <label className={labelClassName}>
          URL:
          <input
            name="url"
            placeholder="URL"
            className={inputTextaresClassName}
          />
        </label>
        <button
          type="submit"
          className="text-sm bg-orange-500 hover:bg-amber-400 border-none text-white py-0.5 px-1 duration-300 transition-all mt-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
