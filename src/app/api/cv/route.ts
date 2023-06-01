import { NextRequest, NextResponse } from "next/server";
import User from "@/model/User";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.NEXTAUTH_JWT_SECRET;
    const token = await getToken({ req, secret });
    if (!token) {
      throw new Error("Unauthorized");
    }

    const body = JSON.parse(await req.text());
    const { codeBlocks } = body;
    const now = new Date();
    const cvJson = {cv_data : codeBlocks[0], created_at: now}
    const updatedUser = await User.findOneAndUpdate(
      { email: token.email },
      { $push: { cvs: cvJson } },
      { new: true } // This option ensures that the function returns the updated document
    );
    if (!updatedUser) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(
      JSON.stringify({
        msg: "Successfully added new CV to user: " + updatedUser.id,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: "Server error: " + err }), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const secret = process.env.NEXTAUTH_JWT_SECRET;
    const token = await getToken({ req, secret });

    if (!token) {
      throw new Error("Unauthorized");
    }

    // Retrieve the user document
    const user = await User.findOne({ email: token.email });

    // Check if user exists
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Return the user's CVs
    return new NextResponse(JSON.stringify(user.cvs), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: "Server error: " + err }), {
      status: 500,
    });
  }
}
