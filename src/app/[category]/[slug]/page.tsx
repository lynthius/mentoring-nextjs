// import { notFound } from "next/navigation";
// import { executeGraphqlOnServer } from "../../../../graphql/graphqlClient";
// import { getAllBlogPosts, getBlogPostBySlug } from "@/api/blog";

// export default async function Page({ params }: { params: { slug: string; category: string; blockContentRaw: string } }) {
//   const { slug, category, blockContentRaw } = params;

//   const postData = await getBlogPostBySlug(slug);

//   if (!postData) {
//     notFound();
//   }

//   return (
//     <div>
//       <h1>
//         {postData.allBlogPost[0]._id} - {slug}
//       </h1>
//       <h3>{category}</h3>
//       <p>Content:</p>

//     </div>
//   );
// }

// export async function generateStaticParams() {
//   const data = await getAllBlogPosts();

//   return data.allBlogPost.map((post) => ({
//     category: post.category?.name,
//     slug: post.slug?.current,
//   }));
// }

import { notFound } from "next/navigation";
import { executeGraphqlOnServer } from "../../../../graphql/graphqlClient";
import { getAllBlogPosts, getBlogPostBySlug } from "@/api/blog";
import { PortableText } from "@portabletext/react";
import { TypedObject } from "@portabletext/types";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-okaidia.css"; // Changed to okaidia theme

export default async function Page({ params }: { params: { slug: string; category: string } }) {
  const { slug, category } = params;

  const postData = await getBlogPostBySlug(slug);

  if (!postData || postData.allBlogPost.length === 0) {
    notFound();
  }

  const post = postData.allBlogPost[0];
  const category_formatted = decodeURIComponent(category);

  return (
    <div>
      <h1>
        {post._id} - {slug}
      </h1>
      <h3>{category_formatted}</h3>
      <p>Content:</p>
      <PortableText
        value={post.blockContentRaw as TypedObject[]}
        components={{
          types: {
            code: ({ value }) => {
              if (value.language) {
                try {
                  require(`prismjs/components/prism-${value.language}`);
                } catch (e) {
                  console.warn(`Prism language '${value.language}' not found`);
                }
              }
              const html = Prism.highlight(
                value.code,
                Prism.languages[value.language] || Prism.languages.javascript,
                value.language || "javascript"
              );
              return (
                <pre className="rounded-lg" >
                  <code
                    className={`language-${value.language || "javascript"}`}
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </pre>
              );
            },
          },
        }}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const data = await getAllBlogPosts();

  return data.allBlogPost.map((post) => ({
    category: post.category?.name || "uncategorized",
    slug: post.slug?.current,
  }));
}
