# Task Manager – Server-side Logic

This app is responsible for serving data for Task Manager client.

---

## 📋 General Info

| | |
|---|---|
| **Environment** | NodeJS |
| **Framework** | NestJS v12.01 |
| **Real-time communication** | Socket.io v4.8.4 |

## 🚀 To Launch the Application

1. Pull repo.
2. Run `npm i` to install all dependencies.
3. Create a `.env` file in the root, and copy the followings (mongo connection/default port):

   ```env
   MONGODB_CONNECTION=#secret
   PORT=3000
   ```

   > Though the mongo cluster has been created just for this project, I won't publish it here. If need access, contact me!

4. Run `npm run start`.
5. Enjoy!

---

## 🗄️ Database & User Management

The data is stored in MongoDB, which can be accessed with mongo client from service.

As user data is neither stored in DB nor registration is needed, every pre-defined mocked user can be found in `src/mocked.users.ts`.

---

## 🤖 AI Disclosure

Code is written without AI, but AI helped me in the followings:

- Generating database content in JSON, which I could import into DB Collection with MongoDB Compass.
- Configuring the Socket gateway.
- Styling this beautiful README.
