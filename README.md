# Wishlist Overview
Wish list is a web app that users can access and add some products they want to buy.
This project is to show my skills in back-end and also front-end when applying for the web developer position.

# Project Structure
This project includes 2 parts:
- Back-end (wishlist-be folder):
    + Framework: NestJS
    + Database: MongoDB
    + Cloud Storage: Firebase Storage

- Front-end (wishlist-fe folder):
    + Framework: NextJS App Router
    + Styling with CSS and TailwindCSS

Environment to start project:
- Node version: 18.17.0

# Project Features:
- Back-end:
    + Authentication: Register, Login, Verify Access Token
    + Product: Create, Update, Delete, Get Many (Pagination), Get One
    + File Storage: Upload File to Firebase, Delete File
    
- Front-end:
    + Register
    + Login with email and access token
    + View wishlist and filter data
    + Create, Update, Delete Product

# Getting Back-end Started
You need to run back-end first with these commands:
```bash
cd wishlist-be

yarn install

#Run the project with build mode
yarn build
yarn start

#Or you can run the project with dev mode
yarn start:dev
```
Back-end url: http://localhost:8000/v1

# Getting Front-end Started
```bash
cd wishlist-fe

yarn install

#Run the project with build mode
yarn build
yarn start

#Or you can run the project with dev mode
yarn dev
```
Note: You can use npm instead yarn

Front-end url: http://localhost:3000

# Access Wishlist page
The first, you have to access this link through your browser: http://localhost:3000. You will be moved to Login page. 
At here, you can use this account to login Wishlist page, it has already data to test:
- Email: admin@gmail.com
- Password: 123456

Or you can switch to register page to create new account with some basic information.
