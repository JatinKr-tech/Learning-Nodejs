//An introduction to the npm package manager

//Introduction to npm

//In September 2022 over 2.1 million packages were reported being listed in the npm registry, making it the biggest single language code repository on Earth

//Yarn and pnpm are alternatives to npm cli. You can check them out as well.

//.....................................

//Packages

// npm installs, updates and manages downloads of dependencies of your project. 
// Dependencies are pre-built pieces of code, such as libraries and packages, that your Node.js application needs to work.

//
//Installing all dependencies

//npm install

//it will install everything the project needs, in the node_modules folder, creating it if it's not existing already.

// Installing a single package
// You can also install a specific package by running

// npm install <package-name>

//since npm 5, this command adds <package-name> to the package.json file dependencies. Before version 5, you needed to add the flag --save.

// Flags used with this command :

// --save-dev installs and adds the entry to the package.json file devDependencies
// --no-save installs but does not add the entry to the package.json file dependencies
// --save-optional installs and adds the entry to the package.json file optionalDependencies
// --no-optional will prevent optional dependencies from being installed

//Shorthands of the flags can also be used:

// -S: --save
// -D: --save-dev
// -O: --save-optional

//The difference between devDependencies and dependencies is that the former contains development tools, like a testing library, while the latter is bundled with the app in production.

//As for the optionalDependencies the difference is that build failure of the dependency will not cause installation to fail. But it is your program's responsibility to handle the lack of the dependency. Read more about optional dependencies.
//src: https://docs.npmjs.com/cli/v12/configuring-npm/package-json

//...............................

//Updating packages

//npm update

//npm update <package-name>

//................................

//Versioning

//npm also manages versioning, so you can specify any specific version of a package, or require a version higher or lower than what you need.

//npm install <package-name>@<version>

//............................

//Running Tasks

//The package.json file supports a format for specifying command line tasks that can be run by using

// npm run <task-name>

//It's very common to use this feature to run Webpack:

/*
{
  "scripts": {
    "watch": "webpack --watch --progress --colors --config webpack.conf.js",
    "dev": "webpack --progress --colors --config webpack.conf.js",
    "prod": "NODE_ENV=production webpack -p --config webpack.conf.js"
  }
}
  */

//So instead of typing those long commands, which are easy to forget or mistype, you can run

// $ npm run watch
// $ npm run dev
// $ npm run prod