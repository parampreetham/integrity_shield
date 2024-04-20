import {connect} from "@/dbConfig/dbConfig";
import User from "@models/manufacturerModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function GET() {
    try {
      const users = await User.find()
      return NextResponse.json({ users });

    } catch (error) {
      console.error('Error fetching users:', error);
      NextResponse.json({ error: 'Internal Server Error' });
    }
  }
