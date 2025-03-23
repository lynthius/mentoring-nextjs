import Link from "next/link";
import { SanityDocument } from "next-sanity";

import { sanityFetch } from "@/client";
import slugify from "slugify";

const EVENTS_QUERY = `*[
  _type == "blogPost"
  && defined(slug.current)
]{
  _id,
  title,
  category->{_id, name},
  additionalCategories[]->{_id, name},
  slug, publishDate
} |order(publishDate desc)`;


export default async function IndexPage() {
  const posts = await sanityFetch<SanityDocument[]>({ query: EVENTS_QUERY });

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter">Events</h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {posts.map((post) => {
          const postSlug = slugify(post.category.name, { lower: true, strict: true, locale: "pl" });
          return (
            <li className="bg-white p-4 rounded-lg" key={post._id}>
              <Link className="hover:underline" href={`/${postSlug}/${post.slug.current}`}>
                <h2 className="text-xl font-semibold">{post?.title}</h2>
                <p className="text-gray-500">{new Date(post?.publishDate).toLocaleDateString()}</p>
                <p className="text-gray-500">{post?.category.name}</p>
                <hr />
                <ul className="list-disc list-inside text-gray-200">
                  {post.additionalCategories.map((category: any) => (
                    <li key={category._id}>{category.name}</li>
                  ))}
                </ul>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
