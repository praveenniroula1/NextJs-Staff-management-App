import dbConfig from "@/app/db/dbConfig"
import User from "@/app/db/models/userModels"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const search = searchParams.get("search")
    const query = search
      ? {
        $or: [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
      : {};

    await dbConfig()
    if (searchParams || userId) {
      const users = await User.find(query);
      return new NextResponse(JSON.stringify(users), { status: 200 })
    } else {
      const users = await User.find();
      return new NextResponse(JSON.stringify(users), { status: 200 })
    }

  } catch (error: any) {
    return new NextResponse("hahahaha You have a problem" + error.message, { status: 500 })
  }
}
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await dbConfig();
    const newUser = new User(body);
    await newUser.save();

    return new NextResponse(
      JSON.stringify({ user: newUser, message: "User is created" }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating user" + error.message, {
      status: 500,
    });
  }
};

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    console.log(searchParams)
    const userId = searchParams.get("userId")

    // Extract the updated user details from the request body
    const body = await request.json();
    const { email, username, password } = body;

    await dbConfig();

    // Validate input
    if (!userId || !email || !username || !password) {
      return NextResponse.json({ message: "Missing user ID, email, username, or password" }, { status: 400 });
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, username, password },
      { new: true }
    );

    // Check if user was updated successfully
    if (updatedUser) {
      return NextResponse.json({ message: "Successfully updated", updatedUser }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

  } catch (error: any) {
    return NextResponse.json({ message: "Error updating user: " + error.message }, { status: 500 });
  }
}

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)
    console.log(searchParams)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
    }

    await dbConfig();
    const deletedUser = await User.findByIdAndDelete(userId);

    if (deletedUser) {
      return NextResponse.json({ message: 'Successfully deleted the user' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Error in deleting the user: ' + error.message }, { status: 500 });
  }
};