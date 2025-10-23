UnityWorks Client (Frontend)

A React-based platform for discovering, creating, and joining social development events like road cleaning and tree plantations.

Live URL

Deployed at: https://unityworks-da908.web.app/

Features

Firebase Authentication (Email/Password & Google Login)

Route protection (Private & Public Routes)

Fully responsive layout for mobile, tablet, and desktop

Private Routes for creating, managing, and viewing joined events

Event search and filter using backend MongoDB query

Eye-friendly UI using TailwindCSS and DaisyUI

Date validation using react-datepicker

Theme toggler (Light/Dark mode)

Toast & Alert feedback (react-toastify, SweetAlert2)

Real-time Notifications via Socket.IO for event join updates

Blog System: Add, view, and sort blogs

Email Notifications: Sends confirmation emails when joining events

Pages & Routes
Public Routes:

/ - Home page (Banner, Features, Gallery, Newsletter)

/login - User Login

/register - User Registration

/upcoming-events - View all future events

/blogs - View all blogs

Private Routes:

/create-event - Form to create a new event

/view-event/:id - Single event details with join functionality

/joined-events - Events user has joined

/manage-events - Events created by the user

/add-blog - Form to add a blog post

Notifications Drawer in Navbar shows real-time updates for event joins

Tech Stack & Packages

React

React Router DOM

Firebase (Auth)

Axios

Tailwind CSS

DaisyUI

React-Toastify (Alerts)

SweetAlert2 (Success messages)

React Icons

React Datepicker (Date input validation)

Socket.IO Client (Real-time notifications)

Deployment Notes

Hosted on Firebase

Firebase config keys secured using .env.local file

Notifications, blog posts, and email sending rely on backend API at VITE_API_URL

Run Locally

1️⃣ Clone the repository:

git clone https://github.com/mdrahimultahsin/unityWorks-client.git
cd unityWorks-client


2️⃣ Install dependencies:

npm install


3️⃣ Set up environment variables:

Create a .env file in the root folder and add:

VITE_API_URL=https://collab-corner-server.vercel.app
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
# Add other Firebase keys as needed


4️⃣ Start the development server:

npm run dev


5️⃣ Build for production:

npm run build


Open: http://localhost:5173
 (default Vite port) or the URL shown in console.

✅ Additional Notes:

Notifications: Triggered in real-time when someone joins your event. Check the bell icon in the Navbar.

Blogs: Users can create blog posts and view all posts in the /blogs page.

Emails: When a user joins an event, a confirmation email is sent automatically using the backend mailer.