import { Index } from "./Index";
import { renderToString } from "react-dom/server";

Bun.serve({
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/index.js") {
      const buildOutput = await Bun.build({
        entrypoints: ["./src/BrowserEntry.tsx"],
        minify: true,
      });

      return new Response(await buildOutput.outputs[0].text(), {
        headers: {
          "Content-Type": "application/javascript",
        },
      });
    }    

    const PostPage = require("./pages/PostPage");
    const serverSideProps = await PostPage.getServerSideProps({
      params: {
        slug: url.pathname,
      },
    });

    const html = renderToString(
      Index({
        component: <PostPage.default {...serverSideProps.props} />,
        initialData: serverSideProps.props,
        title: "Post"
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
