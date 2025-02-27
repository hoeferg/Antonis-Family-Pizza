# Antonis Family Pizza - Full Stack Pizza Management App

## Features
- **Manage Toppings:** Add, view, update, and delete pizza toppings.
- **Manage Pizzas:** Create pizzas with toppings, view existing pizzas, and delete them.
- **Persistent Data Storage:** Uses MongoDB for storing pizzas and toppings.
- **REST API:** Express-based API to handle requests.
- **Frontend:** Built with React and TailwindCSS.

---

## Installation & Setup (Run Locally)

### Clone the Repository

git clone https://github.com/hoeferg/Antonis-Family-Pizza
cd Antonis-Family-Pizza

### Setup & Run Backend (Express + MongoDB)

1. Prerequisites
Install Node.js (https://nodejs.org/)
Install MongoDB (or use MongoDB Atlas)

2. Backend Setup
Navigate to the backend directory:
cd server

3. Install dependencies:
npm install

4. Create a .env file in the server directory and add:
MONGO_URI=your-mongodb-connection-string
PORT=5000

If everything works, you should see:
MongoDB Connected
Server running on port 5000

### Setup & Run Frontend (React)
Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
cd client
2. Install dependencies:
npm install
3. Start the React development server:
npm start


##  How to Use the App
1. Open http://localhost:3000.
2. Go to the "Toppings" page:
    Add, delete, or update available pizza toppings.
3. Go to the "Pizzas" page:
    Create a pizza by selecting a name and toppings.
    View the list of created pizzas.
    Delete pizzas if needed.

## API Endpoints (For Testing)
If you want to test the backend with Postman or cURL, use these API endpoints:

Toppings API

Method	  Endpoint	          Description
GET	      /api/toppings	      Get all toppings
POST	  /api/toppings	      Add a new topping
DELETE	  /api/toppings/:id	  Delete a topping

Pizzas API

Method	  Endpoint	        Description
GET	      /api/pizzas	    Get all pizzas
POST	  /api/pizzas	    Add a new pizza
DELETE	  /api/pizzas/:id   Delete a pizza

## Troubleshooting
Port Already in Use
If you see an error EADDRINUSE: port already in use, stop any existing server using:
npx kill-port 5000
or restart with a different port:
PORT=5001 npm run dev

MongoDB Connection Issues
Ensure MongoDB is running locally (mongod command) OR use a MongoDB Atlas cloud database.
Double-check your .env file for a correct MONGO_URI.

Frontend Not Starting on Port 3000
Ensure nothing is already running on port 3000.
Try: npm start -- --port 3001

##  Deployment Guide
To deploy the application, use:

Frontend: Vercel / Netlify
Backend: Render / Fly.io / Railway

## License
This project is licensed under the MIT License.

