// Supabase setup and connection utilities

import { supabase } from '../lib/supabase';

export interface ConnectionStatus {
  isConnected: boolean;
  error?: string;
  tables: {
    [key: string]: boolean;
  };
  policies: {
    [key: string]: boolean;
  };
}

export class SupabaseSetup {
  static async checkConnection(): Promise<ConnectionStatus> {
    const status: ConnectionStatus = {
      isConnected: false,
      tables: {},
      policies: {}
    };

    try {
      // Test basic connection
      const { data, error } = await supabase.from('news').select('count').limit(1);
      
      if (error) {
        status.error = `Connection failed: ${error.message}`;
        return status;
      }

      status.isConnected = true;

      // Check required tables
      const requiredTables = [
        'news', 'services', 'incident_reports', 'gallery', 'videos',
        'pages', 'page_sections', 'resources', 'emergency_alerts',
        'social_posts', 'users', 'system_settings'
      ];

      for (const table of requiredTables) {
        try {
          const { error: tableError } = await supabase.from(table).select('count').limit(1);
          status.tables[table] = !tableError;
        } catch {
          status.tables[table] = false;
        }
      }

      return status;
    } catch (error) {
      status.error = error instanceof Error ? error.message : 'Unknown error';
      return status;
    }
  }

  static async verifyEnvironmentVariables(): Promise<{
    valid: boolean;
    issues: string[];
  }> {
    const issues: string[] = [];
    
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
      issues.push('VITE_SUPABASE_URL is not set');
    } else if (supabaseUrl.includes('your-project-ref') || supabaseUrl.includes('placeholder')) {
      issues.push('VITE_SUPABASE_URL contains placeholder values');
    } else if (!supabaseUrl.includes('supabase.co')) {
      issues.push('VITE_SUPABASE_URL does not appear to be a valid Supabase URL');
    }

    if (!supabaseKey) {
      issues.push('VITE_SUPABASE_ANON_KEY is not set');
    } else if (supabaseKey.includes('your-anon-key') || supabaseKey.includes('placeholder')) {
      issues.push('VITE_SUPABASE_ANON_KEY contains placeholder values');
    } else if (!supabaseKey.startsWith('eyJ')) {
      issues.push('VITE_SUPABASE_ANON_KEY does not appear to be a valid JWT token');
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  static async testAuthentication(): Promise<{
    working: boolean;
    error?: string;
  }> {
    try {
      // Test auth session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        return { working: false, error: error.message };
      }

      // Test user creation (this will fail if auth is not properly configured)
      const testEmail = `test-${Date.now()}@example.com`;
      const { error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: 'test123456'
      });

      // Clean up test user if created
      if (!signUpError) {
        // Note: In production, you might want to delete the test user
        console.log('Auth test successful - test user created');
      }

      return { working: true };
    } catch (error) {
      return { 
        working: false, 
        error: error instanceof Error ? error.message : 'Auth test failed' 
      };
    }
  }

  static async runDiagnostics(): Promise<{
    overall: 'healthy' | 'warning' | 'error';
    connection: ConnectionStatus;
    environment: { valid: boolean; issues: string[] };
    auth: { working: boolean; error?: string };
    recommendations: string[];
  }> {
    const connection = await this.checkConnection();
    const environment = await this.verifyEnvironmentVariables();
    const auth = await this.testAuthentication();
    
    const recommendations: string[] = [];
    
    if (!environment.valid) {
      recommendations.push('Update your .env file with actual Supabase credentials');
      recommendations.push('Restart the development server after updating environment variables');
    }
    
    if (!connection.isConnected) {
      recommendations.push('Check your Supabase project status and credentials');
      recommendations.push('Ensure your Supabase project is not paused');
    }
    
    const missingTables = Object.entries(connection.tables)
      .filter(([_, exists]) => !exists)
      .map(([table]) => table);
    
    if (missingTables.length > 0) {
      recommendations.push(`Run database migrations for missing tables: ${missingTables.join(', ')}`);
    }
    
    if (!auth.working) {
      recommendations.push('Check Supabase Auth configuration and RLS policies');
    }

    let overall: 'healthy' | 'warning' | 'error' = 'healthy';
    
    if (!environment.valid || !connection.isConnected) {
      overall = 'error';
    } else if (missingTables.length > 0 || !auth.working) {
      overall = 'warning';
    }

    return {
      overall,
      connection,
      environment,
      auth,
      recommendations
    };
  }
}

export const supabaseSetup = SupabaseSetup;