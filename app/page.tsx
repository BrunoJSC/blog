import { Post } from "@/components/post";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

async function getPosts() {
  const data = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

function getRandomPost(post) {
  const randomIndex = Math.floor(Math.random() * post.length);
  return post[randomIndex];
}

export default async function Home() {
  const posts = await getPosts();
  const featuredPost = getRandomPost(posts);

  return (
    <main className="min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 lg:max-w-5xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <div className="inline-block rounded-lg px-3 py-1 text-sm font-medium bg-muted-foreground">
                New Technology
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {featuredPost.title}
              </h1>
              <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {featuredPost.description}
              </p>
              <Button variant="outline" asChild>
                <Link
                  href={`/post/${featuredPost.id}`}
                  className="inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium shadow transition-colors visible:outline-none focus-visible:ring-1"
                >
                  Read More
                </Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <Image
                src={featuredPost.image}
                width={500}
                height={500}
                alt="Quantum Computer"
                className="w-full max-w-md bg-red-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 lg:max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.description}
                image={post.image}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
