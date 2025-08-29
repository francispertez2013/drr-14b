import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  name: string;
  user_metadata?: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          setError(error.message);
          return;
        }

        if (session?.user) {
          await setUserFromSession(session.user);
        }
      } catch (error) {
        console.error('Error checking user session:', error);
        setError('Failed to check authentication status');
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setError(null);
      
      if (event === 'SIGNED_IN' && session?.user) {
        await setUserFromSession(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        await setUserFromSession(session.user);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const setUserFromSession = async (supabaseUser: SupabaseUser) => {
    try {
      // Get user profile from database or use metadata
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', supabaseUser.email)
        .single();

      let userData: User;

      if (userProfile && !error) {
        // User exists in our users table
        userData = {
          id: supabaseUser.id,
          email: supabaseUser.email!,
          role: userProfile.role || 'editor',
          name: userProfile.name || supabaseUser.user_metadata?.name || supabaseUser.email!,
          user_metadata: supabaseUser.user_metadata
        };
      } else {
        // Use Supabase user metadata or defaults
        userData = {
          id: supabaseUser.id,
          email: supabaseUser.email!,
          role: supabaseUser.user_metadata?.role || 'editor',
          name: supabaseUser.user_metadata?.name || supabaseUser.email!,
          user_metadata: supabaseUser.user_metadata
        };
      }

      setUser(userData);
      setIsAuthenticated(true);

      // Update last login in database if user exists
      if (userProfile && !error) {
        await supabase
          .from('users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', userProfile.id);
      }
    } catch (error) {
      console.error('Error setting user from session:', error);
      setError('Failed to load user profile');
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return false;
      }

      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || 
          supabaseUrl.includes('your-project-ref') || 
          supabaseKey.includes('your-anon-key')) {
        setError('Supabase not configured. Please check environment variables.');
        return false;
      }

      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error) {
        console.error('Login error:', error);
        
        // Handle specific error types
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials.');
        } else if (error.message.includes('Email not confirmed')) {
          setError('Please confirm your email address before signing in.');
        } else if (error.message.includes('Too many requests')) {
          setError('Too many login attempts. Please wait a moment and try again.');
        } else if (error.message.includes('fetch')) {
          setError('Network error. Please check your internet connection and try again.');
        } else {
          setError(error.message);
        }
        return false;
      }

      if (data.user) {
        await setUserFromSession(data.user);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setError('Network connection failed. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        setError('Failed to sign out');
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
      setError('An error occurred during sign out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      loading, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};