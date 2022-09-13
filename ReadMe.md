# Cat Card Application API 🛡️

## About the Project

This is a rest API repository for customize images by integrating [Cat as a Service](https://cataas.com/) and [Jimp](https://github.com/oliver-moran/jimp#readme).

### Features

- This will take two or more than images and re-encoded to bind it into one image

## Development

I use `node` version `18.9.0`

```
nvm install 18.9.0 or nvm install node for the latest version
```

```
nvm use 18.9.0
```

The first time, you will need to run

```
yarn
```

Then just start the server with

```
npm install
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`IMAGE_UPLOAD_PATH`
`CATAAS_API`

## Getting Started

### Prerequisites

This project uses Yarn as package manager

```bash
 npm install --global yarn

```

### Installation

Install cat-card-application with yarn

- clone the `cat-card-application` repo.
- cd at-card-application
- install the dependencies.
- run `cp .env.example .env`.
- configure .env variables with yours in ` .env` file

#### configure running options

To save a new image file, we should pass arguments from the terminal with the `yarn start` command. Can pass image options as below

- run `yarn start --greeting hello --who you --width 400 --height 500 --color pink --size 100`

## Acknowledgements

### Why Used Jimp:

The `@mapbox/blend` package which was initially used in the script, has not been updated for past four years. Also has some issues which was not fixed. Thus I decided to use `Jimp` library as it has many more features which might be useful in the future changes and it was a well maintained and a popular image processing library for Node written entirely in `JavaScript`.

### Why Used Axios:

I have used `Axios` instead of `request` library, because from Feb 11th 2020, it is fully deprecated. Thus there will not be any issues when considering maintenance as `Axios` is also a up-to-date simple promise based HTTP client library.

### More Simpler Code

To make it simpler project, and easy to read, I used `async/await` instead of callbacks in the script & did not use transpiler configuration for typescript. For better maintainability and organization, I used modular structure along with `import/export` instead of `require`

Useful resources and libraries that have used.

- [Jimp](https://github.com/oliver-moran/jimp#readme)
- [Cat as a Service](https://cataas.com/)
- [Axios](https://github.com/axios/axios#axios)
- [ESLint](https://github.com/eslint/eslint#eslint)
- [Prettier](https://github.com/prettier/prettier)
