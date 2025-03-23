import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.GRAPHQL_URL,
	documents: "graphql/**/*.graphql",
	ignoreNoDocuments: false,
	generates: {
		"src/gql/": {
			preset: "client",
			presetConfig: {
				fragmentMasking: false,
			},
			config: {
				defaultScalarType: "unknown",
				useTypeImports: true,
				enumsAsTypes: true,
				skipTypename: true,
				documentMode: "string",
			},
			plugins: [],
		},
	},
};

export default config;