import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from "./db";

export async function getMyImages() {
  const { userId } = await auth();

  if (!userId) throw new Error("User is not authenticated");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}
