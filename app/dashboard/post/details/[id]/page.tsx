import prisma from "@/lib/db";
import Image from "next/image";

async function getData(id: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      title: true,
      content: true,
      description: true,
      image: true,
      createdAt: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
          imageProfile: true,
        },
      },
    },
  });

  return data;
}

export default async function Details({ params }: { params: { id: string } }) {
  const post = await getData(params.id);
  return (
    <section className="min-h-screen">
      <div className="max-w-5xl mx-auto mt-10">
        <div className="w-full">
          <h1 className="text-3xl text-center font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            {post?.title}
          </h1>
          <p className="text-center mt-5">{post?.description}</p>

          <div className="flex items-center justify-end mt-5">
            <div className="flex gap-2 self-end">
              <p>Posted on</p>
              <span>
                {new Date(post?.createdAt as Date).toLocaleDateString("pt-BR")}
              </span>
            </div>
            <div className="items-center ml-2">
              <Image
                src={post?.user?.imageProfile as string}
                alt="user"
                width={50}
                height={50}
                className="rounded-full"
              />
              <p className="ml-2">
                {post?.user?.firstName} {post?.user?.lastName}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-md">
          <Image
            src={post?.image as string}
            alt={post?.title as string}
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>
        <div className="mt-10 mb-10">
          <p className="text-md md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-muted-foreground">
            {post?.content}
          </p>
        </div>
      </div>
    </section>
  );
}
