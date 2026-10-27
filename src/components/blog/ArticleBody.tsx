import { headingIds } from "@/data/blog";
import type { Block } from "@/data/blog";

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  const ids = headingIds(blocks);

  return (
    <div className="article-prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i} id={ids[i]!} dangerouslySetInnerHTML={{ __html: b.html }} />;
          case "h3":
            return <h3 key={i} id={ids[i]!} dangerouslySetInnerHTML={{ __html: b.html }} />;
          case "h4":
            return <h4 key={i} id={ids[i]!} dangerouslySetInnerHTML={{ __html: b.html }} />;
          case "p":
            return <p key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={i}>
                {b.items.map((item, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </List>
            );
          }
        }
      })}
    </div>
  );
}
