export function HomePage({ routes }: { routes: any }) {
  return <>
    <h1>Home Page</h1>
    {routes.map((route: any) => {
      return <div><a href={route.slug}>{route.title}</a></div>
    })}
  </>;
}
