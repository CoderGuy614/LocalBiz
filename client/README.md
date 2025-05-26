# LocalBiz Frontend

Frontend client for the LocalBiz application, a platform connecting users with local businesses and their products/services.

## Technologies

- React
- React Router
- Axios
- Bootstrap/SCSS
- Context API for state management

## Features

- User authentication (signup, login, logout)
- Business listings with filtering options
- Business profiles with hours, location, and contact information
- Product/service listings for each business
- User messaging system
- Interactive maps for business locations
- Responsive design for mobile and desktop

## Setup

1. Clone the repository
   ```
   git clone https://github.com/yourusername/localbiz-client.git
   cd localbiz-client
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with:
   ```
   REACT_APP_API_URL=https://r5wa3jwp5s.us-east-1.awsapprunner.com
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. Run the development server
   ```
   npm start
   ```

5. Build for production
   ```
   npm run build
   ```

## Project Structure

- `/src/components/` - React components
  - `/core/` - Core components (Layout, Navigation, etc.)
  - `/auth/` - Authentication components
  - `/user/` - User dashboard components
  - `/admin/` - Admin components
- `/src/context/` - Context API for state management
- `/src/auth/` - Authentication utilities
- `/src/scss/` - SCSS styles

## API Integration

The frontend connects to the LocalBiz backend API. API base URL configuration is in `src/config/axios.js`.

## Deployment

This frontend is deployed on AWS Amplify at:
https://master.d28l3w9jtysc89.amplifyapp.com

## Development

To run both frontend and backend concurrently (from root directory):

```
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request