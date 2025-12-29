import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

// 노션 클라이언트 설정
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });
const DATABASE_ID = (process.env.NOTION_DATABASE_ID || '').trim();

export async function getAllPosts() {
  if (!DATABASE_ID) return [];

  try {
    const response = await (notion as any).databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: { equals: true },
      },
      sorts: [{ property: 'Date', direction: 'descending' }],
    });
    return response.results.map((page: any) => {
      const thumbnailProperty = page.properties.Thumbnail?.files?.[0];
      let thumbnail = '';

      if (thumbnailProperty) {
        // 직접 업로드한 파일인 경우 vs 외부 링크인 경우
        thumbnail =
          thumbnailProperty.file?.url || thumbnailProperty.external?.url || '';
      }

      return {
        slug: page.properties.Slug?.rich_text[0]?.plain_text || '',
        title: page.properties.Name?.title[0]?.plain_text || '',
        date: page.properties.Date?.date?.start || '',
        category: page.properties.Category?.select?.name || '전체',
        description:
          page.properties.Description?.rich_text[0]?.plain_text || '',
        thumbnail: thumbnail,
        tags: page.properties.Tags?.multi_select?.map((t: any) => t.name) || [],
      };
    });
  } catch (error) {
    console.error('노션 글 불러오기 에러:', error);
    return [];
  }
}

export async function getPostData(slug: string) {
  try {
    const response = await (notion as any).databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Slug',
        rich_text: { equals: slug },
      },
    });

    const page = response.results[0];
    if (!page) return null;

    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    const thumbnailProperty = page.properties.Thumbnail?.files?.[0];
    const thumbnail =
      thumbnailProperty?.file?.url || thumbnailProperty?.external?.url || '';
    return {
      title: page.properties.Name?.title[0]?.plain_text,
      date: page.properties.Date?.date?.start,
      content: mdString.parent,
      category: page.properties.Category?.select?.name,
      description: page.properties.Description?.rich_text[0]?.plain_text || '',
      thumbnail: thumbnail,
      tags:
        page.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    };
  } catch (error) {
    console.error('본문 불러오기 실패:', error);
    return null;
  }
}
