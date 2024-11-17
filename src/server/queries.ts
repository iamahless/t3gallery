import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import "server-only";
import analyticsServerClient from "./analytics";
import { db } from "./db";
import { images } from "./db/schema";

export async function getMyImages() {
  const { userId } = await auth();

  if (!userId) throw new Error("User is not authenticated");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}

export async function getImage(id: number) {
  const { userId } = await auth();

  if (!userId) throw new Error("User is not authenticated");
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  if (image.userId !== userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const { userId } = await auth();

  if (!userId) throw new Error("User is not authenticated");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, userId)));

  analyticsServerClient.capture({
    distinctId: userId,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });

  redirect("/");
}
