import React from 'react'
import mongoose from 'mongoose'

const dbConfig =async () => {
  try {
    const connection= await mongoose.connect("mongodb://localhost/backendnextjs")
    if(connection){
         console.log("MongoDb connection successfully")
    }else{
        console.log("MongoDb connection Failed")

    }
  } catch (error) {
    console.log(error)
  }
}

export default dbConfig
