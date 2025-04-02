import { getBlogPostByCategory, getCategories } from '@/api/blog';
import { notFound } from 'next/navigation';
import React from 'react'

const Category = async ({params}:{params: Promise<{category:string}> }) => {
    const {category}=await params
    const posts=await getBlogPostByCategory(category)
    if(!posts){
        return notFound();
    }
    console.log(posts)
  return (
    <div>page</div>
  )
}
export default Category;

export async function generateStaticParams() {
  const data = await getCategories();

  return data.allCategory.map((category) => ({
    category: category.name,
  }));
}