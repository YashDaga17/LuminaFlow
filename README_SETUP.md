# LuminaFlow - Full-Stack Task Orchestrator with AI

A modern, full-stack task management application built with Next.js 16, TypeScript, Prisma, and Gemini AI.

## Features

- ✅ **User Authentication**: Secure JWT-based authentication with bcryptjs password hashing
- ✅ **Task Management**: Full CRUD operations with status, priority, and category management
- ✅ **AI Integration**: Gemini AI-powered task descriptions and suggestions
- ✅ **Type Safety**: Full TypeScript support with proper type definitions
- ✅ **Responsive UI**: Modern Tailwind CSS design with shadcn components
- ✅ **Security**: Input validation, sanitization, and security headers
- ✅ **Database**: PostgreSQL with Prisma ORM

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Next.js Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + bcryptjs
- **AI**: Google Gemini API
- **Validation**: Zod
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google Gemini API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YashDaga17/LuminaFlow.git
   cd LuminaFlow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your credentials:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: A secure random string (min 32 characters for production)
   - `GOOGLE_GENERATIVE_AI_API_KEY`: Your Gemini API key

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and import the repository
   - Vercel will automatically detect Next.js

3. **Set Environment Variables**
   In Vercel project settings, add these environment variables:
   - `DATABASE_URL`: Your production PostgreSQL URL
   - `JWT_SECRET`: A strong random string (generate with `openssl rand -base64 32`)
   - `GOOGLE_GENERATIVE_AI_API_KEY`: Your Gemini API key
   - `NODE_ENV`: `production`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Important Notes for Vercel

- Ensure `JWT_SECRET` is set in production (minimum 32 characters)
- Database migrations run automatically on first deploy
- `.env` and `prisma/migrations/` are gitignored and not pushed to GitHub

## Project Structure

```
LuminaFlow/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (dashboard)
│   ├── sign-in/                 # Sign in page
│   └── sign-up/                 # Sign up page
├── components/                   # React components
│   ├── ui/                      # shadcn UI components
│   ├── TaskItem.tsx             # Task list item
│   ├── AddTaskForm.tsx          # Task creation form
│   └── UserNav.tsx              # User navigation
├── lib/                          # Utilities and helpers
│   ├── actions/                 # Server actions
│   ├── db.ts                    # Prisma client
│   ├── config.ts                # Configuration
│   ├── types.ts                 # TypeScript types
│   └── utils.ts                 # Helper functions
├── prisma/                       # Database schema
│   └── schema.prisma            # Prisma schema
└── public/                       # Static files
```

## API Endpoints (Server Actions)

### Authentication
- `signUp(formData)` - Create a new user account
- `signIn(formData)` - Sign in with email and password
- `signOut()` - Sign out current user
- `getCurrentUser()` - Get current authenticated user

### Tasks
- `createTask(formData)` - Create a new task
- `updateTask(id, formData)` - Update task details
- `deleteTask(id)` - Delete a task
- `getUserTasks()` - Get all tasks for current user

### AI Features
- `suggestDescription(title)` - Get AI suggestion for task description

## Security Features

- ✅ JWT authentication with httpOnly cookies
- ✅ Password hashing with bcryptjs
- ✅ Input validation with Zod
- ✅ CSRF protection headers
- ✅ XSS prevention headers
- ✅ Rate limiting ready (can be added)
- ✅ SQL injection prevention via Prisma ORM
- ✅ Secure environment variables handling

## Testing

Run the development server and test the following flows:

1. **Authentication Flow**
   - Sign up with a new account
   - Sign in with credentials
   - Sign out

2. **Task Management**
   - Create tasks with different priorities
   - Update task status
   - Delete tasks
   - View all tasks

3. **AI Features**
   - Use "Suggest Description" to generate AI descriptions

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | JWT signing secret (min 32 chars in prod) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | No | Google Gemini API key for AI features |
| `NODE_ENV` | No | Environment: `development` or `production` |

## Development Checklist

- [x] Authentication system
- [x] Task CRUD operations
- [x] AI integration
- [x] TypeScript types
- [x] Input validation
- [x] Responsive UI
- [x] Security headers
- [x] Environment configuration
- [ ] Integration tests
- [ ] Unit tests
- [ ] API rate limiting
- [ ] Error logging/monitoring

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Author

**Yash Daga**
- GitHub: [@YashDaga17](https://github.com/YashDaga17)
- LinkedIn: [Yash Daga](https://linkedin.com/in/yash-daga)

## Troubleshooting

### Build fails on Vercel
- Ensure all environment variables are set in Vercel project settings
- Check that `JWT_SECRET` is at least 32 characters
- Verify PostgreSQL connection string is correct

### Database connection issues
- Ensure PostgreSQL is running
- Check DATABASE_URL format
- Run `npx prisma db push` to sync schema

### AI features not working
- Verify `GOOGLE_GENERATIVE_AI_API_KEY` is set
- Check API quota and billing in Google Cloud Console
