import type { AWS } from "@serverless/typescript";

export const resources: AWS["resources"] = {
	Resources: {
		/**
		 *
		 * Database
		 *
		 */
		DiscordBotCacheDynamoDBTable: {
			DeletionPolicy: "Retain",
			UpdateReplacePolicy: "Retain",
			Type: "AWS::DynamoDB::Table",
			Properties: {
				TableName: "discord_bot_cache",
				ProvisionedThroughput: {
					ReadCapacityUnits: 1,
					WriteCapacityUnits: 1,
				},
				AttributeDefinitions: [
					{
						AttributeName: "pk",
						AttributeType: "S",
					},
				],
				KeySchema: [
					{
						AttributeName: "pk",
						KeyType: "HASH",
					},
				],
			},
		},
	},
};
