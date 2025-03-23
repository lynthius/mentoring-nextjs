import { TypedDocumentString } from "@/gql/graphql";

type GraphQLResponse<T> =
        | { data?: undefined; errors: { message: string }[] }
        | { data: T; errors?: undefined };

export const executeGraphqlOnServer = async <TResult, TVariables>(
    query: TypedDocumentString<TResult, TVariables>,
    variables?: TVariables,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
): Promise<TResult> => {
    if (!process.env.GRAPHQL_URL) {
        throw TypeError("GRAPHQL_URL not set");
    }
    const res = await fetch(process.env.GRAPHQL_URL, {
        method: "POST",
        body: JSON.stringify({
            query,
            variables,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        next,
        cache,
    });

    const graphqlResponse = (await res.json()) as GraphQLResponse<TResult>;

    if (graphqlResponse.errors) {
        throw TypeError(`GRAPHQL Error`, { cause: graphqlResponse.errors });
    }

    return graphqlResponse.data;
};