import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      const response = await fetch('http://localhost:8080/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password
        }),
      });
      
      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      // Check if there's content before parsing
      const contentType = response.headers.get("content-type");
      let data = {};
      
      if (contentType && contentType.includes("application/json") && response.status !== 204) {
        try {
          data = await response.json();
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          throw new Error('Invalid response format from server');
        }
      }
        setSuccess(activeTab === 'login' ? 'Login successful!' : 'Account created successfully!');
      console.log('API response:', data);
      
      // Store user info in localStorage if available
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.userId) {
        localStorage.setItem('userId', data.userId);
      }
      localStorage.setItem('username', email);
      
      // Navigate to home page after a brief delay to show the success message
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (err) {
      console.error('Error during request:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f472b6 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <div 
        className="max-w-md"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '32px'
        }}
      >
        {/* Header */}
        <h2 
          className="text-center mb-6"
          style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 24px 0'
          }}
        >
          Login Form
        </h2>

        {/* Tab Navigation */}
        <div 
          className="flex mb-6"
          style={{
            display: 'flex',
            marginBottom: '24px',
            borderRadius: '6px',
            overflow: 'hidden'
          }}
        >
          <button
            onClick={() => setActiveTab('login')}
            style={{
              flex: '1',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: activeTab === 'login' ? '#a855f7' : '#f3f4f6',
              color: activeTab === 'login' ? '#ffffff' : '#6b7280',
              borderTopLeftRadius: '6px',
              borderBottomLeftRadius: '6px'
            }}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            style={{
              flex: '1',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: activeTab === 'signup' ? '#a855f7' : '#f3f4f6',
              color: activeTab === 'signup' ? '#ffffff' : '#6b7280',
              borderTopRightRadius: '6px',
              borderBottomRightRadius: '6px'
            }}
          >
            Signup
          </button>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}
        
        {success && (
          <div style={{
            backgroundColor: '#dcfce7',
            color: '#15803d',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {success}
          </div>
        )}

        {/* Form */}
        <div style={{ marginBottom: '16px' }}>
          {/* Username Input - changed from Email Input */}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#a855f7';
                e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#a855f7';
                e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          {/* Forgot Password Link */}
          {activeTab === 'login' && (
            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ec4899',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  padding: '0',
                  fontFamily: 'inherit'
                }}
                onMouseOver={(e) => e.target.style.color = '#db2777'}
                onMouseOut={(e) => e.target.style.color = '#ec4899'}
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#d1d5db' : 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              color: loading ? '#6b7280' : '#ffffff',
              padding: '12px 16px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.background = 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)';
                e.target.style.transform = 'scale(1.02)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.background = 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              activeTab === 'login' ? 'Login' : 'Sign Up'
            )}
          </button>
        </div>

        {/* Bottom Link */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <span style={{ color: '#6b7280', fontSize: '14px' }}>
            {activeTab === 'login' ? "Not a member? " : "Already have an account? "}
            <button
              onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#ec4899',
                fontWeight: '500',
                cursor: 'pointer',
                textDecoration: 'none',
                padding: '0',
                fontSize: '14px',
                fontFamily: 'inherit'
              }}
              onMouseOver={(e) => e.target.style.color = '#db2777'}
              onMouseOut={(e) => e.target.style.color = '#ec4899'}
            >
              {activeTab === 'login' ? 'Signup now' : 'Login now'}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}