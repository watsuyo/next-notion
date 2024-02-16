import Head from "next/head";

import "prismjs/themes/prism-tomorrow.css";
// import { NotionRenderer } from "@watusyo/react-notion";
// import "react-notion/src/styles.css";
import { NotionRenderer } from "../../../react-notion-sushi";
import "../../../react-notion-sushi/src/styles.css";

const NotionPageClient = async ({ id }: {
  id: string;
}) => {
  const fetchPage = async () => {
    const response = await fetch(
      `https://watsuyo-notion-api-worker.classmethodeurope.workers.dev/v1/page/${id}`
    );
    return await response.json();
  };

  const blocks = await fetchPage();

  return (
    <div>
      <Head>
        <style>{`body { background-color: #fff;}`}</style>
        <title>react-notion example</title>
      </Head>
      <NotionRenderer
        blockMap={blocks}
        fullPage
        hideHeader
      />
    </div>
  );
};

export default NotionPageClient;
