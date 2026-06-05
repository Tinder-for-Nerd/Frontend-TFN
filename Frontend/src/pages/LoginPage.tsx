import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/discover');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB] text-white font-bold text-xl">
              P
            </div>
            <h1 className="mt-4 text-2xl font-bold text-[#0F172A]">Welcome back</h1>
            <p className="mt-1 text-sm text-[#64748B]">Sign in to your ProMatch account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-xs text-[#EF4444]">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn size={16} />
                  Sign in
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 rounded-xl bg-[#F8FAFC] p-3 space-y-2">
            <p className="text-xs font-medium text-[#64748B]">Demo credentials (password: demo123):</p>
            <div className="space-y-1.5">
              <p className="text-xs text-[#2563EB] font-medium">Admin Portal</p>
              <p className="text-xs text-[#64748B]">admin123@gmail.com</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs text-[#059669] font-medium">Professional Dashboard</p>
              <p className="text-xs text-[#64748B]">sarah@example.com</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs text-[#D97706] font-medium">Student Portal</p>
              <p className="text-xs text-[#64748B]">mike@example.com</p>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-[#64748B]">
            Don't have an account?{' '}
            <Link to="/" className="font-medium text-[#2563EB] hover:text-[#1D4ED8]">
              Learn more
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
