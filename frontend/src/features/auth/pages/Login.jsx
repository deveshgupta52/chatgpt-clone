import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'


const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { loading,user } = useSelector((state) => state.auth)
  const { handleLogin } = useAuth()
  async function handleSubmit(e) {
    e.preventDefault()
    await handleLogin({ email, password })
    navigate('/')

  }
   if(!loading && user){
    return <Navigate to='/' />
   }


  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary-dim/20 border border-primary/30 flex items-center justify-center neon-glow-purple">
              <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2 font-manrope tracking-tight">Welcome Back</h1>
          <p className="text-on-surface/60 text-sm">Sign in to access ChatGpt</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#0E0E0E] rounded-2xl border border-white/5 p-8 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-error-dim/20 border border-error/40 text-error-container px-4 py-3 rounded-xl text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-on-surface mb-3 tracking-wide">
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-surface-container rounded-xl text-on-surface placeholder-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition border border-white/5 focus:border-primary/20"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-on-surface mb-3 tracking-wide">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-surface-container rounded-xl text-on-surface placeholder-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition border border-white/5 focus:border-primary/20 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface/60 hover:text-on-surface transition"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-end text-sm">

              <a href="#" className="text-primary hover:text-primary-dim transition font-medium">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group mt-8 py-3 px-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary-dim group-hover:via-primary-dim transition-all duration-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(221,183,255,0.6)]"></div>
              <div className="absolute inset-0 bg-white transition-opacity duration-300 bg-white"></div>
              <span className="relative text-black font-bold flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white text-black border-t-transparent rounded-full animate-spin"></span>
                    Signing in...
                  </>
                ) : 'Sign In'}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-on-surface/40 text-xs uppercase tracking-widest font-medium">or</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Social Buttons - Optional */}
          <div className="mt-6 flex gap-3">
            <button 
              type="button" 
              onClick={() => window.location.href = `${(import.meta.env.VITE_API_URL || 'http://localhost:3000').trim()}/api/auth/google`}
              className="flex-1 py-2 px-4 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition text-on-surface text-sm font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-on-surface/60 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-secondary transition font-semibold">
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer Text */}
       
      </div>
    </div>
  )
}

export default Login
