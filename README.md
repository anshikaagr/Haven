# 🏠 Haven — Always know where it is.

A full-stack digital document management application to store, organize, and manage important documents in one centralized platform.

---

## 📌 About

**Haven** is a full-stack digital document management application designed to help users store, organize, and manage their important documents in one centralized platform.

Instead of keeping documents scattered across different devices and folders, Haven provides an organized space where users can upload files, categorize them, mark important documents, search their collection, and track expiry dates.

The application features a modern dark-themed interface, JWT-based authentication, and cloud-based file storage.

## ✨ Features

* 🔐 **User Authentication** – User registration and login using JWT authentication and password hashing.
* 📤 **Document Upload** – Upload and store documents using Cloudinary.
* 📁 **Document Organization** – Categorize documents for easier management.
* ⭐ **Important Documents** – Mark frequently accessed documents as important.
* 🔍 **Search Functionality** – Quickly find documents using search.
* 📅 **Expiry Tracking** – Organize documents into expired, expiring soon, and valid categories.
* 👁️ **Document Viewing** – Open uploaded documents.
* 📥 **Document Download** – Download stored documents.
* ✏️ **Document Editing** – Update document information.
* 🗑️ **Document Deletion** – Remove documents when no longer needed.
* 📊 **Dashboard** – Get an overview of your document collection.
* ⚙️ **Settings** – Access account and application information.

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)
* bcryptjs
* Multer

### Cloud Services

* **MongoDB Atlas** – Cloud database hosting.
* **Cloudinary** – Cloud-based document file storage.

### Deployment & Version Control

* **Render** – Frontend and backend hosting.
* **Git & GitHub** – Version control and source code management.

## 🏗️ Application Architecture

Haven follows a client-server architecture in which the frontend communicates with the backend through HTTP requests.

```text
                  USER
                    |
                    v
           React + Vite Frontend
                    |
                    | Axios / HTTP Requests
                    v
           Node.js + Express API
                    |
             +------+------+
             |             |
             v             v
        MongoDB Atlas   Cloudinary
             |             |
             v             v
     Document Metadata  Actual Files
             |
             v
        API Response
             |
             v
       React Interface
```

### 📤 How Document Upload Works

Haven uses a frontend-to-backend workflow to upload and store documents.

1. **File Selection:** The user selects a document through the upload interface.
2. **API Request:** The frontend sends the file and document details to the backend using `multipart/form-data`.
3. **File Handling:** Express receives the request, and Multer handles the uploaded file.
4. **Cloud Storage:** The backend uploads the file to Cloudinary.
5. **File Reference:** Cloudinary provides a file URL and identifier for the uploaded document.
6. **Database Storage:** Document information, such as name, category, expiry date, and file reference, is stored in MongoDB.
7. **Frontend Update:** The backend sends a response, and the frontend updates the document list to display the newly uploaded document.

**Note:** Cloudinary stores the actual document files, while MongoDB stores their associated metadata and file references.

## 📂 Project Structure

```text
Haven/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Getting Started

Follow these instructions to run Haven locally.

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB Atlas account or a MongoDB instance
* Cloudinary account

### 1. Clone the Repository

```bash
git clone https://github.com/anshikaagr/Haven.git
cd Haven
```

### 2. Set Up the Backend

Navigate to the server directory:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Replace the placeholder values with your own credentials.

**Important:** Never commit your `.env` file or expose your database credentials and API secrets publicly.

Start the backend:

```bash
node server.js
```

The backend will run locally on:

```text
http://localhost:5000
```

### 3. Set Up the Frontend

Open another terminal and navigate to the client directory:

```bash
cd client
npm install
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

**Note:** Configure the frontend API base URL in `client/src/api/api.js` to point to your local backend when running locally.

## 🔗 Deployment

Haven is deployed using Render.

| Component    | Deployment                                                   |
| ------------ | ------------------------------------------------------------ |
| Frontend     | [Haven Live Demo](https://haven-frontend-dbm6.onrender.com/) |
| Backend      | [Haven API](https://haven-ro2u.onrender.com/)                |
| Database     | MongoDB Atlas                                                |
| File Storage | Cloudinary                                                   |

## 🚀 Future Improvements

The following features can be considered for future versions of Haven:

* **Document Preview:** Add PDF and image previews within the application.
* **Advanced Filtering:** Introduce advanced document sorting and filtering options.
* **Email Notifications:** Send reminders for upcoming document expirations.
* **OCR Integration:** Extract text from uploaded documents using Optical Character Recognition.
* **Automatic Categorization:** Categorize documents automatically based on their content.
* **Improved Search:** Add more advanced document search capabilities.
* **Dashboard Analytics:** Provide additional insights into document collections and storage.
* **Mobile Responsiveness:** Further improve the experience across different screen sizes.

## 👩‍💻 Author

**Anshika Agrawal**

B.Tech – Computer Science and Engineering (Data Science)

* GitHub: [@anshikaagr](https://github.com/anshikaagr)

---

⭐ If you find this project interesting, consider giving the repository a star!
