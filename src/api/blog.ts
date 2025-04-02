import { BlogPostGetOneDocument, BlogPostsGetAllDocument } from "../../graphql/generated/graphql"
import { executeGraphqlOnServer } from "../../graphql/graphqlClient"

export const getBlogPostBySlug = async (slug: string) => {
    return await executeGraphqlOnServer(BlogPostGetOneDocument, { slug })
}

export const getAllBlogPosts = async () => {
    return await executeGraphqlOnServer(BlogPostsGetAllDocument)
}

