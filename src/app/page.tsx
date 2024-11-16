import { db } from "~/server/db";

const mockUrls = [
  "https://utfs.io/f/W3J5W4gmYEy8zlvITLEFsITowa6DvyXktg0GRYipOQHUjZW7",
  "https://utfs.io/f/W3J5W4gmYEy87R1WL6BHhSUGbIq5zXpTn0NrZ4BLiu9tdlaA",
  "https://utfs.io/f/W3J5W4gmYEy8DAMsWPTpo4AKJaYLfH2WTOtm5XcP3N6bMrl0",
  "https://utfs.io/f/W3J5W4gmYEy8iGSxD56psj30USqvEJXZyWroDT7fQBCl1KOF",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
