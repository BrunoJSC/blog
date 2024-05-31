"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface DeletePostProps {
  id: string;
}

export function DeletePost({ id }: { id: string }) {
  const [post, setPost] = useState<DeletePostProps[]>([]);
  const deletedPost = async (id: string) => {
    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setPost((prevPosts) => prevPosts.filter((post) => post?.id !== id));
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <Button variant="destructive" onClick={() => deletedPost(id)}>
      Delete
    </Button>
  );
}
