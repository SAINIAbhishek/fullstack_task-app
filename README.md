# FullStack Task Application [![Fullstack Tasks Application Pipeline](https://github.com/SAINIAbhishek/fullstack_task-app/actions/workflows/ci.yml/badge.svg)](https://github.com/SAINIAbhishek/fullstack_task-app/actions/workflows/ci.yml)

The purpose of this project is to demonstrate a fully functional FullStack Task Application with a focus on security. The client-side, or frontend component, is developed using React.js, while the server-side, or backend component, is built using Node.js.

![Signin page](signin.png)
![Register page](register.png)
![Home page](home.png)

---

## Frontend (React + TypeScript + Vite + Tailwind CSS)

The project's organization follows industry standards, employing a feature-based directory structure and maintaining a consistent naming convention.

The application uses the Context API and Hooks for effective state management.

### Stacks

- TypeScript
- Formik
- React Query
- Axios
- React cookie
- Yup
- Tailwind CSS
- React Router Dom
- Eslint
- Prettier
- React i18next
- Docker image ([Frontend Image](https://hub.docker.com/r/sainiabhishek/fullstack_task-frontend))

### How to Setup the Frontend

- Clone the project and navigate to the frontend directory in your terminal.
- Run the following command to install all necessary dependencies:

```bash
npm run install:packages
```

- Duplicate the `.env.example` file and rename the copy to `.env`. Modify the variables as needed.

### How to Run the Frontend

- After installing the dependencies, you can either:
  - Go to the `package.json` file and click on the play button next to the `dev` script under the "scripts" section.
  - Or, run the following command in your terminal:

```bash
npm run dev
```

---

## Backend (Node + Express + Winston + TypeScript + JWT)

The backend API for the tasks project is designed with various environments in mind. The project structure adheres to best practices and conventions for Node.js applications.

### Features

- **TypeScript:** Enhances development with static typing, leading to more reliable and maintainable code.
- **Request Limiter:** Prevents abuse or overload of routes by limiting request rates, enhancing security.
- **Centralized Error Handling:** Streamlines error management and maintains a consistent user experience.
- **API Versioning:** Organizes routes and ensures compatibility, preventing breaking changes for existing clients.
- **Role-Based Access Control:** Provides fine-grained access management based on user roles.
- **JWT Authentication:** Secures user authentication and authorization using JSON Web Tokens.
- **Password Reset via Email:** Enhances account security and recovery options through email notifications.
- **MongoDB with Mongoose:** Utilizes MongoDB for its speed and scalability, with Mongoose simplifying database interactions.
- **ESLint:** Enforces coding standards and best practices for improved code quality.
- **Prettier:** Formats code consistently according to predefined rules.
- **Cookies for Tokens:** Uses cookies to store tokens securely, improving authentication and session management.
- **Logging:** Utilizes Winston for robust and flexible logging, aiding in debugging and monitoring.
- **Middleware for Exception Handling:** Improves error management within async Express routes.

### API Stacks

- Node.js
- Express.js
- Typescript
- Mongoose
- MongoDb
- Joi
- JWT
- Cookies
- Winston
- Rate Limiter
- Roles
- Nodemailer
- Docker image ([API Image](https://hub.docker.com/r/sainiabhishek/fullstack_task-api))

### Setup MAILTRAP

To test email functionality, use Mailtrap: [Mailtrap](https://mailtrap.io/). Create your credentials and place them in the `.env` file under **Mailtrap (Email Service) Info**.

### How to Setup the Backend

- Clone the project and navigate to the server directory in your terminal.
- Run the following command to install all necessary dependencies:

```bash
npm run install:packages
```

- Duplicate the `.env.example` file and save the copy as `.env` in the server directory. Modify the variables as needed.

### How to Run the Backend

- After installing the dependencies, you can either:
  - Go to the `package.json` file of the server and click on the play button next to the `watch` script under the "scripts" section.
  - Or, run the following command in your terminal:

```bash
npm run watch
```

### Access the API

```bash
http://localhost:3001/api/v1/
```

### Generating Secrets

- To generate a secret token and refresh token for the `.env` file, open your terminal and run:

```bash
node
```

- Then, in the Node.js REPL:

```bash
require('crypto').randomBytes(64).toString('hex')
```

### Running the Project with Docker Compose

- Ensure Docker is installed on your computer.
- Navigate to each directory where a `.env.example` file is present. Copy or rename the `.env.example` file to `.env`, and fill in the required values based on your environment.
- Open your terminal and navigate to the root directory of your project.
- Run the following command:

```bash
docker-compose up -d
```

This command will fetch all necessary libraries and dependencies, set up the environment, and start the services as defined in your docker-compose.yml file. Follow any additional setup or configuration instructions provided in the README file.

## GitHub Actions

The project uses GitHub Actions for Continuous Integration (CI). The CI pipeline is defined in the `.github/workflows/ci.yml` file. It ensures that the code is built, tested, and validated automatically on each push and pull request.

### CI Workflow

The workflow performs the following steps:

**Checkout Code**: Retrieves the latest code from the repository.
**Set Up Node.js**: Installs the specified Node.js version.
**Install Dependencies**: Installs all project dependencies.
**Run Tests**: Executes tests using Vitest.
**Build Application**: Builds the frontend and backend components (if applicable).

### Configuration

You can view and manage the CI configuration in the `.github/workflows/ci.yml` file. The pipeline is configured to stop and exit if any step fails, ensuring that issues are addressed promptly.

For more details, visit the [GitHub Actions page](https://github.com/SAINIAbhishek/fullstack_task-app/actions)
