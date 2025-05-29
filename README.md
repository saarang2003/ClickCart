ClickArt - eCommerce Platform
ClickArt is a full-featured eCommerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to browse products by categories and brands, make orders, and pay securely through PayPal. The platform includes a live admin dashboard for managing products, orders, and users, with image upload functionality powered by Cloudinary and state management handled by Redux.
Features

Product Browsing: Explore products by categories and brands with a user-friendly interface.
Order Management: Add products to the cart, place orders, and track order status.
Payment Integration: Secure payments via PayPal.
Admin Dashboard: Real-time dashboard for admins to manage products, orders, and users.
Image Uploads: Upload and manage product images using Cloudinary.
State Management: Efficient state management with Redux for seamless user experience.
Responsive Design: Optimized for both desktop and mobile devices.

Technologies Used

Frontend: React, Redux, HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
Image Storage: Cloudinary
Payment Gateway: PayPal
Others: Axios (API requests), JWT (authentication), bcrypt (password hashing)

Prerequisites
Before setting up the project, ensure you have the following installed:

Node.js (v16 or higher)
MongoDB (local or MongoDB Atlas)
Git
Cloudinary account
PayPal developer account

Installation

Clone the Repository:
git clone https://github.com/your-username/clickart.git
cd clickart


Install Dependencies:

For the backend:cd backend
npm install


For the frontend:cd ../frontend
npm install




Environment Variables:

Create a .env file in the backend directory and add the following:MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
NODE_ENV=development




Run the Application:

Start the backend server:cd backend
npm start


Start the frontend:cd frontend
npm start


The app should now be running at http://localhost:3000 (frontend) and http://localhost:5000 (backend).



Project Structure
clickart/
├── backend/                 # Express.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route handlers
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   └── middleware/         # Authentication and error handling
├── frontend/                # React frontend
│   ├── src/                # React components, Redux store
│   ├── public/             # Static assets
│   └── redux/              # Redux slices and store
└── README.md

Usage

User Features:
Browse products by category or brand.
Add items to the cart and proceed to checkout.
Pay securely using PayPal.


Admin Features:
Log in to the admin dashboard.
Manage products (add, update, delete).
Upload product images via Cloudinary.
View and update order statuses.
Manage user accounts.



API Endpoints
Some key API endpoints include:

GET /api/products - Fetch all products
POST /api/orders - Create a new order
POST /api/upload - Upload product images to Cloudinary
GET /api/admin/orders - Fetch all orders (admin only)

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For questions or feedback, reach out to your-email@example.com.
