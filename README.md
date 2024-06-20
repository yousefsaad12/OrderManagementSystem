
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

   - `/users`: CR operations for users.
   - `/products`: CR operations for products.
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
