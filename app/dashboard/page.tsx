import { DeletePost } from "@/components/delete-post";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export default async function Page() {
  const posts = await getPosts();
  return (
    <main className="min-h-screen max-w-5xl mx-auto">
      <div className="flex items-center justify-between mt-10">
        <h1>Dashboard</h1>

        <Button variant="ghost" asChild>
          <Link href="/dashboard/post/create">Create Post</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={100}
                  height={100}
                />
              </TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.description}</TableCell>
              <TableCell className="flex items-center gap-2">
                {/* <Button variant="default" asChild>
                  <Link href={`/dashboard/post/${post.id}`}>Edit</Link>
                </Button> */}
                <DeletePost id={post.id} />
                <Button variant="default" asChild>
                  <Link href={`/dashboard/post/details/${post.id}`}>View</Link>
                </Button>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
