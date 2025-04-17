#!/usr/bin/env node

import { build } from "gluegun";

const fleet = async () => {
	// create cli
	const cli = build()
		.brand("fleet")
		.src(__dirname)
		.plugins("./commands")
		.help()
		.version("1.0.0")
		.create();

	// Exécution de la commande
	const toolbox = await cli.run();

	// Gestion des erreurs si aucune commande n'est trouvée
	return toolbox;
};

/* if we want to launch directly the cli 
fleet()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });
/** */
export default fleet;
export const run = fleet;
