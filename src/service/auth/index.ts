/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include", // Cookies sent automatically
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Login failed" };
  }
};
