"use server";
import { verifySession } from "../lib/dal";
import { FormState, NotificationData } from "../lib/definitions";
import { handleError } from "../lib/helper";
import { EINC_BASE_URL, WITHCOOKING_BASE_URL } from "../lib/settings";

export default async function sendNotification(
  formState: FormState,
  notificationData: NotificationData,
) {
  await verifySession();
  try {
    const title = String(notificationData.formData.get("title") || "").trim();
    const body = String(notificationData.formData.get("body") || "").trim();

    if (!title || !body)
      return handleError("other", "Title and body are required");

    const dataForServer = {
      title,
      body,
      url: String(notificationData.formData.get("url") || "").trim() || "/",
    };

    const res = await fetch(
      `${notificationData.type === "einc" ? EINC_BASE_URL : WITHCOOKING_BASE_URL}send-notification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NOTIFICATION_SECRET}`,
        },
        body: JSON.stringify(dataForServer),
      },
    );
    const data = await res.json();

    if (!res.ok) return handleError("other", `Server Error. ${data.error}`);

    return {
      success: {
        message: `${notificationData.type} notification sent successfully`,
      },
    };
  } catch (err: unknown) {
    console.error("Error", err);
    return handleError("other", undefined, undefined, err);
  }
}
