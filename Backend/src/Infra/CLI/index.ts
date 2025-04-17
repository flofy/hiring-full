import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { FleetManager } from '../../App';

// Initialiser le programme principal
const program = new Command();

program
  .name('fleet')
  .description('Fleet management CLI')
  .version('1.0.0');

// Fonction pour charger dynamiquement toutes les commandes
async function loadCommands() {
  const commandsDir = path.join(__dirname, 'commands');
  const files = fs.readdirSync(commandsDir);
  
  for (const file of files) {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      const commandPath = path.join(commandsDir, file);
      const commandModule = require(commandPath);
      
      // Supposons que chaque module exporte une fonction qui configure une commande
      if (typeof commandModule.configureCommand === 'function') {
        await commandModule.configureCommand(program);
      }
    }
  }
}

// Exécuter l'application CLI
async function run() {
  try {
    await loadCommands();
    await program.parseAsync(process.argv);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

run();