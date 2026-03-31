# Buyer Portal

This project is a full-stack web application for property buyers, featuring user authentication, property listings, and the ability to save favourites.

## Environment Variables

Before running the application, you must set the following environment variables in the appropriate `.env` files:

### Backend (`backend/.env`)

- MONGO_URI
- FRONTEND_URL
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- PORT
- SALT_ROUNDS
- JWT_SECRET
- NODE_ENV

### Frontend (`frontend/.env`)

- VITE_API_BASE_URL

---

## How to Run the App

### Prerequisites

- Node.js (v16 or above recommended)
- npm (comes with Node.js)

### 1. Clone the Repository

```
git clone https://github.com/sumankarkii897/buyer_portal.git
cd buyer_portal
```

### 2. Install Dependencies

#### Backend

```
cd backend
npm install
```

#### Frontend

```
cd ../frontend
npm install
```

### 3. Start the Application

#### Backend (API Server)

```
cd backend
npm run dev
```

#### Frontend (React App)

```
cd ../frontend
npm run dev
```

- The backend will typically run on http://localhost:5000
- The frontend will typically run on http://localhost:5173

## Example Flows

### 1. Sign Up → Login → Add Favourite

1. Open the frontend in your browser.
2. Register a new account using the Sign Up page.
3. Log in with your new credentials.
4. Browse property listings on the Home or Dashboard page.
5. Click to add a property to your favourites.
6. View your favourites on the Favourites page.

### 2. Login → View Profile

1. Log in with your account.
2. Click on your profile to view and update your information.

### 3. Logout

1. Click the logout button in the navigation bar to end your session.

## Notes

- Ensure the backend server is running before using the frontend.
- Update API URLs in the frontend if you change backend ports or host.

