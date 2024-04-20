## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

## Prerequisites

Before running this project, make sure you have the following installed and set up:

* Ganache: Download and run Ganache. Ganache provides a local Ethereum blockchain for development purposes. You can download it from here.
* Environment Variables: Create a .env file in the root directory of your project. Add the following environment variables to the file:
  * MONGODB_URI: Your MongoDB connection URI.
  * TOKEN_SECRET: A secret key for JWT token generation.
  * EMAIL_USER: Your email address for sending emails.
  * EMAIL_PASS: Your email password.
* Mailtrap: This project uses Mailtrap for email testing. Sign up for Mailtrap and obtain your SMTP credentials. You can sign up here.
