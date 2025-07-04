# 📧 Mystic Message

<div align="center">
  <img src="https://img.shields.io/badge/Built%20with-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Status-Working-brightgreen?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/Version-1.0.0-orange?style=for-the-badge" alt="Version" />
</div>

<div align="center">
  <h3>Real-time, secure messaging platform built with Next.js & NextAuth</h3>
  <p>Sign up, authenticate, and chat securely with a beautiful, responsive interface.</p>
</div>

---

## 🚀 Features

- 🔐 **Secure Authentication** - Powered by NextAuth.js with multiple providers
- 📱 **User Registration & Login** - Seamless onboarding experience
- 🛡️ **Protected Routes** - JWT-based session management
- 💬 **Real-time Messaging** - Instant communication with WebSocket support
- 🎨 **Modern UI** - Beautiful interface crafted with Tailwind CSS
- ⚡ **API Routes** - RESTful endpoints powered by Next.js
- 📱 **Fully Responsive** - Perfect experience on desktop and mobile
- 🌙 **Dark Mode** - Eye-friendly interface for extended use

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | Full-stack React framework | 13.x |
| **MongoDB** | NoSQL database | Latest |
| **NextAuth.js** | Authentication & Sessions | 4.x |
| **Tailwind CSS** | Styling & UI framework | 3.x |
| **JWT** | Secure token-based auth | Latest |
| **Socket.io** | Real-time communication | 4.x |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16+ recommended)
- **MongoDB** (Atlas or local instance)
- **Git** for version control

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Aj1-7/mystic_message.git
cd mystic_message
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment configuration
```bash
cp .env.example .env.local
```

Configure your environment variables in `.env.local`:
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email Configuration (optional)
EMAIL_SERVER=smtp://username:password@smtp.gmail.com:587
EMAIL_FROM=noreply@example.com
```

### 4. Run the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
mystic_message/
├── components/          # Reusable UI components
├── pages/              # Next.js pages and API routes
│   ├── api/           # Backend API endpoints
│   ├── auth/          # Authentication pages
│   └── chat/          # Chat interface
├── lib/               # Utility functions and configurations
├── styles/            # Global styles and Tailwind config
├── public/            # Static assets
└── types/             # TypeScript type definitions
```

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/*` | Various | NextAuth.js authentication routes |
| `/api/messages` | GET/POST | Fetch and send messages |
| `/api/users` | GET | User management |
| `/api/rooms` | GET/POST | Chat room operations |

## 🎯 Features in Detail

### Authentication System
- Multiple sign-in providers (Google, GitHub, Email)
- Secure session management with JWT
- Protected routes with middleware
- User profile management

### Messaging Features
- Real-time message delivery
- Message history and persistence
- User presence indicators
- Typing indicators
- Message encryption (optional)

### User Interface
- Clean, modern design
- Responsive layout for all devices
- Dark/light mode toggle
- Smooth animations and transitions
- Accessible design principles

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Other Platforms
The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- AWS
- Digital Ocean

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports & Feature Requests

If you encounter any bugs or have feature requests, please create an issue on [GitHub Issues](https://github.com/Aj1-7/mystic_message/issues).

## 📞 Support

- 📧 Email: support@mysticmessage.com
- 💬 Discord: [Join our community](https://discord.gg/mysticmessage)
- 📖 Documentation: [Read the docs](https://docs.mysticmessage.com)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Aj1-7">dakshkhare</a></p>
  <p>⭐ If you like this project, give it a star!</p>
  
  <a href="https://github.com/Aj1-7/mystic_message/stargazers">
    <img src="https://img.shields.io/github/stars/Aj1-7/mystic_message?style=social" alt="GitHub stars" />
  </a>
</div>
