import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, content, description, image } = await req.json();
  const { getUser } = getKindeServerSession();
  const userId = await getUser();

  if (!userId || !title || !content || !description || !image) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      userId: userId.id,
      title,
      content,
      description,
      image,
    },
  });

  return NextResponse.json(post);
}
