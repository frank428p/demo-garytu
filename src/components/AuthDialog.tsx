'use client';

import { useRef, useState, KeyboardEvent, ClipboardEvent } from 'react';
import { signIn } from 'next-auth/react';
import { IconArrowLeft, IconEye, IconEyeOff } from '@tabler/icons-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/@core/provider/authContext';

type SignupStep = 'method' | 'otp';

function GoogleButton({ label }: { label: string }) {
  return (
    <Button variant="outline" className="w-full gap-2" type="button" onClick={() => signIn('google')}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      {label}
    </Button>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <span className="flex-1 border-t border-border" />
      or
      <span className="flex-1 border-t border-border" />
    </div>
  );
}

function PasswordInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        tabIndex={-1}
      >
        {show ? <IconEyeOff size={16} /> : <IconEye size={16} />}
      </button>
    </div>
  );
}

function OtpInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, char: string) => {
    if (!/^\d?$/.test(char)) return;
    const next = [...value];
    next[index] = char;
    onChange(next);
    if (char && index < 5) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    const next = Array(6).fill('');
    digits.split('').forEach((d, i) => (next[i] = d));
    onChange(next);
    const focusIdx = Math.min(digits.length, 5);
    refs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex justify-center gap-2">
      {value.map((digit, i) => (
        <Input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="h-12 w-10 px-0 text-center text-lg font-semibold"
        />
      ))}
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────

function LoginView({ onSwitchToSignup }: { onSwitchToSignup: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle className="text-center text-xl">Welcome back</DialogTitle>
        <DialogDescription className="text-center">
          Sign in to your account to continue
        </DialogDescription>
      </DialogHeader>

      <GoogleButton label="Continue with Google" />

      <Divider />

      <div className="flex flex-col gap-3">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />
      </div>

      <Button className="w-full" type="button">
        Login
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}

// ─── Signup ───────────────────────────────────────────────────────────────────

function SignupMethodView({ onNext }: { onNext: (email: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!name) return setError('Please enter your name');
    if (!email) return setError('Please enter your email');
    if (password.length < 8)
      return setError('Password must be at least 8 characters');
    setError('');
    onNext(email);
  };

  return (
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle className="text-center text-xl">
          Create an account
        </DialogTitle>
        <DialogDescription className="text-center">
          Choose how you&apos;d like to sign up
        </DialogDescription>
      </DialogHeader>

      <GoogleButton label="Continue with Google" />

      <Divider />

      <div className="flex flex-col gap-3">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          placeholder="Password (min. 8 characters)"
          value={password}
          onChange={setPassword}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button className="w-full" type="button" onClick={handleNext}>
        Next
      </Button>
    </div>
  );
}

function SignupOtpView({
  email,
  onBack,
}: {
  email: string;
  onBack: () => void;
}) {
  const [otp, setOtp] = useState(Array(6).fill(''));

  const isFull = otp.every((d) => d !== '');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <IconArrowLeft size={18} />
        </button>
        <DialogTitle className="text-lg">Verify your email</DialogTitle>
      </div>

      <DialogDescription>
        We sent a 6-digit code to{' '}
        <span className="font-medium text-foreground">{email}</span>. Please
        enter it below.
      </DialogDescription>

      <OtpInput value={otp} onChange={setOtp} />

      <Button className="w-full" type="button" disabled={!isFull}>
        Verify &amp; complete sign up
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Didn&apos;t receive it?{' '}
        <button
          type="button"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Resend code
        </button>
      </p>
    </div>
  );
}

// ─── Root Dialog ──────────────────────────────────────────────────────────────

export function AuthDialog() {
  const { authMode, closeAuth, openSignup, openLogin } = useAuth();

  const [signupStep, setSignupStep] = useState<SignupStep>('method');
  const [signupEmail, setSignupEmail] = useState('');

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeAuth();
      setSignupStep('method');
      setSignupEmail('');
    }
  };

  const handleSwitchToSignup = () => {
    openSignup();
    setSignupStep('method');
  };

  return (
    <Dialog open={authMode !== null} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[420px]">
        {authMode === 'login' && (
          <LoginView onSwitchToSignup={handleSwitchToSignup} />
        )}

        {authMode === 'signup' && signupStep === 'method' && (
          <SignupMethodView
            onNext={(email) => {
              setSignupEmail(email);
              setSignupStep('otp');
            }}
          />
        )}

        {authMode === 'signup' && signupStep === 'otp' && (
          <SignupOtpView
            email={signupEmail}
            onBack={() => setSignupStep('method')}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
