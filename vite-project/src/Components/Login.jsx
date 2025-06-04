import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, signup, error: authError } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Add login-page class to body when component mounts
  useEffect(() => {
    document.body.classList.add('login-page');
    
    // Remove the class when component unmounts
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);
  
  const handleSubmit = async () => {
    // Reset states
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    try {
      let result;
      
      if (activeTab === 'login') {
        result = await login(email, password);
      } else {
        result = await signup(email, password);
      }
      
      if (result) {
        setSuccess(activeTab === 'login' ? 'Login successful!' : 'Account created successfully!');
        
        // Navigate to dashboard after a brief delay to show the success message
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setError(authError || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during authentication:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Icon style for user and lock icons
  const iconStyle = { 
    width: '16px', 
    height: '16px', 
    flexShrink: 0
  };
  return (
    <div className="h-full min-h-screen flex flex-col items-center justify-center w-full text-white login-container">
      <div className="text-center mb-6 w-full max-w-sm mx-auto">
        <h1 className="text-2xl font-bold mb-8">Welcome to Your Journal</h1>
        
        <div className="inline-flex space-x-6 mb-8 tab-container">
          <button
            onClick={() => setActiveTab('login')}
            className={`px-6 py-2 text-sm rounded-md ${activeTab === 'login' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`px-6 py-2 text-sm rounded-md ${activeTab === 'signup' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
          >
            Create Account
          </button>
        </div>
        
        <div className="w-full max-w-xs mx-auto input-field-container">
          {error && <div className="text-red-500 mb-4 text-sm message-container">
            <svg className="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{color: '#ef4444'}}>
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>}
          
          {success && <div className="text-green-500 mb-4 text-sm message-container">
            <svg className="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{color: '#22c55e'}}>
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
            <span>{success}</span>
          </div>}
          
          <div className="mb-5 text-left">
            <div className="flex items-center mb-2 input-icon">
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="user-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <label htmlFor="email" className="text-sm">Username</label>
            </div>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white text-black text-sm rounded-md"
              disabled={loading}
            />
          </div>
          
          <div className="mb-8 text-left">
            <div className="flex items-center mb-2 input-icon">
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="lock-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <label htmlFor="password" className="text-sm">Password</label>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white text-black text-sm rounded-md"
              disabled={loading}
            />
          </div>
            <button
            type="button"
            onClick={handleSubmit}
            className="action-button w-full py-3 px-4 rounded-md text-sm font-medium mb-6"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Processing...
              </>
            ) : (
              activeTab === 'login' ? 'Sign in to your journal' : 'Create your account'
            )}
          </button>
          
          {activeTab === 'login' && (
            <div className="mt-6 text-sm">
              <p className="mb-4">Don't have an account?</p>              <button 
                onClick={() => setActiveTab('signup')} 
                className="py-2 px-6 bg-white text-black text-sm rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Create one now
              </button>
            </div>
          )}
          
          {activeTab === 'signup' && (
            <div className="mt-6 text-sm">
              <p className="mb-4">Already have an account?</p>              <button 
                onClick={() => setActiveTab('login')} 
                className="py-2 px-6 bg-white text-black text-sm rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Sign in instead
              </button>
            </div>
          )}
        </div>
      
        <div className="text-center mt-8 text-xs text-gray-500">
          By continuing, you agree to our <span className="text-purple-600 hover:text-pink-500 cursor-pointer">Terms of Service</span> and <span className="text-purple-600 hover:text-pink-500 cursor-pointer">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
}