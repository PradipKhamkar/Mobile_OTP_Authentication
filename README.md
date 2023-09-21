# 📱 MERN Stack Mobile OTP Authentication Project

This project is a Mobile OTP Authentication system developed using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to register, login, and view their profile details, incorporating security features like JWT token authentication, bcrypt for password hashing, Twilio for OTP verification, Ipinfo api for user geolocation and Cloudinary for storing images.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
- [Usage](#usage)
- [Technologies](#technologies)

## Features

- 📝 User Registration: Users can create accounts with their email, phone number, and password etc.
- 🔑 User Login: Registered users can log in using their phone number and password.
- 🔐 OTP Verification: Secure one-time password (OTP) verification via Twilio for added account security.
- 📋 Profile Management: Users can view profile including a profile picture stored on Cloudinary.
- 🔒 JWT Authentication: JSON Web Tokens are used for secure user authentication and authorization.
- 🔐 Password Security: User passwords are hashed using bcrypt to protect sensitive data.
- 🌐 Geolocation : Fetching IP address data for getting user location data

## Prerequisites

Before you begin, ensure you have met the following requirements:

- 🚀 Node.js and npm (Node Package Manager) installed.
- 📦 MongoDB database for storing user data.
- 📲 Twilio account and credentials for OTP verification.
- ☁️ Cloudinary account for image storage.
- 🗺 IPinfo access token for IP address data

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/PradipKhamkar/Mobile_OTP_Authentication
   ```

2. Change into the project directory:

   ```bash
   cd Mobile_OTP_Authentication
   ```

3. Install server dependencies:

   ```bash
   npm install
   ```

4. Install client dependencies:

   ```bash
   cd client
   npm install
   ```

## Configuration

1. Create a `.env` file in the `root` directory with the following environment variables:

   ```env
   MONGODB_URI=your_mongodb_uri
   IP_INFO_TOKEN = your_ip_info_token
   TWILIO_ACCOUNT_SID = your_twilio_account_sid,
   TWILIO_ACCOUNT_TOKEN = your_twilio_account_token
   TWILIO_SERVICE_ID = your_twilio_service_id
   JWT_KEY =  jwt_key,
   CLOUD_NAME = your_cloudinary_cloud_name
   CLOUD_API_KEY =  your_cloudinary_api_key
   CLOUD_API_SECRET_KEY =  your_cloudinary_api_secret
   ```

## Endpoints

The following are the API endpoints available in this project:

- 🌐 **POST /api/user/register/sendotp**: Sending OTP.
- 🌐 **POST /api/user/verify/register**: Verify OTP And Register.
- 🌐 **POST /api/user/resentotp**: Resent OTP.
- 🌐 **GET /api/user/login**: Login.
- 🌐 **PUT /api/user/getloggeduser**: Getting currently logged user.
- 🌐 **GET /api/user/logout**: Logout currently logged user.

## Usage

1. Start the server:

   ```bash
   npm run dev
   ```

2. Start the client:

   ```bash
   cd client
   npm start
   ```

3. Access the application in your web browser at `http://localhost:3000`.

## Technologies

- 📦 **MongoDB**: A NoSQL database for storing user data.
- ⚙️ **Express.js**: A web application framework for Node.js.
- ⚛️ **React**: A JavaScript library for building user interfaces.
- 🚀 **Node.js**: A JavaScript runtime for server-side development.
- 🔑 **JWT**: JSON Web Tokens for user authentication.
- 🔒 **bcrypt**: A library for hashing user passwords.
- 📲 **Twilio**: A cloud communications platform for OTP verification.
- ☁️ **Cloudinary**: A cloud-based image and video management service.
- 🗺 **IPinfo API**: The trusted source for IP address data

## Acknowledgments 🙏

Thanks to Twilio, Cloudinary, and Ipinfo for providing their amazing services for this project.
Special thanks to the MERN Stack and TypeScript communities.

Happy coding! 👩‍💻👨‍💻
