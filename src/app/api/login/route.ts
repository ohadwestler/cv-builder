import { NextRequest, NextResponse } from "next/server";
import User from "@/model/User";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";

interface ResponseData {
  error?: string;
  msg?: string;
}

const validateEmail = (email: string): boolean => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regEx.test(email);
};

const validateForm = async (
  email: string,
  password: string
) => {
  if (!validateEmail(email)) {
    return { error: "Email is invalid" };
  }

  const emailUser = await User.findOne({ email: email });
  const users = await User.find({});
  console.log(users);
  if (!emailUser) {
    return { error: "User with this email does not exist" };
  }

  if (password.length < 5) {
    return { error: "Password must have 5 or more characters" };
  }

  const passwordMatch = await bcrypt.compare(password, emailUser.hashedPassword);
  if (!passwordMatch) {
    return { error: "Invalid password" };
  }

  return null;
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.NEXTAUTH_JWT_SECRET
  
    
    const token = await getToken({ req, secret })
    if (token) {
      throw new Error("Unauthorized");
    }
    const body = JSON.parse(await req.text());
    const { email, password } = body || {};
    
    // get and validate body variables
    const errorMessage = await validateForm(email, password);
    if (errorMessage) {
      return new NextResponse(JSON.stringify(errorMessage as ResponseData), {status: 400});
    }

    return new NextResponse(JSON.stringify({ msg: "Login successful!" }), {status: 200});
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: "Server error: " + err }), {status: 500});
  }
}
