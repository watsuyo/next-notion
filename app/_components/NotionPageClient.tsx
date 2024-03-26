import Head from "next/head";
import { NotionRenderer } from "react-notion-components";
import { getNotionMetaData } from "../_libs/getNotionData";

const NotionPageClient = async ({ id }: { id: string }) => {
	const fetchPage = async () => {
		const response = await fetch(
			`https://watsuyo-notion-api-worker.classmethodeurope.workers.dev/v1/page/${id}`,
		);
		return await response.json();
	};

	const blocks = await fetchPage();

	const metaData = await getNotionMetaData(id);

	return (
		<div>
			<Head>
				<title>react-notion example</title>
			</Head>
			<NotionRenderer
				blockMap={blocks}
				fullPage
				hideHeader
				metaData={metaData}
			/>
		</div>
	);
};

export default NotionPageClient;
