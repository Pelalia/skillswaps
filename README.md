# Skillswaps

A modern platform for discovering and exchanging skills with others. Connect with skilled individuals, showcase your expertise, and learn new abilities from the community.

## 🌟 Features

- **User Profiles**: Create a personalized profile showcasing your skills and interests
- **Skill Exchange**: Teach what you know and learn what others have to offer
- **User Discovery**: Browse and connect with skilled community members
- **Authentication**: Secure login with NextAuth and bcrypt password hashing
- **Multi-language Support**: Internationalization support with next-intl
- **Dark Mode**: Theme switching with next-themes
- **Real-time Notifications**: Toast notifications powered by Sonner
- **Rate Limiting**: API protection with Upstash rate limiting
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend & Framework
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn** - High-quality UI components
- **Lucide React** - Icon library
- **Base UI** - Headless component library

### Backend & Database
- **MongoDB** - NoSQL database
- **bcryptjs** - Password hashing
- **Upstash Redis & Rate Limit** - Caching and API protection

### Authentication & Internationalization
- **NextAuth 5** - Authentication framework
- **next-intl** - Multi-language support
- **next-themes** - Dark mode support

### Development & Testing
- **Vitest** - Unit testing framework
- **Playwright** - E2E testing
- **ESLint** - Code linting
- **React Hook Form** - Form management with Zod validation

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pelalia/skillswaps.git
   cd skillswaps
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or use: yarn install, pnpm install, bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI

## 📁 Project Structure

```
skillswaps/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── hero.tsx           # Hero section
│   ├── navbar.tsx         # Navigation bar
│   └── providers.tsx      # Providers wrapper
├── lib/                   # Utility functions
│   ├── db.ts              # MongoDB client
│   └── users.ts           # User operations
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── package.json           # Project dependencies
```

## 🔑 Key Features

### User Management
- Create and update user profiles
- Store teaching and learning interests
- User profile discovery with featured users
- Avatar generation with DiceBear API

### Authentication
- Secure password hashing with bcryptjs
- NextAuth integration for sessions
- Protected routes and API endpoints

### Data Persistence
- MongoDB for user and skill data
- Upstash Redis for rate limiting

## 🧪 Testing

Run unit tests:
```bash
npm run test
```

Run tests with UI:
```bash
npm run test:ui
```

Run end-to-end tests:
```bash
npx playwright test
```

## 📦 Building for Production

```bash
npm run build
npm start
```

The application will be optimized and ready for deployment.

## 🌐 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel auto-detects Next.js and configures build settings
4. Set your environment variables in Vercel dashboard
5. Deploy with every push to main branch

[Learn more about Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying)

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [React Documentation](https://react.dev) - React concepts
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS
- [MongoDB](https://docs.mongodb.com) - Database documentation
- [NextAuth Documentation](https://next-auth.js.org) - Authentication setup

## 🤝 Contributing

Contributions are welcome! Please feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Created by [Pelalia](https://github.com/Pelalia)

---

**Questions or feedback?** Feel free to open an issue or reach out!
