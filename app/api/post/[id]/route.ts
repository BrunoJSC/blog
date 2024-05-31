import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = params.id;

  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = params.id;

  const { title, content, description, image } = await req.json();

  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
        description,
        image,
      },
    });

    return NextResponse.json({ message: "Post updated" });
  } catch (error) {
    console.log(error);
  }
}
