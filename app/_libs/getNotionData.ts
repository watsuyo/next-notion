import { Client } from "@notionhq/client";

const getNotionDataList = async () => {
	const notion = new Client({ auth: process.env.NOTION_API_KEY });
	const databaseId = "1bdd0f63ee9342e0bdc64665673e5066";
	const response = await notion.databases.query({
		database_id: databaseId,
	});

	const filteredPages = response.results.filter(
		(result) => "properties" in result && result.properties !== undefined,
	);
	return filteredPages;
};

const getNotionMetaData = async (id: string) => {
	const notion = new Client({ auth: process.env.NOTION_API_KEY });
	const response = await notion.pages.retrieve({ page_id: id });
	const {
		Tags,
		Name,
		Excerpt,
		"Published On": publishedOn,
		Slug,
		"Hide Cover": hideCover,
		"Hide CTA": hideCta,
		Publish,
		"Meta Title": metaTitle,
		"Meta Description": metaDescription,
	} = response.properties;

	const { file, external } = response.cover;

	const metaData = {
		tags: Tags.multi_select,
		title: Name.title[0]?.plain_text,
		description: Excerpt.rich_text[0]?.plain_text,
		cover: file?.url || external.url,
		publishedOn: publishedOn.last_edited_time,
		slug: Slug.rich_text[0]?.plain_text,
		hideCover: hideCover.checkbox,
		hideCta: hideCta.checkbox,
		publish: Publish.checkbox,
		metaTitle: metaTitle.rich_text[0]?.plain_text,
		metaDescription: metaDescription.rich_text[0]?.plain_text,
	};

	return metaData;
};

export { getNotionDataList, getNotionMetaData };
