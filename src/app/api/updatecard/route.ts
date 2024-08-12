import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updateData = await prisma.card.update({
      where: {
        id: body.id,
      },
      data: {
        question: body.question,
        answer: body.answer,
      },
    });
    return NextResponse.json({ data: updateData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
