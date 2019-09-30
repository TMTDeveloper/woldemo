Wake on LAN Demo with NestJs
============================

Based On NestJs and (node_wake_on_lan)[https://github.com/agnat/node_wake_on_lan] by (agnat)[https://github.com/agnat]. Credits go to him.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## How To Use
Send post request to http://localhost:3000/wol with body like this:
```js
{
    "address": "192.168.1.255",
    "mac": "20DE20DE20DE",
    "port": 9
}
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Reza Aulia](rezazenaulia@gmail.com)
- Twitter - [@zenhuw](https://twitter.com/zenhuw)
- Nest - [https://nestjs.com](https://nestjs.com/)

## License

  Nest is [MIT licensed](LICENSE).
