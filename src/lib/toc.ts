export interface TocItem {
  title: string;
  url: string;
  depth: number;
}

export function getToc(content: string): TocItem[] {
  // ## 또는 ###으로 시작하는 줄을 찾음
  const regexp = /^(#{2,3})\s+(.*)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = regexp.exec(content)) !== null) {
    const depth = match[1].length; // ## 이면 2, ### 이면 3
    const title = match[2];
    const url = `#${title.replace(/\s+/g, '-').toLowerCase()}`; // 제목을 URL용 id로 변환
    toc.push({ title, url, depth });
  }

  return toc;
}
