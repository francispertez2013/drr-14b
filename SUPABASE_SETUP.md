# Supabase Setup Instructions

## Quick Setup Guide

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign in with GitHub or create an account
4. Click "New Project"
5. Choose your organization
6. Enter project details:
   - Name: `mdrrmo-pio-duran`
   - Database Password: (create a strong password)
   - Region: Choose closest to Philippines (e.g., Southeast Asia)
7. Click "Create new project"
8. Wait for project to be ready (2-3 minutes)

### Step 2: Get Your Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

### Step 3: Update Environment Variables
1. Open the `.env` file in your project root
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-actual-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### Step 4: Run Database Migrations
1. In Supabase Dashboard, go to **SQL Editor**
2. Copy and paste each migration file content (in order):
   - Start with the earliest migration file
   - Run each migration one by one
   - Check for any errors

### Step 5: Test Connection
1. Restart your development server: `npm run dev`
2. Go to Admin → Settings → Database tab
3. Click "Test Connection"
4. Verify all tables are created

---

## Step 1: Get Your Supabase Credentials

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Sign in** with your account or create a new one
3. **Select your project** or create a new one
4. **Go to Settings** → **API**
5. **Copy these values**:
   - Project URL (looks like: `https://xxxxx.supabase.co`)
   - Anon/Public Key (starts with `eyJ...`)

## Step 2: Update Environment Variables

Create a `.env` file in your project root and add your credentials:

```env
VITE_SUPABASE_URL=https://your-actual-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

## Step 3: Verify Connection

After updating your environment variables:

1. **Restart the development server**:
   ```bash
   npm run dev
   ```

2. **Check connection status**:
   - Go to Admin Dashboard
   - Look for connection status indicator
   - Green = Connected, Red = Disconnected

3. **Test database operations**:
   - Try logging in with demo credentials
   - Create a test news article
   - Submit a test incident report

## Step 3: Run Database Migration

The migration files are located in the `supabase/migrations/` directory.

**Option A: Using Supabase Dashboard**
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the content from each migration file in order:
   - Run migrations in chronological order (by filename)
   - Check for any errors after each migration
   - Verify tables are created successfully
4. Click **Run**

**Option B: Using Supabase CLI (if installed)**
```bash
supabase link --project-ref your-project-ref
supabase db push
```

## Troubleshooting Connection Issues

### Common Problems and Solutions

1. **"Missing Supabase environment variables"**
   - Check that `.env` file exists in project root
   - Verify variable names are exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   - Restart development server after changes

2. **"Connection failed" or "Network error"**
   - Verify your Supabase project is active (not paused)
   - Check your internet connection
   - Ensure project URL is correct and accessible

3. **"Table does not exist" errors**
   - Run all database migrations in Supabase SQL Editor
   - Check migration files executed successfully
   - Verify tables exist in Supabase Table Editor

4. **"Invalid JWT" or authentication errors**
   - Verify anon key is copied correctly (starts with `eyJ`)
   - Check for extra spaces or characters in environment variables
   - Regenerate anon key if necessary

5. **"Row Level Security" errors**
   - Ensure RLS policies are created by migrations
   - Check that demo users exist in auth.users table
   - Verify user roles are set correctly

### Environment Variable Validation

Your `.env` file should look like this:
```env
# ✅ Correct format
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ❌ Incorrect (placeholder values)
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Verify Setup

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test the application**:
   - Visit: http://localhost:5173
   - Try logging in: http://localhost:5173/admin/login
   - Use demo credentials: `admin@mdrrmo.gov.ph` / `admin123`
   - Check Admin Dashboard for connection status
   - Test creating content (news, services, etc.)
   - Verify real-time updates work

## Step 5: Enable Authentication

In your Supabase Dashboard:
1. Go to **Authentication** → **Settings**
2. **Configure email confirmation** as needed for production
3. **Add your domain** to allowed origins
4. **Set up email templates** for user verification and password reset

### Creating Your First Admin Account

1. **Visit the login page**: http://localhost:5173/admin/login
2. **Click "Need an account? Register"**
3. **Fill in the registration form**:
   - Full Name: Your name
   - Username: Unique username
   - Email: Your admin email
   - Password: Secure password (min 6 characters)
   - Role: First user automatically becomes Administrator
4. **Complete registration** and verify your email if required
5. **Sign in** with your new credentials

### How User Management Works

✅ **Automatic Profile Creation**:
- When you sign up through Supabase Auth, a user profile is automatically created
- First registered user automatically gets admin privileges
- Subsequent users default to editor role (can be changed by admins)

✅ **Seamless Integration**:
- Supabase Auth handles password security and email verification
- User profiles are automatically synchronized with authentication
- No manual database setup required for user accounts

### Production Authentication Features

✅ **Secure User Management**:
- Real user accounts stored in database
- Supabase Auth integration for security
- Email verification for new accounts
- Password reset functionality

✅ **Role-Based Access Control**:
- Admin: Full system access
- Editor: Content management only
- Secure role enforcement

✅ **Production Security**:
- No demo accounts or hardcoded credentials
- Encrypted password storage
- Session management
- Secure logout functionality
## What's Included

✅ **Complete Database Schema**:
- News articles
- Services
- Incident reports
- Gallery items
- Pages
- Page sections
- Resources
- Emergency alerts
- Social posts

✅ **Row Level Security (RLS)**:
- Public can read published content
- Authenticated users can manage all content
- Anyone can submit incident reports

✅ **Sample Data**:
- Pre-populated with demo content
- Ready to use immediately

✅ **Real-time Features**:
- Live updates across all components
- Automatic data synchronization

✅ **Production Ready**:
- Optimized database queries
- Error handling and validation
- Performance monitoring
- Security best practices

## Troubleshooting

**If you get connection errors**:
1. Check your credentials in `.env`
2. Ensure your Supabase project is active
3. Verify all migrations were run successfully
4. Check the browser console for specific error messages

**If authentication fails**:
1. Check that email confirmation is disabled
2. Verify the demo users exist in the auth table
3. Try creating users manually in Supabase dashboard

**If tables don't exist**:
1. Ensure all migration files were executed
2. Check the Supabase SQL editor for any errors
3. Verify your project has the correct permissions

## Next Steps

Once connected, you can:
1. **Manage Content** - Add/edit news, services, gallery items
2. **Handle Incidents** - Review and respond to public reports
3. **Emergency Alerts** - Send automated alerts to the community
4. **Create Pages** - Build custom pages with dynamic content
5. **Manage Resources** - Upload and organize downloadable files
6. **Social Media** - Manage social media presence
7. **Analytics** - Track engagement and performance

## Production Deployment

For production deployment:
1. Set environment variables in your hosting platform
2. Build the application: `npm run build`
3. Deploy the `dist` folder to your hosting provider
4. Ensure Supabase project is in production mode
5. Configure custom domain and SSL if needed

Need help? The application includes comprehensive admin tools and monitoring for all features!