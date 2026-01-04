# Real-Time Car Bidding Application

This is a full-stack real-time car auction (bidding) web application.
Users can participate in live car auctions, place bids in real time, and the highest bidder automatically wins the auction when it ends.

This project is built to understand real-world backend logic, authentication, and auction flow.

---

## Project Overview

The application allows users to:
- Register and log in securely
- View live car auctions
- Place bids in real time
- Automatically determine the auction winner based on highest bid
- View auctions they have won on their profile page

Auctions are time-based and end automatically without any manual intervention.

---

## Features

### User Features
- User registration and login
- Secure authentication using JWT
- View profile details
- Participate in live auctions
- Place bids with validation
- View auctions won by the user
- See auction details such as:
  - Car name
  - Start price
  - Final bid price
  - Total bids
  - Auction start time
  - Auction end time
  - Total amount to pay

### Auction Features
- Admin can create car auctions
- Auction has start time and end time
- Bids must be higher than the current bid
- Auction ends automatically when end time is reached
- Highest bidder is saved as winner
- Final price is stored in database
- Auction status changes automatically (live, sold, expired)

---

## Tech Stack

### Frontend
- React JS
- React Router
- Axios
- Context API
- CSS (Responsive Design)

### Backend
- Node JS
- Express JS
- MongoDB
- Mongoose
- JWT Authentication
- Cookies (httpOnly)
- Socket.io (for real-time bidding)

---

## Auction Flow (Step by Step)

1. Admin creates a car auction with:
   - Starting price
   - Auction start time
   - Auction end time

2. When the auction becomes live:
   - Users can place bids
   - Bid amount must be greater than current bid plus minimum increment

3. Backend validates:
   - Auction is live
   - Auction has not ended
   - Bid amount is valid

4. Each valid bid:
   - Updates current bid
   - Updates highest bidder
   - Increases total bid count
   - Broadcasts updated bid to all connected users

5. When auction end time is reached:
   - Auction stops automatically
   - Winner is decided
   - Final price is saved
   - Status becomes "sold"

---

## Authentication

- JWT token is generated on login
- Token is stored in httpOnly cookie
- Protected routes use authentication middleware
- Frontend sends requests using:
  withCredentials: true

---

## What I Learned From This Project
- Designing a real-time auction system
- Handling concurrent bids safely
- Implementing JWT authentication using cookies
- Protecting routes using middleware
- Managing auction lifecycle automatically
- Working with MongoDB relationships
- Using date and time logic for auctions
- Integrating frontend and backend properly
- Building responsive tables for real data
- Understanding full-stack application flow

 ## Future Improvements
- Admin dashboard for managing auctions
- Online payment integration
- Notification system for bid updates
- Better error handling and logging
- Auction history and analytics
- Deployment to production environment

## How to Run This Project (Step by Step)
### 1. Clone the Repository
#git clone https://github.com/erniteshsingh/Real-Time-Bidding
-Create a `.env` file in backend folder and add:
-PORT=3000
-MONGO_URI=your_mongodb_connection_string
-JWT_SECRET=your_jwt_secret

## Author
Nitesh Singh
