import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Shield, AlertTriangle, Loader } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, loading: authLoading, error: authError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/admin');
      }
    } catch (err) {
      console.error('Login submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormLoading = isLoading || authLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-500 p-4 rounded-full shadow-lg">
              <Shield className="h-12 w-12 text-blue-950" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">MDRRMO Admin</h1>
          <p className="text-blue-200">Municipal Disaster Risk Reduction & Management Office</p>
          <p className="text-blue-300 text-sm mt-1">Pio Duran, Albay</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sign In to Dashboard
          </h2>

          {authError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertTriangle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <h4 className="text-red-800 font-medium mb-1">Authentication Error</h4>
                <p className="text-red-600 text-sm">{authError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your email address"
                required
                disabled={isFormLoading}
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-12"
                  placeholder="Enter your password"
                  required
                  disabled={isFormLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  disabled={isFormLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isFormLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isFormLoading ? (
                <>
                  <Loader className="animate-spin mr-2" size={20} />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start">
              <Shield className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
              <div>
                <h3 className="text-sm font-medium text-blue-800 mb-1">Secure Access</h3>
                <p className="text-xs text-blue-700">
                  This system uses Supabase authentication with row-level security. 
                  Only authorized personnel can access the admin dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start">
              <Shield className="text-green-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
              <div>
                <h3 className="text-sm font-medium text-green-800 mb-1">Demo Credentials</h3>
                <div className="text-xs text-green-700 space-y-1">
                  <p><strong>Admin:</strong> admin@mdrrmo.gov.ph / admin123</p>
                  <p><strong>Editor:</strong> editor@mdrrmo.gov.ph / editor123</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-blue-200 text-sm">
            © 2025 MDRRMO Pio Duran, Albay. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;