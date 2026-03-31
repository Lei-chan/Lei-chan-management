export type DisplayMessageData = {
  type: "success" | "error" | "pending";
  message: string;
};

export type FormState =
  | {
      error?: { message: string; status: number };
      success?: { message: string };
    }
  | undefined;

export interface MyError extends Error {
  status?: number;
}

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export type Project = "einc" | "withCooking";

export type NotificationData = { type: Project; formData: FormData };
