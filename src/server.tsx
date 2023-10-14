import { Index } from "./Index";
import { renderToString } from "react-dom/server";
import { BunPost } from "./posts/BunPost";
import { HomePage } from "./pages/HomePage";

Bun.serve({
  fetch(req) {
    const url = new URL(req.url);

    const routes = [
      {
        component: <BunPost />,
        title: "Hello Bun",
        slug: "/hello-bun",
      },
    ];

    const routeDictionary = routes.reduce((acc: any, route) => {
      acc[route.slug] = route;
      return acc;
    }, {});

    let route = null;
    if (url.pathname === "/") {
      route = {
        component: <HomePage routes={routes} />,
      };
    } else {
      route = routeDictionary[url.pathname];
    }

    if (!route) {
      return new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }

    const html = renderToString(
      Index({
        route,
      })
    );
    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
  port: process.env.PORT || 8080,
});

console.log("Listening");
