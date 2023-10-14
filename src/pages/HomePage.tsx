import { BunPostSlug } from "../posts/BunPost";

export function HomePage() {
  return <>
    <h1>Home Page</h1>
    <a href={BunPostSlug}>Bun Blog</a>
  </>;
}
