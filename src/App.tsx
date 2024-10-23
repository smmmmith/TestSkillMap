import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { OnboardingFlow } from './components/OnboardingFlow';
import { SkillMap } from './pages/SkillMap';
import { Profile } from './pages/Profile';
import { Community } from './pages/Community';
import { Auth } from './pages/Auth';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [onboardingComplete, setOnboardingComplete] = React.useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Navigation />}
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/auth/*"
              element={isAuthenticated ? <Navigate to="/" /> : <Auth />}
            />
            
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <div className="space-y-8">
                    {!user?.goals?.length ? <OnboardingFlow /> : <SkillMap />}
                  </div>
                ) : (
                  <Navigate to="/auth/login" />
                )
              }
            />

            <Route
              path="/skills"
              element={isAuthenticated ? <SkillMap /> : <Navigate to="/auth/login" />}
            />

            <Route
              path="/community"
              element={isAuthenticated ? <Community /> : <Navigate to="/auth/login" />}
            />

            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/auth/login" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;