import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { motion } from 'framer-motion';
import { UserPlus, GraduationCap, Briefcase, ShieldCheck } from 'lucide-react';
import type { UserRole } from '../types';

export default function SignupPage() {
  const navigate = useNavigate();
  const { register, setRole } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setLocalRole] = useState<UserRole>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email, password);
    setRole(role);
    navigate('/discover');
  };

  const roles: { value: UserRole; label: string; icon: React.ReactNode; description: string }[] = [
    { value: 'student', label: 'Student', icon: <GraduationCap size={20} />, description: 'Explore opportunities and connect with mentors' },
    { value: 'professional', label: 'Professional', icon: <Briefcase size={20} />, description: 'Find talent and grow your network' },
    { value: 'admin', label: 'Admin', icon: <ShieldCheck size={20} />, description: 'Platform management and oversight' },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB] text-white font-bold text-xl">
              P
            </div>
            <h1 className="mt-4 text-2xl font-bold text-[#0F172A]">Create your account</h1>
            <p className="mt-1 text-sm text-[#64748B]">Join Tinder For Nerds today</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              label="Full name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0F172A]">I am a...</label>
              <div className="grid gap-2">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setLocalRole(r.value)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                      role === r.value
                        ? 'border-[#2563EB] bg-[#2563EB]/5 ring-1 ring-[#2563EB]'
                        : 'border-[#E2E8F0] hover:border-[#94A3B8] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      role === r.value ? 'bg-[#2563EB] text-white' : 'bg-[#F8FAFC] text-[#64748B]'
                    }`}>
                      {r.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">{r.label}</p>
                      <p className="text-xs text-[#64748B]">{r.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">
              <UserPlus size={16} />
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#64748B]">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#2563EB] hover:text-[#1D4ED8]">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
