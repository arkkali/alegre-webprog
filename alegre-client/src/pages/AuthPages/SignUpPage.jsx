import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';

const inputClasses = 'mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white/10';
const inputErrorClasses = 'mt-2 w-full rounded-xl border border-red-400/60 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:bg-white/10';
const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

function validateSignUp(formData) {
  const errors = {};

  if (!formData.username.trim()) {
    errors.username = 'Please enter a username.';
  } else if (/\s/.test(formData.username)) {
    errors.username = 'Username must not contain spaces.';
  }

  if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  const digitsOnly = formData.contactNumber.replace(/\D/g, '');
  if (digitsOnly.length !== 11) {
    errors.contactNumber = 'Contact number must be exactly 11 digits.';
  }

  if (formData.age === '' || formData.age === null) {
    errors.age = 'Please enter your age.';
  } else if (!/^\d+$/.test(String(formData.age).trim())) {
    errors.age = 'Age must be a number only (no letters or symbols).';
  }

  return errors;
}

const initialSignUpForm = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  contactNumber: '',
  age: '',
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialSignUpForm);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateSignUp(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const toStore = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      username: formData.username.trim(),
      password: formData.password,
      contactNumber: formData.contactNumber.replace(/\D/g, ''),
      age: String(formData.age).trim(),
    };
    existingUsers.push(toStore);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    alert('Account created!');
    navigate('/auth/signin');
  };

  const fieldClass = (name) => (errors[name] ? inputErrorClasses : inputClasses);

  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-white">
      <h1 className="text-3xl font-black">Create Account</h1>
      <p className="mt-2 text-sm text-zinc-400">Join the community today.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <input type="text" placeholder="First Name" className={fieldClass('firstName')} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
          </div>
          <div>
            <input type="text" placeholder="Last Name" className={fieldClass('lastName')} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
          </div>
        </div>
        <div>
          <input type="text" placeholder="Username (no spaces)" autoComplete="username" className={fieldClass('username')} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
          {errors.username && <p className="mt-1 text-xs text-red-400">{errors.username}</p>}
        </div>
        <div>
          <input type="email" placeholder="Email" autoComplete="email" className={fieldClass('email')} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>
        <div>
          <input type="password" placeholder="Password (min. 8 characters)" autoComplete="new-password" className={fieldClass('password')} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
        </div>
        <div>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Contact number (11 digits)"
            className={fieldClass('contactNumber')}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            required
          />
          {errors.contactNumber && <p className="mt-1 text-xs text-red-400">{errors.contactNumber}</p>}
        </div>
        <div>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Age (numbers only)"
            className={fieldClass('age')}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
          />
          {errors.age && <p className="mt-1 text-xs text-red-400">{errors.age}</p>}
        </div>
        <Button type="submit" variant="primary" className={actionButtonClassName}>SIGN UP</Button>
      </form>
      <p className="mt-6 text-sm text-zinc-400">
        Already have an account? <Link to="/auth/signin" className="text-white font-semibold hover:underline">Log In</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
