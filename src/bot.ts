/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-console */

const bootstrap = () => {
	const initialEnvVars = Object.keys(process.env);

	// Setup here

	const currentEnvVars = Object.keys(process.env).filter(
		ev => ev === "NODE_ENV" || !initialEnvVars.includes(ev),
	);

	console.log(JSON.stringify(currentEnvVars, null, 2));
};

bootstrap();
