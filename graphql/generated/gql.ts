/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query BlogPostsGetAll {\n  allBlogPost {\n    _id\n    title\n    publishDate\n    additionalCategories {\n      name\n    }\n    category {\n      name\n    }\n    slug {\n      current\n      source\n    }\n    blockContentRaw\n  }\n}": types.BlogPostsGetAllDocument,
    "query BlogPostsGetByCategory($category: String!) {\n  allBlogPost(where: {category: {name: {eq: $category}}}) {\n    category {\n      name\n    }\n    slug {\n      current\n      source\n    }\n    blockContentRaw\n  }\n}": types.BlogPostsGetByCategoryDocument,
    "query BlogPostGetOne($slug: String!) {\n  allBlogPost(where: {slug: {current: {eq: $slug}}}) {\n    category {\n      name\n    }\n    _id\n    slug {\n      current\n      source\n    }\n    blockContentRaw\n  }\n}": types.BlogPostGetOneDocument,
    "query CategoryGetAll {\n  allCategory {\n    name\n  }\n}": types.CategoryGetAllDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query BlogPostsGetAll {\n  allBlogPost {\n    _id\n    title\n    publishDate\n    additionalCategories {\n      name\n    }\n    category {\n      name\n    }\n    slug {\n      current\n      source\n    }\n    blockContentRaw\n  }\n}"): typeof import('./graphql').BlogPostsGetAllDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query BlogPostsGetByCategory($category: String!) {\n  allBlogPost(where: {category: {name: {eq: $category}}}) {\n    category {\n      name\n    }\n    slug {\n      current\n      source\n    }\n    blockContentRaw\n  }\n}"): typeof import('./graphql').BlogPostsGetByCategoryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query BlogPostGetOne($slug: String!) {\n  allBlogPost(where: {slug: {current: {eq: $slug}}}) {\n    category {\n      name\n    }\n    _id\n    slug {\n      current\n      source\n    }\n    blockContentRaw\n  }\n}"): typeof import('./graphql').BlogPostGetOneDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryGetAll {\n  allCategory {\n    name\n  }\n}"): typeof import('./graphql').CategoryGetAllDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
