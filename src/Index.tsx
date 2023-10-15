export function Index({ component, initialData, title }: any) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}`,
          }}
        ></script>

        <script src="index.js" defer></script>
      </head>
      <body>
        <div id="root">{component}</div>
      </body>
    </html>
  );
}
