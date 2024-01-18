import Head from "next/head";
import { NotionRenderer } from "@watsuyo/react-notion";
import "@watsuyo/react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

const NotionPageClient = async ({ path }: {
  path: string;
}) => {
  const fetchPage = async () => {
    const response = await fetch(
      `http://localhost:8787/v1/page/${path}`
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
      {/* <NotionRenderer
        blockMap={components}
        // fullPage
        // hideHeader
      /> */}
    </div>
  );
};

export default NotionPageClient;
