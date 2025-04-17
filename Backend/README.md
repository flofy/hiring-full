# Fleet Management Project

## Overview
This project is a vehicle fleet management application built using TypeScript, following Domain-Driven Design (DDD) and Command Query Responsibility Segregation (CQRS) principles. The application allows users to create fleets, register vehicles, and manage their parking locations.

## Project Structure
The project is organized into several directories, each serving a specific purpose:

- **src**: Contains the main application code.
  - **App**: Contains commands and queries for handling application logic.
    - **Commands**: Includes command handlers for creating fleets, registering vehicles, and parking vehicles.
    - **Queries**: Includes query handlers for retrieving vehicle locations.
  - **Domain**: Contains the domain models and business logic.
    - **Fleet**: Represents the fleet of vehicles.
    - **Vehicle**: Represents individual vehicles.
    - **Location**: Represents geographical locations.
    - **User**: Represents application users.
    - **Exceptions**: Contains custom exceptions for error handling.
  - **Infra**: Contains infrastructure-related code.
    - **Persistence**: Includes repositories for data storage (both in-memory and database).
    - **CLI**: Contains command-line interface logic for interacting with the application.

- **features**: Contains feature files for Behavior Driven Development (BDD) scenarios.
- **tests**: Contains test definitions and support files for BDD testing.
- **package.json**: Configuration file for npm, listing dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file specifying compiler options.
- **README.md**: Documentation for the project.

## Getting Started
To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd fleet-management
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Compile the TypeScript code:
   ```
   npm run build
   ```

4. Run the application:
   ```
   npm start
   ```

## Commands
The application provides a command-line interface with the following commands:

- `./fleet create <userId>`: Creates a new fleet and returns the fleet ID.
- `./fleet register-vehicle <fleetId> <vehiclePlateNumber>`: Registers a vehicle to the specified fleet.
- `./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]`: Localizes a vehicle in the specified fleet at the given coordinates.

## Testing
The project includes BDD tests for vehicle registration and parking features. To run the tests, use the following command:
```
npm test
```

## Code Quality
For maintaining code quality, consider using tools such as ESLint for linting and Prettier for code formatting. Setting up a CI/CD process can help automate testing and deployment.

## Conclusion
This project serves as a comprehensive solution for managing a fleet of vehicles, utilizing modern software design principles to ensure maintainability and scalability.