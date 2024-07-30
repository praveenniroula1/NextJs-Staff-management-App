import dbConfig from "@/app/db/dbConfig"
import User from "@/app/db/models/userModels"
import { NextResponse } from "next/server"
import { json } from "stream/consumers"

export const GET = async (request:Request) => {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
   
    await dbConfig()
    if(searchParams && userId){
      const users = await User.findById(userId);
      return new NextResponse(JSON.stringify(users), { status: 200 })
    }else{
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

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    console.log(body)
    const { _id, nemail, nusername, npassword } = body;

    await dbConfig();

    if (!_id || !nemail || !nusername || !npassword) {
      return new NextResponse(JSON.stringify({ message: "Missing userId or newUsername" }), { status: 400 })
    }

    const updatedUser = await User.findByIdAndUpdate(_id, {
      email: nemail,
      username: nusername,
      password: npassword,
    }, { new: true })

    if (updatedUser) {
      return new NextResponse(JSON.stringify({ message: "Successfully updated", updatedUser }), { status: 400 })

    }

  } catch (error: any) {
    return new NextResponse("Error in creating user" + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    console.log('Request URL:', request.url);
    console.log('User ID:', userId);
    if (!userId) {
      return new NextResponse("Invalid userId")
    }
    await dbConfig()
    const deletedUser = await User.findByIdAndDelete(userId)
    if (deletedUser) {
      return new NextResponse("Successfully deleted the user")
    }
  }
  catch (error: any) {
    return new NextResponse("Error in deleting the user" + error.message)
  }
}


