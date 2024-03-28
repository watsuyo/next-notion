import Link from "next/link";
import React from "react";
import { getNotionDataList } from "./_libs/getNotionData";

const NotionPage = async () => {
	const filteredPages = await getNotionDataList();

	console.log("filteredPages", filteredPages);

	return (
		<div>
			<p className="text-4xl font-bold">Home</p>
			<ul className="mt-4">
				{filteredPages.map((page) => (
					<Link
						className="text-blue-600 dark:text-blue-500 hover:underline"
						href={`/news/${page.id}`}
						target="_blank"
					>
						<li key={page.id} className="mb-2">
							{page.properties.Name.title[0].plain_text}
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default NotionPage;
