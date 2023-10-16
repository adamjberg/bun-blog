import { Index } from "./Index";
import { renderToString } from "react-dom/server";

Bun.serve({
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/") {
      const PostPage = require("./pages/PostPage");
      const serverSideProps = await PostPage.getServerSideProps();

      const html = renderToString(
        Index({
          component: <PostPage.default {...serverSideProps.props} />,
          initialData: serverSideProps.props,
          title: "Post",
        })
      );
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    } else if (url.pathname === "/index.js") {
      const buildOutput = await Bun.build({
        entrypoints: ["./src/BrowserEntry.tsx"],
      });

      return new Response(await buildOutput.outputs[0].text(), {
        headers: { "Content-Type": "application/javascript" },
      });
    } else {
      return new Response("Not found", {
        status: 404,
      });
    }
  },
  port: process.env.PORT || 8080,
});
