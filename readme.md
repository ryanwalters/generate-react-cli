# Generate React CLI
[![dependencies](https://david-dm.org/arminbro/generate-react-cli.svg)](https://david-dm.org/arminbro/generate-react-cli)
[![License](https://img.shields.io/npm/l/express.svg)](https://github.com/arminbro/generate-react-cli/blob/master/LICENSE)

<p align="center"><img src="src/assets/component-cmd.gif?raw=true"/></p>

## Why?
To help speed up productivity in React projects and stop copying, pasting, and renaming files each time you want to create a new component.

**_Few notes:_**
- The CLI now supports two testing component library templates [Enzyme](https://airbnb.io/enzyme) & [Testing Library](https://testing-library.com) that work with [Jest](https://jestjs.io/).
- The CLI has an opinion on how files are structured within the project. We follow "[grouping by features](https://reactjs.org/docs/faq-structure.html#grouping-by-features-or-routes)."

## Install
`npm i -g generate-react-cli`

## Config File
When you run generate-react-cli within your project the first time, it will ask you a series of questions to customize the cli for your project needs (this will create a "generate-react-cli.json" config file).

### e.g. **generate-react-cli.json**
```json
{
  "component": {
    "path": "src/components",
    "css": {
      "preprocessor": "scss",
      "module": true
    },
    "test": {
      "library": "Testing Library",
      "withTest": true
    },
    "withStory": true,
    "withLazy": false
  }
}
```

## Commands

### Generate Component
`generate-react component <ComponentName>`

#### Shorthand 
`g-r c <ComponentName>`

This command will create a folder with your component name within your default (e.g. **src/components**) directory, and its corresponding files.

#### Options
|Parameter|Description|Default Value|
|---------|-----------|-------|
| **-p** or<br>**--path** | Value of the path where you want the component to be generated in (e.g. **src/pages**). | **src/components**
| **-t** or<br>**--withTest** | Create a corresponding test file with this component? | **Boolean value selected in "generate-react-cli.json" config file**
| **-s** or<br>**--withStory** | Create a corresponding story file with this component? | **Boolean value selected in "generate-react-cli.json" config file**
| **-l** or<br>**--withLazy** | Create a corresponding lazy file (a file that lazy-loads your component out of the box and enables [code splitting](https://reactjs.org/docs/code-splitting.html#code-splitting)) with this component? | **Boolean value selected in "generate-react-cli.json" config file**

<br>
Have fun!
