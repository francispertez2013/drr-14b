import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Settings,
  Wifi,
  WifiOff,
  ExternalLink
} from 'lucide-react';
import { useDatabase } from '../contexts/DatabaseContext';
import { supabaseSetup } from '../utils/supabaseSetup';
import ModernCard from './ModernCard';
import ModernButton from './ModernButton';

const ConnectionStatus: React.FC = () => {
  const { isConnected, connectionError, testConnection } = useDatabase();
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    setIsRunningDiagnostics(true);
    try {
      const results = await supabaseSetup.runDiagnostics();
      setDiagnostics(results);
    } catch (error) {
      console.error('Diagnostics failed:', error);
    } finally {
      setIsRunningDiagnostics(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'error':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Database className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <ModernCard variant="glass" className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {isConnected ? (
            <Wifi className="text-green-500" size={24} />
          ) : (
            <WifiOff className="text-red-500" size={24} />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Database Connection</h3>
            <p className="text-sm text-gray-600">
              {isConnected ? 'Connected to Supabase' : 'Connection Failed'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <ModernButton
            onClick={runDiagnostics}
            disabled={isRunningDiagnostics}
            loading={isRunningDiagnostics}
            variant="secondary"
            size="sm"
            icon={RefreshCw}
          >
            Run Diagnostics
          </ModernButton>
          <ModernButton
            onClick={() => setShowDetails(!showDetails)}
            variant="ghost"
            size="sm"
            icon={Settings}
          >
            {showDetails ? 'Hide' : 'Show'} Details
          </ModernButton>
        </div>
      </div>

      {/* Connection Status */}
      <div className={`border rounded-lg p-4 mb-4 ${
        isConnected 
          ? 'bg-green-50 border-green-200' 
          : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center space-x-2">
          {getStatusIcon(isConnected ? 'healthy' : 'error')}
          <span className={`font-medium ${isConnected ? 'text-green-800' : 'text-red-800'}`}>
            {isConnected ? 'Database Connected' : 'Database Disconnected'}
          </span>
        </div>
        {connectionError && (
          <p className="text-sm text-red-700 mt-2">{connectionError}</p>
        )}
      </div>

      {/* Diagnostics Results */}
      {diagnostics && showDetails && (
        <div className="space-y-4">
          {/* Overall Status */}
          <div className={`border rounded-lg p-4 ${getStatusColor(diagnostics.overall)}`}>
            <div className="flex items-center space-x-2 mb-2">
              {getStatusIcon(diagnostics.overall)}
              <span className="font-medium">
                Overall Status: {diagnostics.overall.charAt(0).toUpperCase() + diagnostics.overall.slice(1)}
              </span>
            </div>
          </div>

          {/* Environment Variables */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Environment Variables</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span>Configuration Status:</span>
                <span className={diagnostics.environment.valid ? 'text-green-600' : 'text-red-600'}>
                  {diagnostics.environment.valid ? '✓ Valid' : '✗ Invalid'}
                </span>
              </div>
              {diagnostics.environment.issues.length > 0 && (
                <div className="mt-2">
                  <p className="text-red-600 font-medium">Issues:</p>
                  <ul className="list-disc list-inside text-red-600 text-xs">
                    {diagnostics.environment.issues.map((issue: string, index: number) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Database Tables */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Database Tables</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(diagnostics.connection.tables).map(([table, exists]) => (
                <div key={table} className="flex items-center justify-between">
                  <span className="capitalize">{table}:</span>
                  <span className={exists ? 'text-green-600' : 'text-red-600'}>
                    {exists ? '✓' : '✗'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {diagnostics.recommendations.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Recommendations</h4>
              <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                {diagnostics.recommendations.map((rec: string, index: number) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Last checked: {new Date().toLocaleTimeString()}
        </div>
        <div className="flex space-x-2">
          <ModernButton
            onClick={testConnection}
            variant="secondary"
            size="sm"
          >
            Test Connection
          </ModernButton>
          <ModernButton
            onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
            variant="ghost"
            size="sm"
            icon={ExternalLink}
          >
            Supabase Dashboard
          </ModernButton>
        </div>
      </div>
    </ModernCard>
  );
};

export default ConnectionStatus;