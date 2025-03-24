# DriveWise Backend

A Node.js backend application for vehicle maintenance tracking and management.

## Overview

DriveWise is a comprehensive vehicle maintenance tracking system that helps users monitor and manage their vehicle's service history, maintenance schedules, and component health. The application provides APIs for user authentication, vehicle management, and service record tracking.

## Project Structure

```
DRIVEWISE_BACKEND_NODEJS/
├── node_modules/          # Dependencies
├── src/                   # Source code
│   ├── config/            # Configuration files
│   │   ├── db.js          # Database configuration
│   │   └── mailerConfig.js # Email service configuration
│   ├── controllers/       # Request handlers
│   │   ├── authController.js # Authentication controller
│   │   └── userController.js # User management controller
│   ├── middleware/        # Middleware functions
│   │   ├── authMiddleware.js # Authentication middleware
│   │   └── errorHandler.js   # Error handling middleware
│   ├── models/            # Database models
│   │   ├── AirFilter.js      # Air filter model
│   │   ├── BrakeOil.js       # Brake oil model
│   │   ├── Coolant.js        # Coolant model
│   │   ├── EngineOil.js      # Engine oil model
│   │   ├── OilFilter.js      # Oil filter model
│   │   ├── recordsave.js     # Record saving utilities
│   │   ├── ServiceRecords.js # Service records model
│   │   ├── TransmissionOil.js # Transmission oil model
│   │   ├── user.js           # User model
│   │   ├── userProfile.js    # User profile model
│   │   ├── userVehicle.js    # User vehicle model
│   │   └── Vehicle.js        # Vehicle model
│   ├── routes/            # API routes
│   │   ├── authRoutes.js     # Authentication routes
│   │   ├── routes.js         # Main routes
│   │   └── userRoutes.js     # User-specific routes
│   └── uploads/           # Storage for uploaded files
│       └── index.js       # Upload handling
├── .env                   # Environment variables
├── DriveWise_Backend_NodeJs.lnk # Shortcut file
├── package-lock.json      # Dependency lock file
├── package.json           # Project metadata and dependencies
└── README.md             # Project documentation
```



## Features

- *User Authentication:* Secure signup, login, and session management
- *User Profiles:* Manage user information and preferences
- *Vehicle Management:* Add, edit, and delete vehicles
- *Maintenance Tracking:* Record and monitor:
  - Engine oil changes
  - Oil filter replacements
  - Air filter replacements
  - Brake oil maintenance
  - Coolant levels and changes
  - Transmission oil service
- *Service Records:* Comprehensive history of all vehicle maintenance
- *API Integration:* RESTful endpoints for all functionality

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (v4.x or higher)

### Installation

1. Clone the repository:
   
   git clone https://github.com/dula089/DriveWise_Backend_NodeJs.git
   cd DriveWise_Backend_NodeJs
   

2. Install dependencies:
   
   npm install
   

3. Configure environment variables:
   Create a .env file in the root directory with the following variables:
   
  - PORT=5000
  - MONGODB_URI=mongodb://localhost:27017/drivewise
  - JWT_SECRET=your_jwt_secret_key
  

4. Start the server:
   
   npm start
   
# API Documentation

### Authentication Routes (authRoutes.js)
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and receive authentication token
- POST /api/auth/logout - Logout user (protected route)
- GET /api/auth/protected-route - Verify authentication token
- POST /api/auth/change-password - Change user password (protected route)

### User Management Routes (userRoutes.js)
- GET /api/users/profile - Get user profile (protected route)
- POST /api/users/profile/update - Update user profile (protected route)
- POST /api/users/upload-profile-image - Upload profile image (protected route)

### Vehicle and Maintenance Routes (routes.js)
- GET /api/makes - Get all vehicle makes
- GET /api/models/:make - Get models for a selected make
- GET /api/engines/:make/:model - Get engine types for a selected model
- GET /api/years/:make/:model/:engine - Get years for a selected make, model, and engine type
- POST /api/addVehicle - Add vehicle to user's profile
- DELETE /api/removeUserVehicle - Remove vehicle from user's profile
- GET /api/vehicles/:userId - Get all vehicles for a specific user
- PUT /api/updateMileage - Update vehicle mileage
- POST /api/maintenance - Add new maintenance record
- PUT /api/vehicles/expiry/:vehicleId - Update vehicle expiry dates (license, insurance, emissions)
- GET /api/products - Get products by category (engine_oil, transmission_oil, brake_oil, air_filter)
- GET /api/vehicleSpecs/:make/:model/:year/:engine - Get specifications for a specific vehicle

## Technologies

- *Runtime:* Node.js
- *Framework:* Express.js
- *Database:* MongoDB
- *Authentication:* JWT (JSON Web Tokens)
- *Email Service:* Nodemailer

## Contributing

1. Fork the repository
2. Create your feature branch: git checkout -b feature/amazing-feature
3. Commit your changes: git commit -m 'Add some amazing feature'
4. Push to the branch: git push origin feature/amazing-feature
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Contact

## Official Channels
- *Website*: [www.drivewiselk.com](https://www.drivewiselk.com/)
- *Email*: [Not specified in the code]

## Social Media
- *Instagram*: [@_drivewise_](https://www.instagram.com/__drivewise__)
- *Facebook*: [DriveWise](https://www.facebook.com/share/162b7jrFa2/?mibextid=wwXIfr)
- *LinkedIn*: [DriveWise LK](https://www.linkedin.com/company/drivewise-lk)

## GitHub Repository
Project Link: [https://github.com/dula089/DriveWise_Backend_NodeJs.git](https://github.com/dula089/DriveWise_Backend_NodeJs.git)

## Feedback
Users can provide feedback through our application or via any of the contact channels listed above.
