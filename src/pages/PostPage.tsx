import { useState } from "react";

type Props = {
  title: string;
  afterTime: string;
  beforeTime: string;
  content: string;
}

export async function getServerSideProps() {
  const beforeTime = new Date().toUTCString();

  await new Promise((res) => {
    setTimeout(res, 1000);
  });

  const afterTime = new Date().toUTCString();

  return {
    props: {
      title: "Post",
      content: "<p>Hello Bun</p>",
      beforeTime,
      afterTime
    },
  };
}

export default function PostPage(props: Props) {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{props.title}</h1>
      <div>Before: {props.beforeTime}</div>
      <div>After: {props.afterTime}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Count: {count}
      </button>
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </>
  );
}
