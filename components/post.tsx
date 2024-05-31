import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

interface PostProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

export async function Post({ id, description, image, title }: PostProps) {
  return (
    <div className="grid gap-4">
      <Link href={`/post/${id}`}>
        <Image
          src={image}
          width={500}
          height={500}
          alt="Quantum Computer"
          className="w-full max-w-md bg-red-500"
        />

        <div className="space-y-2" key={id}>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed xl:text-base/relaxed dark:text-gray-400">
            {description.slice(0, 50) + "..."}
          </p>
        </div>
      </Link>
    </div>
  );
}
