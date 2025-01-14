# 📝 Next.js Prisma Forms

A form builder application built with Next.js and Prisma, enabling users to configure forms, share them with others, and collect data seamlessly. Inspired by the functionality of Google Forms, this app is designed for simplicity, flexibility, and scalability.

---

## 🚀 Features

- **Dynamic Form Builder**: Create and customize forms with various input types.
- **Shareable Forms**: Generate shareable links for your forms.
- **Data Collection**: Collect and manage form submissions efficiently.
- **Real-time Results**: View responses in real-time.
- **Secure Storage**: Store form data securely using Prisma and a relational database.
- **Authentication**: User authentication for form creation and data access.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) - React-based framework for building server-side rendered and static web applications.
- **Database**: [Prisma](https://www.prisma.io/) - Type-safe database client for seamless database interaction.
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js.
- **Styling**: Tailwind CSS for responsive and modern UI design.
- **Deployment**: Vercel for fast and reliable hosting.

---

## 📦 Getting Started

### Prerequisites

- Node.js (>= 16.x)
- npm or yarn
- A relational database (PostgreSQL, MySQL, or SQLite recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:sahariardev/formBuilder.git
   cd formBuilder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database:**
   - Create a `.env` file in the root of your project.
   - Add the following environment variables:
     ```env
     POSTGRES_PRISMA_URL=your-database-connection-string
     CLERK_SECRET_KEY=your-nextauth-secret
     ```
   
4. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🧩 Project Structure

```
.
├── prisma/                # Prisma schema and migrations
├── public/                # Static assets
├── app/                   # Routes and business logic  
│
├── .env                   # Environment variables
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

---

## ⚙️ Usage

1. **Create a Form:**
   - Log in to your account.
   - Use the form builder interface to configure your form fields (text, multiple choice, checkboxes, etc.).

2. **Share the Form:**
   - Generate a unique link for your form and share it with others.

3. **View Responses:**
   - Access the dashboard to view collected data and analyze submissions.

---

## 📈 Roadmap

- [ ] Add analytics for form submissions.
- [ ] Enable file upload fields in forms.
- [ ] Support for themes and styling customization.
- [ ] Export responses as CSV or Excel.
- [ ] Add admin role for managing multiple users.

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and open a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- Inspired by Google Forms.
- Built with love using Next.js and Prisma.
