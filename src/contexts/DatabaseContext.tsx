import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { supabase, getConnectionStatus, forceReconnect } from '../lib/supabase';
import { databaseManager } from '../lib/database';

interface DatabaseContextType {
  databaseType: 'supabase';
  isConnected: boolean;
  connectionError: string | null;
  isReconnecting: boolean;
  lastConnectionCheck: Date | null;
  testConnection: () => Promise<void>;
  forceReconnect: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

function useDatabase(): DatabaseContextType {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}

function DatabaseProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [lastConnectionCheck, setLastConnectionCheck] = useState<Date | null>(null);

  const testSupabaseConnection = useCallback(async () => {
    setIsReconnecting(true);
    setLastConnectionCheck(new Date());
    
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey || 
          supabaseUrl.includes('placeholder') || 
          supabaseUrl.includes('your-project-ref') ||
          supabaseKey.includes('your-anon-key')) {
        setIsConnected(false);
        setConnectionError(
          'Supabase not configured. Please click "Connect to Supabase" button to set up your database connection.'
        );
        setIsReconnecting(false);
        return;
      }

      // Test basic connection with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        const { data, error } = await supabase
          .from('news')
          .select('count')
          .limit(1)
          .abortSignal(controller.signal);
        
        clearTimeout(timeoutId);
        
        if (error) {
          throw new Error(`Database connection failed: ${error.message}`);
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          throw new Error('Connection timeout - please check your network and Supabase configuration');
        }
        throw fetchError;
      }

      const healthCheck = await databaseManager.healthCheck();
      if (healthCheck.status === 'healthy') {
        setIsConnected(true);
        setConnectionError(null);
        console.log('✅ Database connection established successfully');
        
        // Dispatch connection event
        window.dispatchEvent(new CustomEvent('database-connected'));
      } else {
        setIsConnected(false);
        setConnectionError(healthCheck.message);
      }
    } catch (error) {
      console.error('Supabase connection error:', error);
      setIsConnected(false);
      setConnectionError(
        `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your network and Supabase configuration.`
      );
      
      // Dispatch disconnection event
      window.dispatchEvent(new CustomEvent('database-disconnected'));
    } finally {
      setIsReconnecting(false);
    }
  }, []);

  const handleForceReconnect = useCallback(async () => {
    console.log('🔄 Force reconnecting to Supabase...');
    await forceReconnect();
    await testSupabaseConnection();
  }, [testSupabaseConnection]);
  useEffect(() => {
    // Initial connection test
    testSupabaseConnection();
    
    // Listen for network status changes
    const handleOnline = () => {
      console.log('🌐 Network restored - testing database connection');
      testSupabaseConnection();
    };
    
    const handleOffline = () => {
      console.log('📡 Network lost');
      setIsConnected(false);
      setConnectionError('Network connection lost');
    };
    
    // Listen for Supabase connection events
    const handleSupabaseConnected = () => {
      setIsConnected(true);
      setConnectionError(null);
    };
    
    const handleSupabaseDisconnected = () => {
      setIsConnected(false);
      setConnectionError('Database connection lost');
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('supabase-connected', handleSupabaseConnected);
    window.addEventListener('supabase-disconnected', handleSupabaseDisconnected);
    
    // Periodic connection health check
    const healthCheckInterval = setInterval(() => {
      if (navigator.onLine && !isConnected) {
        testSupabaseConnection();
      }
    }, 60000); // Check every minute
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('supabase-connected', handleSupabaseConnected);
      window.removeEventListener('supabase-disconnected', handleSupabaseDisconnected);
      clearInterval(healthCheckInterval);
    };
  }, [testSupabaseConnection]);

  return (
    <DatabaseContext.Provider
      value={{
        databaseType: 'supabase',
        isConnected,
        connectionError,
        isReconnecting,
        lastConnectionCheck,
        testConnection: testSupabaseConnection,
        forceReconnect: handleForceReconnect,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export { DatabaseProvider, useDatabase };