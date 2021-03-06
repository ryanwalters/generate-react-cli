import { accessSync, constants, outputFileSync, readFileSync } from 'fs-extra';
import deepKeys from 'deep-keys';
import chalk from 'chalk';
import { prompt } from 'inquirer';
import grcConfigTemplateFile from '../templates/configs/grc-configi-template.json';

const questions = [
  {
    type: 'input',
    name: 'component.path',
    message: 'Set the default path directory to where your components will be generated in?',
    default: function() {
      return 'src/components';
    },
  },
  {
    type: 'list',
    name: 'component.css.preprocessor',
    message: 'Does your project use a CSS Preprocessor?',
    choices: ['css', 'scss', 'less', 'styl'],
  },
  {
    type: 'confirm',
    name: 'component.css.module',
    message: 'Does your project use CSS modules?',
  },
  {
    type: 'list',
    name: 'component.test.library',
    message: 'What testing component library does your project use?',
    choices: ['Enzyme', 'Testing Library', 'None'],
  },
  {
    type: 'confirm',
    name: 'component.test.withTest',
    message: 'Would you like to create a corresponding test file with each component you generate?',
  },
  {
    type: 'confirm',
    name: 'component.withStory',
    message:
      'Does your project use Storybook and would you like to create a corresponding story with each component you generate?',
  },
  {
    type: 'confirm',
    name: 'component.withLazy',
    message:
      'Would you like to create a corresponding lazy file (a file that lazy-loads your component out of the box and enables code splitting: https://reactjs.org/docs/code-splitting.html#code-splitting) with each component you generate?',
  },
];

// public

export async function getCLIConfigFile() {
  // Make sure the cli commands are running from the root level of the project
  try {
    accessSync('./package.json', constants.R_OK);

    // check to see if the grc config file exists
    try {
      accessSync('./generate-react-cli.json', constants.R_OK);
      const configFile = JSON.parse(readFileSync('./generate-react-cli.json'));

      if (deepKeys(configFile).toString() !== deepKeys(grcConfigTemplateFile).toString()) {
        return await updateCLIConfigFile();
      }

      return configFile;
    } catch (e) {
      return await createCLIConfigFile();
    }
  } catch (error) {
    console.error(
      chalk.red.bold(
        "ERROR: Please make sure that you're running the generate-react-cli commands from the root level of your React project"
      )
    );
    process.exit(1);
  }
}

// private

async function createCLIConfigFile() {
  try {
    console.log('');
    console.log(
      chalk.cyan(
        '============================================================================================================================'
      )
    );
    console.log(chalk.cyan("Looks like this is the first time you're running generate-react-cli within this project."));
    console.log('');
    console.log(
      chalk.cyan(
        'Answer a few questions to customize the generate-react-cli for your project needs (this will create a "generate-react-cli.json" config file).'
      )
    );
    console.log(
      chalk.cyan(
        '============================================================================================================================'
      )
    );
    console.log('');

    const answers = await prompt(questions);

    outputFileSync('generate-react-cli.json', JSON.stringify(answers, null, 2));

    console.log('');
    console.log(
      chalk.cyan(
        'A config file ("generate-react-cli.json") was successfully created on the root level of your project.'
      )
    );

    console.log('');
    console.log(chalk.cyan('You can always go back and update it as needed.'));
    console.log('');
    console.log(chalk.cyan('Happy Hacking!'));
    console.log('');
    console.log('');

    return answers;
  } catch (e) {
    console.error(chalk.red.bold('ERROR: Could not create "generate-react-cli.json" config file.'));
  }
}

async function updateCLIConfigFile() {
  try {
    console.log('');
    console.log(
      chalk.cyan(
        '============================================================================================================================'
      )
    );
    console.log(
      chalk.cyan(
        'Generate React CLI has been updated and has a few new features from the last time you ran it within this project.'
      )
    );
    console.log('');
    console.log(chalk.cyan('Please answer a few questions to update the "generate-react-cli.json" config file.'));
    console.log(
      chalk.cyan(
        '============================================================================================================================'
      )
    );
    console.log('');

    const answers = await prompt(questions);

    outputFileSync('generate-react-cli.json', JSON.stringify(answers, null, 2));

    console.log('');
    console.log(chalk.cyan('The ("generate-react-cli.json") was successfully updated for this project.'));

    console.log('');
    console.log(chalk.cyan('You can always go back and manually update it as needed.'));
    console.log('');
    console.log(chalk.cyan('Happy Hacking!'));
    console.log('');
    console.log('');

    return answers;
  } catch (e) {
    console.error(chalk.red.bold('ERROR: Could not update the "generate-react-cli.json" config file.'));
  }
}
