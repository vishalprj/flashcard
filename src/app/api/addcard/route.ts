import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const res = await req.json();
    const addCard = await prisma.card.create({
      data: {
        question: res.question,
        answer: res.answer,
      },
    });
    return NextResponse.json(addCard, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
