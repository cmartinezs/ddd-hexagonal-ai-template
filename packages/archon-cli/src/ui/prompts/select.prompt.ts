import inquirer from 'inquirer';

export interface SelectChoice {
  name: string;
  value: string;
}

export async function selectPrompt(message: string, choices: SelectChoice[], defaultValue?: string): Promise<string> {
  const { selected } = await inquirer.prompt([{
    type: 'list',
    name: 'selected',
    message,
    choices,
    default: defaultValue,
  }]);
  return selected as string;
}

export async function inputPrompt(
  message: string,
  validate?: (v: string) => boolean | string,
): Promise<string> {
  const { value } = await inquirer.prompt([{
    type: 'input',
    name: 'value',
    message,
    validate: validate ? (v: string) => validate(v) : undefined,
  }]);
  return value as string;
}
