# 🏥 Carex AI - Project Outline

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [File Structure](#file-structure)
5. [Routing System](#routing-system)
6. [Components Architecture](#components-architecture)
7. [API Endpoints](#api-endpoints)
8. [Database Schema](#database-schema)
9. [Authentication Flow](#authentication-flow)
10. [Voice Conversation System](#voice-conversation-system)
11. [Development Workflow](#development-workflow)
12. [Deployment Strategy](#deployment-strategy)

## 🎯 Project Overview

**Carex AI** is a comprehensive medical consultation platform that combines cutting-edge AI technology with intuitive user interfaces to provide real-time voice conversations with specialized medical AI agents.

### **Core Objectives**

- Provide accessible medical consultations through AI
- Enable real-time voice conversations with medical specialists
- Maintain user privacy and data security
- Offer a seamless, modern user experience
- Support multiple AI doctor specializations

### **Target Users**

- **Patients**: Individuals seeking medical guidance
- **Healthcare Providers**: Medical professionals using AI assistance
- **Developers**: Contributors and integrators

## 🏗️ Architecture

### **High-Level Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   Services      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Clerk Auth    │    │   Database      │    │   AI Services   │
│   (User Mgmt)   │    │   (Prisma)      │    │   (OpenAI, etc) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Data Flow**

1. **User Authentication** → Clerk
2. **Voice Input** → AssemblyAI → Text
3. **Text Processing** → OpenAI → Response
4. **Response Synthesis** → Murf AI → Audio
5. **Session Storage** → Database

## 🛠️ Technology Stack

### **Frontend Technologies**

| Technology    | Version | Purpose                         |
| ------------- | ------- | ------------------------------- |
| Next.js       | 15.3.4  | React framework with App Router |
| React         | 19.0.0  | UI library                      |
| TypeScript    | 5.0     | Type safety and development     |
| Tailwind CSS  | 4.0     | Utility-first styling           |
| Framer Motion | 12.19.1 | Animations and transitions      |
| Radix UI      | 1.4.2   | Accessible component primitives |

### **Backend Technologies**

| Technology         | Version | Purpose                   |
| ------------------ | ------- | ------------------------- |
| Next.js API Routes | 15.3.4  | Server-side API endpoints |
| Prisma             | 6.10.1  | Database ORM              |
| PostgreSQL         | Latest  | Primary database          |
| Socket.IO          | 4.8.1   | Real-time communication   |

### **External Services**

| Service           | Purpose                            |
| ----------------- | ---------------------------------- |
| Clerk             | User authentication and management |
| OpenAI/OpenRouter | AI conversation engine             |
| AssemblyAI        | Speech-to-text processing          |
| Murf AI           | Text-to-speech synthesis           |
| Spline            | 3D design and visualization        |

### **Development Tools**

| Tool       | Purpose                     |
| ---------- | --------------------------- |
| Bun        | Package manager and runtime |
| ESLint     | Code linting                |
| TypeScript | Type checking               |
| Turbopack  | Fast bundling               |

## 📁 File Structure

### **Root Directory**

```
carex-ai/
├── 📁 app/                    # Next.js App Router
├── 📁 components/             # Shared React components
├── 📁 lib/                    # Utility libraries
├── 📁 prisma/                 # Database schema
├── 📁 public/                 # Static assets
├── 📁 context/                # React contexts
├── 📁 shared/                 # Shared utilities
├── 📄 package.json           # Dependencies
├── 📄 next.config.ts         # Next.js configuration
├── 📄 tailwind.config.ts     # Tailwind configuration
├── 📄 tsconfig.json          # TypeScript configuration
└── 📄 middleware.ts          # Next.js middleware
```

### **App Directory Structure**

```
app/
├── 📁 (auth)/                 # Authentication route group
│   ├── sign-in/              # Sign in pages
│   └── sign-up/              # Sign up pages
├── 📁 (routes)/              # Protected route group
│   └── dashboard/            # Main dashboard
│       ├── 📁 _components/   # Dashboard components
│       └── 📁 medical-agent/ # Voice conversation
├── 📁 api/                   # API routes
├── 📄 globals.css           # Global styles
├── 📄 layout.tsx            # Root layout
├── 📄 page.tsx              # Home page
└── 📄 provider.tsx          # Context providers
```

### **Components Directory Structure**

```
components/
├── 📁 ui/                    # Base UI components
│   ├── button.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── label.tsx
│   └── ...
├── 📁 sections/              # Page sections
│   ├── header.tsx
│   ├── hero.tsx
│   ├── features.tsx
│   ├── pricing.tsx
│   └── ...
└── 📁 magicui/               # Advanced UI components
    ├── blur-fade.tsx
    ├── border-beam.tsx
    ├── dot-pattern.tsx
    └── ...
```

## 🛣️ Routing System

### **Route Groups**

- **`(auth)`**: Authentication pages (sign-in, sign-up)
- **`(routes)`**: Protected application routes

### **Dynamic Routes**

- **`[sessionId]`**: Dynamic session pages for medical consultations

### **API Routes**

- **`/api/chat`**: Chat functionality
- **`/api/session-chat`**: Session management
- **`/api/suggest-doctors`**: Doctor recommendations
- **`/api/transcribe`**: Speech transcription
- **`/api/tts`**: Text-to-speech
- **`/api/users`**: User management

### **Route Protection**

```typescript
// middleware.ts
export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  ignoredRoutes: ["/api/webhook"],
});
```

## 🧩 Components Architecture

### **Component Hierarchy**

```
App
├── RootLayout
│   ├── ClerkProvider
│   ├── Provider (UserContext)
│   └── Children
├── HomePage
│   ├── Header
│   ├── Hero
│   ├── SplineRat (3D Scene)
│   ├── Problem
│   ├── HowItWorks
│   ├── Pricing
│   ├── Testimonials
│   ├── FAQ
│   ├── CTA
│   └── Footer
└── Dashboard
    ├── AppHeader
    ├── AddNewSession
    ├── HistoryList
    ├── DoctorsList
    └── MedicalAgent
        ├── AudioProcessor
        ├── ConversationManager
        ├── TextToSpeech
        └── VoiceRecordButton
```

### **Component Categories**

#### **UI Components** (`components/ui/`)

- **Button**: Various button variants and states
- **Dialog**: Modal dialogs and overlays
- **Input**: Form input components
- **Label**: Form labels and accessibility
- **Switch**: Toggle components
- **Textarea**: Multi-line text input

#### **Section Components** (`components/sections/`)

- **Header**: Navigation and branding
- **Hero**: Landing page hero section
- **Features**: Feature showcase
- **Pricing**: Pricing plans display
- **Testimonials**: User testimonials
- **FAQ**: Frequently asked questions
- **CTA**: Call-to-action sections

#### **Dashboard Components** (`app/(routes)/dashboard/_components/`)

- **AppHeader**: Dashboard navigation
- **AddNewSession**: Session creation modal
- **DoctorsList**: AI doctor selection
- **HistoryList**: Session history
- **Drawer**: Mobile navigation

#### **Medical Agent Components** (`app/(routes)/dashboard/medical-agent/components/`)

- **AudioProcessor**: Audio input/output handling
- **ConversationManager**: Conversation state management
- **TextToSpeech**: TTS functionality
- **VoiceRecordButton**: Voice recording interface

## 🔌 API Endpoints

### **Chat Endpoints**

```typescript
// POST /api/chat
{
  message: string;
  sessionId?: string;
  doctorType?: string;
}

// Response
{
  response: string;
  sessionId: string;
  timestamp: Date;
}
```

### **Session Management**

```typescript
// POST /api/session-chat
{
  notes: string;
  selectedDoctor: Doctor;
}

// Response
{
  sessionId: string;
  status: "created" | "active" | "completed";
}
```

### **Speech Processing**

```typescript
// POST /api/transcribe
{
  audio: Blob;
  sessionId: string;
}

// Response
{
  text: string;
  confidence: number;
}
```

### **Text-to-Speech**

```typescript
// POST /api/tts
{
  text: string;
  voice?: string;
}

// Response
{
  audioUrl: string;
  duration: number;
}
```

## 🗄️ Database Schema

### **User Model**

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  credits   Int      @default(10)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  sessions Session[]
}
```

### **Session Model**

```prisma
model Session {
  id          String   @id @default(cuid())
  userId      String
  doctorType  String
  notes       String?
  status      String   @default("active")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id])
  messages    Message[]
}
```

### **Message Model**

```prisma
model Message {
  id        String   @id @default(cuid())
  sessionId String
  content   String
  role      String   // "user" | "assistant"
  timestamp DateTime @default(now())

  session   Session  @relation(fields: [sessionId], references: [id])
}
```

## 🔐 Authentication Flow

### **Clerk Integration**

1. **User Registration**: Clerk handles user sign-up
2. **User Login**: Clerk manages authentication
3. **Session Management**: Clerk maintains user sessions
4. **Route Protection**: Middleware protects routes

### **User Context**

```typescript
// app/provider.tsx
const UserDetailContext = createContext<UseDetail | undefined>(undefined);

// Provider component manages user state
function Provider({ children }: { children: React.ReactNode }) {
  const [userDetail, setUserDetail] = useState<UseDetail | undefined>();
  const { user } = useUser();

  // Create user in database when authenticated
  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user]);
}
```

## 🎤 Voice Conversation System

### **Architecture Flow**

```
User Speech → AssemblyAI → Text → OpenAI → Response → Murf AI → Audio
     ↑                                                           ↓
     └─────────────── Session Storage ←─────────────────────────┘
```

### **Key Components**

#### **AudioProcessor**

- Handles microphone input
- Manages audio streams
- Processes real-time audio

#### **ConversationManager**

- Manages conversation state
- Handles turn-taking logic
- Coordinates between components

#### **TextToSpeech**

- Converts AI responses to speech
- Manages voice synthesis
- Handles audio playback

#### **VoiceRecordButton**

- Provides recording interface
- Shows recording status
- Manages user interactions

### **Turn-Taking Logic**

1. **AI Speaks**: User microphone muted
2. **AI Finishes**: User microphone activated
3. **User Speaks**: Audio captured and processed
4. **Silence Detection**: Automatic processing after 2 seconds
5. **Response Generation**: AI processes and responds
6. **Repeat**: Cycle continues

## 🔄 Development Workflow

### **Local Development**

```bash
# Install dependencies
bun install

# Set up environment
cp .env.example .env.local

# Generate Prisma client
bun run prisma generate

# Run migrations
bun run prisma migrate dev

# Start development server
bun run dev
```

### **Code Quality**

- **ESLint**: Code linting and formatting
- **TypeScript**: Type safety and IntelliSense
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks

### **Testing Strategy**

- **Unit Tests**: Component and utility testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: User flow testing
- **Performance Tests**: Load and stress testing

## 🚀 Deployment Strategy

### **Production Environment**

- **Vercel**: Frontend deployment
- **PostgreSQL**: Production database
- **Redis**: Session storage (optional)
- **CDN**: Static asset delivery

### **Environment Variables**

```env
# Production
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
OPEN_ROUTER_API_KEY="sk-or-..."
NEXT_PUBLIC_ASSEMBLYAI_API_KEY="..."
MURF_API_KEY="..."
NEXT_PUBLIC_APP_URL="https://carex-ai.com"
```

### **CI/CD Pipeline**

1. **Code Push**: Trigger build
2. **Testing**: Run automated tests
3. **Build**: Create production build
4. **Deploy**: Deploy to Vercel
5. **Database Migration**: Run Prisma migrations
6. **Health Check**: Verify deployment

### **Monitoring & Analytics**

- **Vercel Analytics**: Performance monitoring
- **Sentry**: Error tracking
- **Google Analytics**: User behavior
- **Database Monitoring**: Query performance

## 📊 Performance Considerations

### **Optimization Strategies**

- **Code Splitting**: Dynamic imports for large components
- **Image Optimization**: Next.js Image component
- **Caching**: Static generation and ISR
- **Bundle Analysis**: Regular bundle size monitoring

### **Scalability**

- **Database Indexing**: Optimized queries
- **CDN Usage**: Global content delivery
- **API Rate Limiting**: Prevent abuse
- **Load Balancing**: Multiple server instances

## 🔒 Security Measures

### **Data Protection**

- **Encryption**: End-to-end encryption for conversations
- **Authentication**: Secure user authentication
- **Authorization**: Role-based access control
- **Input Validation**: Sanitize all user inputs

### **Privacy Compliance**

- **GDPR**: European data protection
- **HIPAA**: Healthcare data protection
- **Data Anonymization**: Remove PII when possible
- **Audit Logs**: Track data access and changes

---

**This document provides a comprehensive overview of the Carex AI project architecture, components, and development workflow.**
