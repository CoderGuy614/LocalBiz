# LocalBiz

LocalBiz is a full-stack application that connects users with local businesses and their products/services. The platform allows businesses to showcase their offerings and users to discover local shops and services.

## Project Structure

This repository contains both frontend and backend code:

- `/client/` - React frontend application
- `/localbiz-backend/` - Node.js/Express backend API
- Root level files for development and deployment configuration

## Technologies

### Frontend
- React
- React Router
- Axios
- Bootstrap/SCSS
- Context API for state management

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Cloudinary for image storage

## Setup for Development

1. Clone the repository
   ```
   git clone https://github.com/yourusername/LocalBiz.git
   cd LocalBiz
   ```

2. Install dependencies for both frontend and backend
   ```
   npm install
   cd client && npm install
   cd ../localbiz-backend && npm install
   cd ..
   ```

3. Set up environment variables
   - Create a `.env` file in the client directory
   - Create a `.env` file in the localbiz-backend directory

4. Run the development servers concurrently
   ```
   npm run dev
   ```

## Deployment

The application is deployed in two parts:

### Backend API
- Deployed on AWS App Runner
- URL: https://r5wa3jwp5s.us-east-1.awsapprunner.com
- See `/localbiz-backend/README.md` for more details

### Frontend Client
- Deployed on AWS Amplify
- URL: https://master.d28l3w9jtysc89.amplifyapp.com
- See `/client/README.md` for more details

## Scripts

- `npm run server` - Run the backend server with nodemon
- `npm run client` - Run the frontend client
- `npm run dev` - Run both frontend and backend concurrently

## Environment Variables

### Root/Backend
- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

### Frontend
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_GOOGLE_MAPS_API_KEY` - Google Maps API key

## Security Notes

- Never commit sensitive information like API keys or credentials
- Use environment variables for all sensitive data
- The backend uses JWT for authentication
- CORS is configured to allow requests only from specified origins

## Future Enhancements

- Add search functionality
- Implement ratings and reviews
- Add payment processing for online orders
- Enhance admin dashboard
- Add analytics for business owners