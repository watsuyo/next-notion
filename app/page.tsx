import React from "react";
import Link from "next/link";
import { Client } from "@notionhq/client";

const NotionPage = async () => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const databaseId = "e4ca9b3e52e5465dbe530ec488d98881";
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const filteredPages = response.results.filter(
      (result) => 'properties' in result && result.properties !== undefined
  );


  return (
    <div>
      <h1 className="text-4xl font-bold">Home</h1>
      <ul className="mt-4">
        {filteredPages.map((page) => (
          <li key={page.id} className="mb-2">
            <Link
              className="text-blue-600 dark:text-blue-500 hover:underline"
              href={`/news/${page.id}`}
            >
              {/* @ts-ignore */}
              {page.properties.Name.title[0].plain_text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotionPage;
