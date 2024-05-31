"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Markdown } from "@/components/markdown";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function Create() {
  const [isPreview, setIsPreview] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      image: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log(result);
      toast.success("Post created", {
        description: "Your post has been created",
        action: {
          label: "View",
          onClick: () => window.open(result.url),
        },
      });

      redirect("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto mt-10">
      <h1>Create</h1>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 lg:max-w-4xl">
          <div className="">
            <Button onClick={() => setIsPreview(!isPreview)}>
              {isPreview ? "Edit" : "Preview"}
            </Button>
          </div>

          <Card className="p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <div
                              className={cn(
                                "w-full flex divide-x p-2 gap-2 items-center",
                                isPreview ? "divide-x-0" : "divide-x"
                              )}
                            >
                              <Input
                                placeholder="🔗 Image url"
                                {...field}
                                className={cn(
                                  "border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500 ",
                                  isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                                )}
                                type="url"
                              />
                              <div
                                className={cn(
                                  " relative",
                                  isPreview
                                    ? "px-0 mx-auto w-full lg:w-4/5 "
                                    : "px-10 w-1/2 lg:block hidden"
                                )}
                              >
                                {isPreview ? (
                                  <div className="w-full h-80 relative mt-10 border rounded-md">
                                    <Image
                                      src={form.getValues().image}
                                      alt="preview"
                                      fill
                                      className=" object-cover object-center rounded-md"
                                    />
                                  </div>
                                ) : (
                                  <p className="text-gray-400">
                                    👆 click on preview to see image
                                  </p>
                                )}
                              </div>
                            </div>
                          </FormControl>

                          <div className="px-3">
                            <FormMessage />
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <>
                            <div
                              className={cn(
                                "w-full flex break-words p-2 gap-2",
                                isPreview ? "divide-x-0" : "divide-x"
                              )}
                            >
                              <Input
                                placeholder="Blog title"
                                {...field}
                                autoFocus
                                className={cn(
                                  "border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500",
                                  isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                                )}
                              />
                              <div
                                className={cn(
                                  "lg:px-10",
                                  isPreview
                                    ? "w-full lg:w-4/5 "
                                    : " w-1/2 lg:block hidden "
                                )}
                              >
                                <h1 className="text-3xl font-bold dark:text-gray-200">
                                  {form.getValues().title || "Untittle blog"}
                                </h1>
                              </div>
                            </div>
                          </>
                        </FormControl>

                        {form.getFieldState("title").invalid &&
                          form.getValues().title && (
                            <div className="px-2">
                              <FormMessage />
                            </div>
                          )}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <>
                            <div
                              className={cn(
                                "w-full flex break-words p-2 gap-2",
                                isPreview ? "divide-x-0" : "divide-x"
                              )}
                            >
                              <Input
                                placeholder="Blog title"
                                {...field}
                                autoFocus
                                className={cn(
                                  "border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500",
                                  isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                                )}
                              />
                              <div
                                className={cn(
                                  "lg:px-10",
                                  isPreview
                                    ? " w-full lg:w-4/5 "
                                    : " w-1/2 lg:block hidden "
                                )}
                              >
                                <p className="text-3xl font-normal">
                                  {form.getValues().description ||
                                    "Untittle blog"}
                                </p>
                              </div>
                            </div>
                          </>
                        </FormControl>

                        {form.getFieldState("description").invalid &&
                          form.getValues().description && (
                            <div className="px-2">
                              <FormMessage />
                            </div>
                          )}
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div
                            className={cn(
                              "w-full flex p-2 gap-2 ",
                              !isPreview ? "divide-x h-70vh" : "divide-x-0"
                            )}
                          >
                            <Textarea
                              placeholder="Blog content"
                              {...field}
                              className={cn(
                                "border-none text-lg font-medium leading-relaxed h-[400px] resize-none",
                                isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                              )}
                            />
                            <div
                              className={cn(
                                "overflow-scroll h-full",
                                isPreview
                                  ? "w-full lg:w-4/5 "
                                  : "w-1/2 lg:block hidden"
                              )}
                            >
                              <Markdown content={form.getValues().content} />
                            </div>
                          </div>
                        </FormControl>

                        {form.getFieldState("content").invalid &&
                          form.getValues().content && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full mt-10">
                  Save
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </section>
    </div>
  );
}
