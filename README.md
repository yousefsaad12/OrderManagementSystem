<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Order Management System

## Description

This project implements an order management system using NestJS, Prisma, and PostgreSQL. It includes functionalities for managing users, products, carts, and orders.

## Installation

Ensure you have Node.js and npm installed on your machine. Also, have PostgreSQL set up with appropriate permissions and a database created.

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/order-management-system.git
   ```
2. **Navigate into the directory:**
   ```
   cd order-management-system
   ```
3. **Install dependencies:**
   ```
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory based on `.env.example` and provide your PostgreSQL database connection URL and any other necessary environment variables.

5. **Run database migrations:**
   ```
   npx prisma migrate dev
   ```
   This command will apply the database schema defined in Prisma to your PostgreSQL database.

## Usage

1. **Start the application:**
   ```
   npm run start:dev
   ```
   This command starts the NestJS application in development mode.

2. **Access the API:**

   - Open a web browser or use an API client (e.g., Postman).
   - The API endpoints will be available at `http://localhost:3000` (or another port specified).

3. **API Endpoints:**

   - `/users`: CRUD operations for users.
   - `/products`: CRUD operations for products.
   - `/carts`: Operations related to shopping carts (e.g., adding/removing items).
   - `/orders`: Operations related to placing and managing orders.

## Testing

1. **Run tests:**
   ```
   npm test
   ```
   This command runs the tests for the project.

2. **Test coverage:**

   If using Jest for testing, you can check test coverage by running:
   ```
   npm test -- --coverage
   ```

## Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.
