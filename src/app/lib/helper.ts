import { MyError } from "./definitions";
import * as z from "zod";

const isMyError = (err: unknown): err is MyError => err instanceof Error;

export const handleError = (
  type: "notFound" | "fetchFailed" | "unauthorized" | "zodError" | "other",
  customMsg?: string,
  zodError?: z.ZodError,
  err?: unknown,
) => {
  if (type === "notFound")
    return {
      error: {
        message: customMsg || "User not found",
        status: 404,
      },
    };

  if (type === "fetchFailed")
    return {
      error: {
        message: customMsg || "Fetch failed",
        status: isMyError(err) ? err.status || 500 : 500,
      },
    };

  if (type === "unauthorized")
    return {
      error: {
        message: customMsg || "Unauthorized",
        status: 403,
      },
    };

  if (type === "zodError" && zodError)
    return {
      error: { message: z.prettifyError(zodError), status: 400 },
    };

  if (!isMyError(err))
    return { error: { message: customMsg || "Unexpected Error", status: 500 } };

  return {
    error: { message: customMsg || `Error, ${err.message}`, status: 500 },
  };
};
