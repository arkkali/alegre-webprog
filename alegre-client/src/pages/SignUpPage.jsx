import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/Button';

const inputClasses = 'mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white/10';
const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    existingUsers.push(formData);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    alert("Account created!");
    navigate('/auth/signin');
  };

  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-white">
      <h1 className="text-3xl font-black">Create Account</h1>
      <p className="mt-2 text-sm text-zinc-400">Join the community today.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <input type="text" placeholder="First Name" className={inputClasses} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
          <input type="text" placeholder="Last Name" className={inputClasses} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
        </div>
        <input type="email" placeholder="Email" className={inputClasses} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="password" placeholder="Password" className={inputClasses} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <Button type="submit" variant="primary" className={actionButtonClassName}>SIGN UP</Button>
      </form>
      <p className="mt-6 text-sm text-zinc-400">
        Already have an account? <Link to="/auth/signin" className="text-white font-semibold hover:underline">Log In</Link>
      </p>
    </div>
  );
};

export default SignUpPage;