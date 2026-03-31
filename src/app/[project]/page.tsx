"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Project } from "../lib/definitions";

export default function ProjectDashboard() {
  const { project } = useParams<{ project: Project }>();

  const linkClassName =
    "w-[90%] lg:w-[85%] aspect-square rounded shadow-md shadow-black/20 bg-linear-to-l from-blue-400 to-green-300 hover:from-blue-300 hover:to-green-200  flex flex-col justify-center px-3";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-3 gap-3 md:gap-6 lg:gap-5 2xl:gap-7">
      <h1 className="text-2xl text-green-800">-{project} Dashboard-</h1>
      <div className="w-68 sm:w-[18rem] md:w-76 lg:w-84 xl:w-88 2xl:w-92 flex flex-row gap-4 sm:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 text-lg text-center text-black/80">
        <Link href={`/${project}/send-notification`} className={linkClassName}>
          Send Notification
        </Link>
        <Link href={`/${project}/register-news`} className={linkClassName}>
          Register News
        </Link>
      </div>
    </div>
  );
}
