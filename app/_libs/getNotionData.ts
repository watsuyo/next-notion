import { Client } from "@notionhq/client";
import type { MetaData } from "react-notion-components/dist/notion/renderer";

type NotionData = {
	object: "page";
	id: string;
	created_time: string;
	last_edited_time: string;
	created_by: {
		object: "user";
		id: string;
	};
	last_edited_by: {
		object: "user";
		id: string;
	};
	cover: { type: "external"; external: { url: string } };
	icon: { type: "emoji"; emoji: string };
	parent: {
		type: "database_id";
		database_id: string;
	};
	archived: boolean;
	properties: {
		"Published On": { last_edited_time: string };
		"Do not index": { checkbox: boolean };
		Slug: { rich_text: { plain_text: string }[] };
		"Hide Cover": { checkbox: boolean };
		"Meta Title": { rich_text: { plain_text: string }[] };
		"Meta Description": { rich_text: { plain_text: string }[] };
		"Hide CTA": { checkbox: boolean };
		"Last Edited Time": { last_edited_time: string };
		Publish: { checkbox: boolean };
		Excerpt: { rich_text: { plain_text: string }[] };
		Tags: { multi_select: { name: string }[] };
		Name: { title: { plain_text: string }[] };
	};
	url: string;
	public_url: string;
};

const getNotionDataList = async (): Promise<NotionData[]> => {
	const notion = new Client({ auth: process.env.NOTION_API_KEY });
	const databaseId = "1bdd0f63ee9342e0bdc64665673e5066";
	const response = await notion.databases.query({
		database_id: databaseId,
	});

	return response.results
		.filter(
			(result) => "properties" in result && result.properties !== undefined,
		)
		.map((result) => result as NotionData);
};

type Property = {
	Tags: { multi_select: { name: string }[] };
	Name: { title: { plain_text: string }[] };
	Excerpt: { rich_text: { plain_text: string }[] };
	"Published On": { last_edited_time: string };
	Slug: { rich_text: { plain_text: string }[] };
	"Hide Cover": { checkbox: boolean };
	"Hide CTA": { checkbox: boolean };
	Publish: { checkbox: boolean };
	"Meta Title": { rich_text: { plain_text: string }[] };
	"Meta Description": { rich_text: { plain_text: string }[] };
};

const getNotionMetaData = async (id: string): Promise<MetaData> => {
	const notion = new Client({ auth: process.env.NOTION_API_KEY });
	const response = (await notion.pages.retrieve({
		page_id: id,
	})) as unknown as {
		properties: Property;
		cover: { file: { url: string } | null; external: { url: string } };
	};

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

	const metaData: MetaData = {
		tags: Tags.multi_select.map((tag) => ({
			id: "",
			name: tag.name,
			color: "",
		})),
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
