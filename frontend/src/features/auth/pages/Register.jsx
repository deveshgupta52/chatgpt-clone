import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useSelector, useDispatch } from 'react-redux'
import { setError } from '../auth.slice'
import EmailVerificationModal from '../components/EmailVerificationModal'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const {loading,user,error}=useSelector((state)=>state.auth)
  const {handleRegister}=useAuth()

  const handleChangeEmail = () => {
    console.log("clicked")
    setShowVerificationModal(false)
    setEmail('')
    setPassword('')
    // Focus on email input
    setTimeout(() => {
      document.getElementById('email')?.focus()
    }, 100)
  }

  const clearError = () => {
    dispatch(setError(null))
  }

async function handleSubmit(e){
  e.preventDefault()
  const result = await handleRegister({username,email,password})
  if (result?.success) {
    setShowVerificationModal(true)
  }
}
 

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-secondary/5 via-transparent to-primary/5"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary-dim/20 border border-secondary/30 flex items-center justify-center neon-glow-cyan">
              <span className="material-symbols-outlined text-secondary text-2xl">person_add</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-secondary mb-2 font-manrope tracking-tight">Create Account</h1>
          <p className="text-on-surface/60 text-sm">Join ChatGpt today</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#0E0E0E] rounded-2xl border border-white/5 p-8 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-error-dim/20 border border-error/40 text-error-container px-4 py-3 rounded-xl text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </div>
              </div>
            )}

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-on-surface mb-3 tracking-wide">
                USERNAME
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={username}
                onChange={(e)=>{setUsername(e.target.value); clearError()}}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-surface-container rounded-xl text-on-surface placeholder-on-surface/30 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition border border-white/5 focus:border-secondary/20"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-on-surface mb-3 tracking-wide">
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value); clearError()}}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-surface-container rounded-xl text-on-surface placeholder-on-surface/30 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition border border-white/5 focus:border-secondary/20"
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
                  name="password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value); clearError()}}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-surface-container rounded-xl text-on-surface placeholder-on-surface/30 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition border border-white/5 focus:border-secondary/20 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface/60 hover:text-on-surface transition"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
           

            {/* Terms & Conditions */}
           

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group mt-8 py-3 px-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary to-secondary-dim group-hover:via-secondary-dim transition-all duration-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(0,229,255,0.6)]"></div>
              <div className="absolute inset-0 bg-white transition-opacity duration-300 bg-white"></div>
              <span className="relative text-black font-bold flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Creating Account...
                  </>
                ) : 'Sign Up'}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-on-surface/40 text-xs uppercase tracking-widest font-medium">or</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Social Buttons */}
          <div className="mt-6 flex gap-3">
            <button type="button" className="flex-1 py-2 px-4 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition text-on-surface text-sm font-medium flex items-center justify-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            
          </div>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-on-surface/60 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary hover:text-secondary-dim transition font-semibold">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer Text */}
       
      </div>

      {/* Email Verification Modal */}
      {showVerificationModal && (
        <EmailVerificationModal
          email={email}
          onChangeEmail={handleChangeEmail}
        />
      )}
    </div>
  )
}

export default Register
