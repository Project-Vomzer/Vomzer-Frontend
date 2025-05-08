import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Animation for the gradient background
  const [gradientPos, setGradientPos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setGradientPos({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const registerData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      // On success, redirect to login page
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Google signup failed');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    setError('Google signup failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div 
        className="min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(
            circle at ${50 + gradientPos.x * 20}% ${50 + gradientPos.y * 20}%, 
            #6e45e2, 
            #88d3ce, 
            #f77062
          )`,
          transition: 'background 0.3s ease-out'
        }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
        >
          {/* Floating particles */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-500/20"
              initial={{
                x: Math.random() * 300 - 150,
                y: Math.random() * 300 - 150,
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                opacity: Math.random() * 0.5 + 0.1
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          ))}

          <div className="relative z-10">
            <motion.h2 
              className="text-4xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Join Vomzer Socials
            </motion.h2>

            {error && (
              <motion.div 
                className="bg-red-500/10 text-red-600 p-3 rounded-lg mb-4 text-center border border-red-500/20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.div>
            )}

            {/* Google Signup */}
            <motion.div 
              className="mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled || loading}
                    className="w-full flex items-center justify-center bg-white border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.98h3.86c2.26-2.09 3.56-5.17 3.56-8.8z"
                      />
                      <path
                        fill="currentColor"
                        d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.98c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.505 21.36 7.605 24 12.255 24z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.525 14.29c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.545C.585 8.47.255 10.43.255 12.29c0 1.86.33 3.82 1.29 5.67l3.98-3.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12.255 4.75c1.77 0 3.35.61 4.6 1.81l3.42-3.42C18.205 1.14 15.495 0 12.255 0 7.605 0 3.505 2.64 1.545 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                      />
                    </svg>
                    Sign up with Google
                  </button>
                )}
              />
            </motion.div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white/90 px-2 text-gray-500">or continue with</span>
              </div>
            </div>

            {/* Manual Signup Form */}
            <form onSubmit={handleManualSubmit} className="space-y-6">
              {/* Username */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md"
                  placeholder="Enter your username"
                />
              </motion.div>

              {/* Email */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md"
                  placeholder="Enter your email"
                />
              </motion.div>

              {/* Password */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md"
                  placeholder="Enter your password"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl text-white transition-all duration-500 shadow-lg ${
                  loading ? 'bg-purple-400' : 'bg-gradient-to-r from-purple-600 to-pink-500'
                }`}
                whileHover={!loading ? { scale: 1.03 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <motion.span 
                  animate={isHovered ? { x: [0, 2, -2, 2, -2, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating your account...
                    </span>
                  ) : (
                    'Get Started'
                  )}
                </motion.span>
              </motion.button>
            </form>

            <motion.p 
              className="mt-6 text-center text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Already have an account?{' '}
              <a 
                href="/login" 
                className="text-purple-600 hover:text-purple-800 font-medium hover:underline transition-colors duration-300"
              >
                Log in
              </a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;