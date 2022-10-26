import type { AWS } from "@serverless/typescript";

import { resources } from "./resources";

const serverlessConfig: Partial<AWS> = {
	service: "discord-bot",
	configValidationMode: "error",
	frameworkVersion: "3",
	package: {
		individually: true,
	},
	custom: {
		region: {
			dev: "us-east-2",
			local: "us-east-2",
			production: "us-east-1",
		},
		webpack: {
			webpackConfig: "webpack.resources.config.js"
		},
	},
	provider: {
		name: "aws",
		region: "${self:custom.region.${opt:stage, 'local'}}" as any,
		runtime: "nodejs16.x",
		memorySize: 512,
		timeout: 5,
		logRetentionInDays: process.env.NODE_ENV === "production" ? 3 : 1,
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: false,
		},
		environment: {
			STACK_NAME: "${self:service}-${opt:stage, 'local'}",
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
			NODE_ENV: "${opt:stage, 'local'}",
			CLOUD_REGION: "${self:provider.region}",
		},
		tags: {
			costs: "${self:service}-${opt:stage, 'local'}",
			environment: "${opt:stage, 'local'}",
		},
		stackTags: {
			costs: "${self:service}-${opt:stage, 'local'}",
			environment: "${opt:stage, 'local'}",
		},
	},
	resources,
};

//@ts-ignore
export = serverlessConfig;
