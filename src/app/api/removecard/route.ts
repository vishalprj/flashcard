import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await prisma.card.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
