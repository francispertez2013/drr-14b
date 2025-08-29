// Database abstraction layer for Supabase
import { supabase } from './supabase';
import type { Database } from './supabase';

// Type definitions for database operations
type Tables = Database['public']['Tables'];
type NewsRow = Tables['news']['Row'];
type ServiceRow = Tables['services']['Row'];
type IncidentRow = Tables['incident_reports']['Row'];
type GalleryRow = Tables['gallery']['Row'];
type UserRow = Tables['users']['Row'];
type SettingRow = Tables['system_settings']['Row'];

export class DatabaseManager {
  private isConnected = false;
  private connectionPromise: Promise<boolean> | null = null;
  private lastHealthCheck = 0;
  private healthCheckInterval = 30000; // 30 seconds

  constructor() {
    this.initializeConnection();
  }

  private async initializeConnection(): Promise<void> {
    try {
      await this.testConnection();
      this.startHealthMonitoring();
    } catch (error) {
      console.error('Failed to initialize database connection:', error);
    }
  }

  private startHealthMonitoring(): void {
    setInterval(async () => {
      if (this.isConnected) {
        try {
          await this.quickHealthCheck();
        } catch (error) {
          console.warn('Health check failed:', error);
          this.isConnected = false;
        }
      }
    }, this.healthCheckInterval);
  }

  private async quickHealthCheck(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('news')
        .select('count')
        .limit(1);
      
      if (error) throw error;
      return true;
    } catch (error) {
      throw error;
    }
  }
  async testConnection(): Promise<boolean> {
    // Prevent multiple simultaneous connection tests
    if (this.connectionPromise) {
      return this.connectionPromise;
    }
    
    this.connectionPromise = this.performConnectionTest();
    const result = await this.connectionPromise;
    this.connectionPromise = null;
    
    return result;
  }

  private async performConnectionTest(): Promise<boolean> {
    try {
      // Check environment variables first
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || 
          supabaseUrl.includes('your-project-ref') || 
          supabaseKey.includes('your-anon-key')) {
        this.isConnected = false;
        return false;
      }
      
      // Test connection with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const { data, error } = await supabase
        .from('news')
        .select('count')
        .limit(1)
        .abortSignal(controller.signal);
      
      clearTimeout(timeoutId);
      
      if (error) throw error;
      
      this.isConnected = true;
      this.lastHealthCheck = Date.now();
      
      console.log('✅ Database connection verified');
      return true;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('❌ Database connection timeout');
      } else {
        console.error('❌ Database connection failed:', error);
      }
      this.isConnected = false;
      return false;
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  getLastHealthCheck(): number {
    return this.lastHealthCheck;
  }

  async ensureConnection(): Promise<boolean> {
    if (!this.isConnected) {
      return await this.testConnection();
    }
    
    // Check if health check is stale
    if (Date.now() - this.lastHealthCheck > this.healthCheckInterval) {
      return await this.testConnection();
    }
    
    return true;
  }
  // News operations
  async getNews(): Promise<NewsRow[]> {
    await this.ensureConnection();
    
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async createNews(news: Omit<NewsRow, 'id' | 'created_at' | 'updated_at'>): Promise<NewsRow> {
    await this.ensureConnection();
    
    const { data, error } = await supabase
      .from('news')
      .insert([news])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateNews(id: string, updates: Partial<NewsRow>): Promise<NewsRow> {
    await this.ensureConnection();
    
    const { data, error } = await supabase
      .from('news')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteNews(id: string): Promise<void> {
    await this.ensureConnection();
    
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Services operations
  async getServices(): Promise<ServiceRow[]> {
    await this.ensureConnection();
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async createService(service: Omit<ServiceRow, 'id' | 'created_at' | 'updated_at'>): Promise<ServiceRow> {
    await this.ensureConnection();
    
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateService(id: string, updates: Partial<ServiceRow>): Promise<ServiceRow> {
    await this.ensureConnection();
    
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteService(id: string): Promise<void> {
    await this.ensureConnection();
    
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Incident operations
  async getIncidents(): Promise<IncidentRow[]> {
    await this.ensureConnection();
    
    const { data, error } = await supabase
      .from('incident_reports')
      .select('*')
      .order('date_reported', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async createIncident(incident: Omit<IncidentRow, 'id' | 'date_reported' | 'updated_at' | 'reference_number'>): Promise<IncidentRow> {
    await this.ensureConnection();
    
    const referenceNumber = (incident as any).reference_number || 
      `RD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`;
    
    // Handle image upload if provided
    let imageUrl = null;
    if ((incident as any).imageFile) {
      try {
        const file = (incident as any).imageFile;
        const fileExt = file.name.split('.').pop();
        const fileName = `incident_${referenceNumber}_${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('incidents')
          .upload(fileName, file);

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('incidents')
            .getPublicUrl(fileName);
          imageUrl = publicUrl;
        }
      } catch (uploadError) {
        console.error('Error uploading incident image:', uploadError);
      }
    }

    const { data, error } = await supabase
      .from('incident_reports')
      .insert([{ 
        ...incident, 
        reference_number: referenceNumber,
        reporter_name: (incident as any).reporter_name || (incident as any).reporterName,
        contact_number: (incident as any).contact_number || (incident as any).contactNumber,
        incident_type: (incident as any).incident_type || (incident as any).incidentType,
        image_url: imageUrl || (incident as any).image_url
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateIncident(id: string, updates: Partial<IncidentRow>): Promise<IncidentRow> {
    await this.ensureConnection();
    
    const { data, error } = await supabase
      .from('incident_reports')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteIncident(id: string): Promise<void> {
    await this.ensureConnection();
    
    const { error } = await supabase
      .from('incident_reports')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Gallery operations
  async getGallery(): Promise<GalleryRow[]> {
    await this.ensureConnection();
    
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async createGalleryItem(item: Omit<GalleryRow, 'id' | 'created_at' | 'updated_at'>): Promise<GalleryRow> {
    await this.ensureConnection();
    
    const { data, error } = await supabase
      .from('gallery')
      .insert([item])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateGalleryItem(id: string, updates: Partial<GalleryRow>): Promise<GalleryRow> {
    await this.ensureConnection();
    
    const { data, error } = await supabase
      .from('gallery')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteGalleryItem(id: string): Promise<void> {
    await this.ensureConnection();
    
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Users operations
  async getUsers(): Promise<UserRow[]> {
    await this.ensureConnection();
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async createUser(user: Omit<UserRow, 'id' | 'created_at' | 'updated_at'> & { password?: string }): Promise<UserRow> {
    // This method is deprecated for production use
    // Users should be created through the admin panel or direct database operations
    throw new Error('User creation through this method is not supported in production. Use admin panel instead.');
  }

  async authenticateUser(email: string, password: string): Promise<UserRow | null> {
    await this.ensureConnection();
    
    try {
      // First check if user exists in database
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('status', 'active')
        .single();

      if (userError || !userData) {
        return null;
      }

      // Authenticate with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError || !authData.user) {
        return null;
      }

      return userData;
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }

  async updateUser(id: string, updates: Partial<UserRow>): Promise<UserRow> {
    await this.ensureConnection();
    
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteUser(id: string): Promise<void> {
    await this.ensureConnection();
    
    // Delete from users table first
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;

    // Then delete from Supabase Auth
    const { error: authError } = await supabase.auth.admin.deleteUser(id);
    if (authError) {
      console.warn('Could not delete auth user:', authError);
    }
  }

  // Settings operations
  async getSettings(): Promise<SettingRow[]> {
    await this.ensureConnection();
    
    const { data, error } = await supabase
      .from('system_settings')
      .select('*');
    
    if (error) throw error;
    return data || [];
  }


  async updateSetting(key: string, value: any, type: string = 'string', isPublic: boolean = false): Promise<void> {
    await this.ensureConnection();
    
    const { error } = await supabase
      .from('system_settings')
      .upsert({
        setting_key: key,
        setting_value: JSON.stringify(value),
        setting_type: type,
        is_public: isPublic
      }, {
        onConflict: 'setting_key'
      });

    if (error) throw error;
  }

  // Weather alerts operations
  async getWeatherAlerts(): Promise<AlertRow[]> {
    // You need to implement this method or remove it if not used
    return []; // Placeholder
  }

  // Health check
async healthCheck(): Promise<{ status: 'healthy' | 'unhealthy'; message: string }> {
  try {
    if (!navigator.onLine) {
      return { status: 'unhealthy', message: 'No network connection' };
    }

      
      // Test database connection with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const { error } = await supabase
      .from('your_table')
      .select('*')
      .limit(1)
      .abortSignal(controller.signal);

    clearTimeout(timeoutId);

    if (error) throw error;

    this.lastHealthCheck = Date.now();
    return { status: 'healthy', message: 'Database connection successful' };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return { status: 'unhealthy', message: 'Connection timeout' };
    }
    return {
      status: 'unhealthy',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

  
  // Get connection statistics
  getConnectionStats(): {
    isConnected: boolean;
    lastHealthCheck: number;
    timeSinceLastCheck: number;
  } {
    return {
      isConnected: this.isConnected,
      lastHealthCheck: this.lastHealthCheck,
      timeSinceLastCheck: Date.now() - this.lastHealthCheck
    };
  }
}

export const databaseManager = new DatabaseManager();