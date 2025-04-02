import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a snippet" },
        { status: 401 }
      );
    }

    // Get user ID from session
    const userId = session.user.id;
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 401 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { description, code, language } = body;
    
    // Validate required fields
    if (!description || !code || !language) {
      return NextResponse.json(
        { error: "Description, code, and language are required" },
        { status: 400 }
      );
    }
    
    // Create snippet in database
    const snippet = await prisma.snippet.create({
      data: {
        userId,
        description,
        code,
        language,
        likes: 0,
      },
    });
    
    return NextResponse.json(snippet, { status: 201 });
  } catch (error) {
    console.error("Error creating snippet:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the snippet" },
      { status: 500 }
    );
  }
} 