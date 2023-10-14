import { Index } from "./Index";
import { renderToString } from "react-dom/server"
import { BunPost, BunPostSlug } from "./posts/BunPost"
import { HomePage } from "./pages/HomePage";

process.on("SIGTERM", () => {
  console.log("Exiting");
  process.exit();
});

Bun.serve({
  fetch(req) {
    const url = new URL(req.url);

    const postMap = {
      '/': <HomePage />,
      [BunPostSlug]: <BunPost />
    } as any;
  
    const children = postMap[url.pathname];
    if (!children) {
      return new Response("", {
        status: 404,
        statusText: "Not Found"
      })
    }

    const html = renderToString(Index({
      children
    }));
    return new Response(html, {
      headers: {
        "Content-Type": "text/html"
      }
    });
  },
  port: process.env.PORT || 8080
});

console.log("Listening");