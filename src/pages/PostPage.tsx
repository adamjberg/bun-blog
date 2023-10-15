import { useState } from "react";

type Props = {
  title: string;
  slug: string;
  content: string;
}

export async function getServerSideProps(context: {
  params: { slug: string };
}) {
  return {
    props: {
      title: "Bun Blog",
      slug: "/bun",
      content: "<h1>Hello Bun</h1>",
    },
  };
}

export default function PostPage(props: Props) {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Post Page</h1>
      <p>{props.slug}</p>
      <div
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </>
  );
}
