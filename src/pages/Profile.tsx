import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Settings } from 'lucide-react';

export function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-indigo-100 p-3 rounded-full">
            <User className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user?.name || 'User Profile'}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Settings</h3>
            <Settings className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}