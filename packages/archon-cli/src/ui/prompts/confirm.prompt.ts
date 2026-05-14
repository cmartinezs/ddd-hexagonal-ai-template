import inquirer from 'inquirer';

export async function confirmPrompt(message: string, defaultValue = false): Promise<boolean> {
  const { confirmed } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirmed',
    message,
    default: defaultValue,
  }]);
  return confirmed as boolean;
}
