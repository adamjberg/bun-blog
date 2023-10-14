export function Index({ route }: { route: any }) {
  return <html>
    <head>
      <title>{route.title}</title>
    </head>
    <body>
      {route.component}
    </body>
    </html>
}