import React, { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

export const useFormSubmit = (isSignUp: boolean) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const authProcess = async (url: string, formData: any) => {
    const res = await axios.post(url, formData, {
      headers: { "Content-Type": "application/json" },
    });
    await signIn("credentials", {
      redirect: false,
      email: formData.email as string,
      password: formData.password as string,
      callbackUrl: `${window.location.origin}/login`,
    });

    if (res.status === 200) {
      setSuccess(`${isSignUp ? "Registration" : "Login"} successful! Redirecting...`);
    } else {
      setError(res.data.error || `${isSignUp ? "Registration" : "Login"} failed.`);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
      firstname: isSignUp ? data.get("firstName") : undefined,
      lastname: isSignUp ? data.get("lastName") : undefined,
    };

    try {
      if (isSignUp) {
        await authProcess("/api/register", formData);
      } else {
        await authProcess("/api/login", formData);
      }
    } catch (error) {
      if ((error as any).response)
        setError(
          (error as any).response?.data?.error ||
            "Something went wrong, please try again."
        );
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error, success };
};

