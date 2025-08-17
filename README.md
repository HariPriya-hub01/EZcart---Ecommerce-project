# EZCart 🛒

EZCart is a modern, full-stack e-commerce web application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It provides a seamless shopping experience with features like product browsing, cart management, user authentication and Stripe-powered payments.

---


## 🖼️ Screenshots

### Home Page

![ezcart1](https://github.com/user-attachments/assets/593ef043-ae79-476d-899f-764336443cfe)


### Product Listing

![ezcart2](https://github.com/user-attachments/assets/d4927dc0-c0a3-4732-9c68-93a47c8daef2)


### Cart & Checkout

![ezcart5](https://github.com/user-attachments/assets/46a96dc0-a978-4d8f-b64b-f94092ba06dd)

&#x20;

### Login page
![ezcart3](https://github.com/user-attachments/assets/ab0b7e03-c740-43bf-9968-b85f792f7359)


### Admin Dashboard
![ezcart4](https://github.com/user-attachments/assets/f2033d57-9c30-47ba-8f3f-6008108b7a9b)


### Order details
![ezcart6](https://github.com/user-attachments/assets/5ad2a6c0-e6ea-4b32-b87d-92e14b67bf6a)

---

## 💻 Features

- **User Authentication:** Register, login, and manage your profile securely.
- **Product Browsing:** Browse a variety of products with detailed info.
- **Shopping Cart:** Add, remove, and update products in the cart.
- **Stripe Payments:** Secure checkout experience.
- **Admin Panel:** Manage products, orders, and users (for admin users).
- **Responsive Design:** Works on mobile, tablet, and desktop.
- **Dynamic UI:** Modern, interactive interface.

---

## 📝 How to Use

1. **Visit the website** or run locally.
2. **Sign up** or **log in**:
   - Use any email/password to register as a user.
   - Admin login: `admin@gmail.com` / `12345` (for demo purposes)
   - User login: `user@gmail.com` / `12345` (for demo purposes)
3. **Browse products**:
   - Click on a product to view details.
   - Add products to your cart.
4. **Checkout**:
   - Review your cart.
   - Proceed to payment using Stripe.
   - For card details: use card number `4242 4242 4242 4242` and any future date for expiry and any 3 digit random number (demo purposes)
5. **Admin Features**:
   - Admin can add/edit/delete products.
   - View all users, orders and manage them.

---

## 🛠️ Technologies Used

- **Frontend:** React, Redux, React-Bootstrap, MDBReact, CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **Payment Integration:** Stripe API
- **Deployment:** Render (Backend), Vercel (Frontend)
- **Other Tools:** Axios for API requests, dotenv for environment variables

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/HariPriya-hub01/EZcart---Ecommerce-project.git
cd EZCart
```

2. Install dependencies:

- **Backend:**

```bash
cd backend
npm install
```

- **Frontend:**

```bash
cd frontend
npm install
```

3. Create a `.env` file in both frontend and backend directories.

4. Start the development servers:

- **Backend:**

```bash
npm run server
```

- **Frontend:**

```bash
npm start
```

Visit `http://localhost:3000` to see the app.

---

## 📂 Folder Structure

```
EZCart/
├── backend/
│   ├── controllers/
|   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── app.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── actions/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── slices/
│   │   ├── app.css
│   │   ├── app.js
│   │   └── index.js
└── README.md
```

---

## 📚 Knowledge Gained

Through EZCart, I gained practical experience in:

- Building a full-stack web application using **MERN**.
- Implementing **user authentication** and secure session handling.
- Integrating **Stripe API** for payments.
- Managing state using **Redux**.
- Structuring a scalable, maintainable **full-stack project**.
- Deploying web applications on **Render** and **Vercel** (in progress)

---

## 👤 Author

**Hari Priya R**\
[Portfolio](https://hari-priya-portfolio.vercel.app/) | [LinkedIn](https://www.linkedin.com/in/haripriyaradhakrishnan/) | [GitHub](https://github.com/HariPriya-hub01)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
