# Hiring Full-Stack Developer Challenge

## Step 1: Planning and Tests
* **Objective**: Write BDD/Gherkin tests before implementing the code.
* **Questions to ask yourself**:
   * How many entities do I have?
      * **Answer**: 3 or 4 entities like User, Fleet, Vehicle, Location.
   * How many commands and queries?
      * **Answer**:
         * 3 commands: `createFleet`, `registerVehicle`, `localizeVehicle`.
         * 1 query: `getVehicleLocation`.

## Step 2: Implementation
* **Objective**: Write the code for the commands and queries.
* **Note**: This step take me quite time, especially due to Gluegun issues.

## Step 3: Code Quality and CI/CD
* **Code quality tools**:
   * **Biome**: Used for formatting and linting the code.
* **Setting up a CI/CD process**:
   * **Description**: To implement an effective CI/CD pipeline for this project:
      1. **Configure a 5-stage pipeline**:
         * **Code Quality**: Run Biome for linting and formatting.
         * **Testing**: Execute unit tests (Jest) and BDD tests (Cucumber).
         * **Build**: Compile TypeScript and verify the build integrity.
         * **Integration Testing**: Initialize the database with Docker and verify system integrity.
         * **Deployment**: Automatic to staging, manual approval for production.
      2. **Security Measures**:
         * Dependency vulnerability scanning with `npm audit`.
         * Static code analysis.
         * Automated security testing.
      3. **Infrastructure as Code**:
         * Containerization with Docker.
         * Orchestration with Kubernetes or Docker Compose.
         * Environment configuration with infrastructure provisioning tools.
      4. **Post-deployment Monitoring**:
         * Application metrics tracking.
         * Regression alerts.
         * Automatic rollback on failure.