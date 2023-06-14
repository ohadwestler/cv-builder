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
  firstname: string,
  lastname: string,
  email: string,
  password: string
) => {
  if (firstname?.length < 2) {
    return { error: "first name must have 2 or more characters" };
  }
  if(lastname?.length < 2) {
    return { error: "lastname must have 2 or more characters" };
  }
  if (!validateEmail(email)) {
    return { error: "Email is invalid" };
  }

  const emailUser = await User.findOne({ email: email });

  if (emailUser) {
    return { error: "Email already exists" };
  }

  if (password.length < 5) {
    return { error: "Password must have 5 or more characters" };
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
    const { firstname, lastname, email, password } = body || {};
    
    // get and validate body variables
    const errorMessage = await validateForm(firstname, lastname, email, password);
    if (errorMessage) {
      return new NextResponse(JSON.stringify(errorMessage as ResponseData), {status: 400});
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    // create new User on MongoDB
    const newUser = new User({
      firstname,
      lastname,
      email,
      hashedPassword,
    });
    await newUser.save();
    return new NextResponse(JSON.stringify({ msg: "Successfully created new User: " + newUser.id }), {status: 200});
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: "Server error: " + err }), {status: 500});
  }
}
