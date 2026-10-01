
# 📦 SafeDrop

**SafeDrop** is an IoT-enabled smart locker system designed to secure package deliveries by seamlessly bridging physical hardware with a mobile application.

Built with **React Native** and **Expo**, the application leverages strict **Role-Based Access Control (RBAC)**. This architecture allows the app to securely serve three distinct user types — **Customers**, **Delivery Riders**, and **Admins** — all from a single, unified codebase.

---

## 🎯 Project Status

| Phase | Focus | Status |
| :--- | :--- | :--- |
| **Phase 1** | Authentication + Customer Foundation | ✅ **Complete** |
| Phase 2 | Locker Rental Flow + Mock Payment | ⏳ Planned |
| Phase 3 | Rider Scanner + Admin Dashboard + ESP32 Hardware | ⏳ Planned |

---

## ✨ Key Features

### Phase 1 — Delivered
- **Splash Screen** — Branded intro with logo preload and auto-redirect.
- **Secure Authentication** — Email + password sign-up and sign-in powered by Supabase Auth.
- **Two-Factor Authentication (2FA)** — TOTP-based (RFC 6238) using Google Authenticator, Authy, or any compatible app.
  - **Sign-Up Flow:** App generates a secret → user scans QR → user verifies 6-digit code.
  - **Sign-In Flow:** User enters credentials → prompted for current 6-digit TOTP code.
  - **Server-Side Verification:** Codes are validated by a **Supabase Edge Function** — secrets never leave the server.
- **Customer Home Dashboard** — Personalized greeting, active locker status, locker size options (Small / Medium / Large), and a recent activity feed.
- **Tab Navigation** — Home / Alerts / Profile, ready to receive Phase 2 and 3 content.
- **Custom Design System** — Centralized color, spacing, radius, shadow, gradient, and typography tokens for scalable UI.

### Phase 2 & 3 — Upcoming
- **Locker Rental Flow** — Select a locker by size and location, then reserve it.
- **Payment Integration** — Mock PayMongo Sandbox / GCash simulation for the e-commerce rubric.
- **Rider Flow** — Barcode scanning and compartment assignment.
- **Admin Dashboard** — Real-time locker status monitoring and remote door override.
- **IoT Integration** — ESP32 firmware communicating with Supabase to control 12V solenoid locks and read IR sensors.

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
| :--- | :--- |
| **React Native** | Cross-platform mobile framework |
| **Expo** | Build tooling, native modules, OTA updates |
| **Expo Router** | File-based routing with typed routes |
| **TypeScript** | Type-safe development |
| **Expo Linear Gradient** | Gradient CTAs and headers |
| **react-native-qrcode-svg** | QR code rendering for TOTP setup |
| **expo-clipboard** | Manual secret copy support |
| **expo-checkbox** | Terms-of-service agreement UI |
| **@expo/vector-icons (Feather)** | Consistent iconography |
| **@expo-google-fonts/poppins** | Heading typography |
| **@expo-google-fonts/inter** | Body typography |

### Backend
| Technology | Purpose |
| :--- | :--- |
| **Supabase (PostgreSQL)** | User profiles and TOTP secrets storage |
| **Supabase Auth** | Email/password authentication and session management |
| **Supabase Edge Functions (Deno)** | Server-side TOTP code verification |

### Security
| Layer | Implementation |
| :--- | :--- |
| **Password Policy** | Minimum 8 characters, uppercase, number, special character |
| **2FA** | Time-based One-Time Password (TOTP, SHA-1, 6 digits, 30s window) |
| **Server Verification** | Edge Function validates every code with ±1 step tolerance |
| **Row Level Security (RLS)** | Enabled on all tables — users can only read/write their own rows |
| **Session Persistence** | AsyncStorage with auto-refresh tokens |

### Hardware (Phase 3)
| Component | Role |
| :--- | :--- |
| **ESP32 Microcontroller** | Locker brain, Wi-Fi communication |
| **12V Solenoid Locks** | Physical locking mechanism |
| **3.3V Relays** | Bridge between ESP32 and solenoids |
| **5V Buck Converter** | Steps 12V down to 5V for ESP32 |
| **Infrared (IR) Sensors** | Detect whether a parcel is inside a compartment |

---

## 🎨 Design System

SafeDrop uses a centralized design token system located in `src/theme/`. This ensures visual consistency across all screens and makes global design changes trivial.

### Color Palette
| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Primary** | `#0EA5E9` | Headers, active icons, brand identity |
| **Success** | `#10B981` | CTAs, success states, "Available" badges |
| **Background** | `#F8FAFC` | Screen backgrounds |
| **Surface** | `#FFFFFF` | Cards and elevated UI |
| **Text Primary** | `#1E293B` | Main readable text |
| **Text Secondary** | `#64748B` | Subtitles and captions |
| **Danger** | `#EF4444` | Error states and validation messages |
| **Border** | `#E2E8F0` | Input borders and dividers |

### Typography
- **Poppins** — Headings (Bold, SemiBold)
- **Inter** — Body (Regular, Medium, SemiBold)

### Spacing & Radius
- Spacing scale: 4, 8, 16, 24, 32, 48
- Radius scale: 8, 12, 16, 20, 28
- All interactive elements follow a **56px** standard height for accessible touch targets

---

## 📁 Project Structure

```
SafeDrop/
├── assets/
│   └── images/
│       └── SafeDrop_logo.png
├── src/
│   ├── app/                           # Expo Router (file-based routing)
│   │   ├── (tabs)/                    # Authenticated tab group
│   │   │   ├── _layout.tsx            # Tab bar configuration
│   │   │   ├── homeScreen.tsx         # Customer dashboard
│   │   │   ├── alerts.tsx             # Alerts placeholder
│   │   │   └── profile.tsx            # Profile placeholder
│   │   ├── _layout.tsx                # Root layout (font loading + splash)
│   │   ├── index.tsx                  # Splash screen
│   │   ├── signIn.tsx                 # Sign-in screen
│   │   ├── signUp.tsx                 # Sign-up screen
│   │   ├── totpSetup.tsx              # TOTP QR generation
│   │   └── totp.tsx                   # TOTP verification
│   ├── lib/                           # Supabase + business logic
│   │   ├── supabase.ts                # Supabase client
│   │   ├── auth.ts                    # Auth helpers (sign up, sign in, profile)
│   │   └── totp.ts                    # TOTP secret generation + Edge Function calls
│   ├── styles/                        # Separated stylesheets
│   │   ├── screens/                   # Per-screen styles
│   │   │   ├── signIn.styles.ts
│   │   │   ├── signUp.styles.ts
│   │   │   ├── totp.styles.ts
│   │   │   ├── totpSetup.styles.ts
│   │   │   └── homeScreen.styles.ts
│   │   └── blocks/                    # Reusable style blocks
│   │       └── SDInput.ts
│   └── theme/                         # Design tokens
│       ├── colors.ts
│       ├── fonts.ts
│       ├── gradients.ts
│       ├── radius.ts
│       ├── shadow.ts
│       └── spacing.ts
├── supabase/
│   ├── config.toml
│   └── functions/
│       └── verify-totp/
│           └── index.ts               # Edge Function (TOTP verification)
├── app.json                           # Expo configuration
├── tsconfig.json                      # TypeScript config + path aliases
└── package.json
```

---

## 🔄 Authentication Flow

### New User (Sign Up)
```
Splash
   ↓
Sign Up ─────────────► Supabase creates user + session
   ↓
TOTP Setup ──────────► App generates secret + QR code
   ↓
[User scans QR in Google Authenticator]
   ↓
TOTP Verify ─────────► Edge Function validates code + saves secret
   ↓
Home Dashboard
```

### Returning User (Sign In)
```
Splash
   ↓
Sign In ─────────────► Supabase validates credentials + creates session
   ↓
TOTP Verify ─────────► Edge Function fetches stored secret + validates code
   ↓
Home Dashboard
```

---

## 🔐 Database Schema

### `profiles` Table
| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | UUID | Primary key, references `auth.users` |
| `full_name` | TEXT | User's full name |
| `email` | TEXT | User's email |
| `phone` | TEXT | User's phone number |
| `role` | TEXT | `customer` \| `rider` \| `admin` (default: customer) |
| `created_at` | TIMESTAMPTZ | Timestamp of creation |

### `user_totp` Table
| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | UUID | Primary key, references `auth.users` |
| `secret` | TEXT | Base32-encoded TOTP secret |
| `is_enabled` | BOOLEAN | Whether 2FA is active for the user |
| `created_at` | TIMESTAMPTZ | Timestamp of creation |

Both tables have **Row Level Security** enabled — users can only access their own rows.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Expo CLI
- Supabase account
- Docker Desktop (for Edge Function deployment)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd SafeDrop

# Install dependencies
npm install

# Configure environment variables
# Create a .env file in the root with:
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Start the development server
npx expo start -c
```

### Supabase Setup
1. Create a new project on [supabase.com](https://supabase.com)
2. Run the SQL scripts in `supabase/schema.sql` to create the `profiles` and `user_totp` tables
3. Disable "Confirm email" in **Auth → Providers → Email** for development
4. Deploy the Edge Function:
   ```bash
   npx supabase link --project-ref <your-ref>
   npx supabase functions deploy verify-totp
   ```

---

## 📅 Roadmap

### Phase 2 — Locker Rental + Payment
- [ ] Interactive map to locate nearby lockers
- [ ] Locker size and availability selection
- [ ] Rental confirmation flow
- [ ] Mock payment integration (PayMongo Sandbox or GCash simulation)
- [ ] Real-time locker status from Supabase

### Phase 3 — Multi-Role + IoT
- [ ] Delivery Rider flow (barcode scanner, compartment assignment)
- [ ] Admin dashboard (real-time status, remote door override)
- [ ] ESP32 firmware development
- [ ] Hardware wiring: solenoids, relays, buck converter, IR sensors
- [ ] End-to-end integration with the physical locker

---

## 📜 License

This project is currently a commissioned (MCO). Licensing terms will be finalized upon project completion.

---

## 👤 Author

**Jeremy** — Freelance Mobile Developer
*Built with React Native, Expo, and Supabase.*
```