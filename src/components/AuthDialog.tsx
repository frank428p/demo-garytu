'use client';

import {
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
} from 'react';
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
import {
  useEmailLogin,
  useEmailRegister,
  useVerifyEmailRegister,
  useForgotPassword,
  useVerifyForgotPassword,
} from '@/@core/useQuery/useAuth';
import { useTranslations } from 'next-intl';
import { ApiError } from '@/@core/api/fetchClient';

type SignupStep = 'method' | 'otp';
type LoginStep = 'login' | 'forgot-email' | 'forgot-otp';

function GoogleButton({ label }: { label: string }) {
  const handleClick = () => {
    // Do NOT encodeURIComponent here — searchParams.set encodes it once automatically
    const returnTo = window.location.pathname + window.location.search;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`;

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set(
      'client_id',
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    );
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'openid email profile');
    authUrl.searchParams.set('state', returnTo);

    window.location.href = authUrl.toString();
  };

  return (
    <Button
      variant="outline"
      className="w-full gap-2 bg-card"
      type="button"
      onClick={handleClick}
    >
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

function LoginView({ onSwitchToSignup, onForgotPassword }: { onSwitchToSignup: () => void; onForgotPassword: () => void }) {
  const tError = useTranslations('error');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const { closeAuth } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authError = params.get('auth_error');
    if (!authError) return;
    if (authError === 'email_conflict') setError(tError('1008'));
    params.delete('auth_error');
    const newUrl =
      window.location.pathname + (params.toString() ? '?' + params : '');
    window.history.replaceState(null, '', newUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { mutate: login, isPending } = useEmailLogin();

  const handleLogin = () => {
    setFormError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError(tError('error_email_regex'));
      return;
    }
    if (password.length < 8) {
      setFormError(tError('error_password_min'));
      return;
    }
    if (!/\d/.test(password)) {
      setFormError(tError('error_password_number'));
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setFormError(tError('error_password_uppercase'));
      return;
    }
    setError('');
    login(
      { email, password },
      {
        onSuccess: () => closeAuth(),
        onError: (err) => {
          if (err instanceof ApiError) {
            console.log(err.code); // body.code（API 自定義錯誤碼）
            console.log(err.status); // HTTP status code
            setError(tError(err.code.toString()));
            return;
          }
          setError('Email 或密碼錯誤，請再試一次');
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle className="text-center text-xl">
          Welcome to GARYTU AI
        </DialogTitle>
        <DialogDescription className="text-center">
          Sign in to your account to continue
        </DialogDescription>
      </DialogHeader>

      <GoogleButton label="Continue with Google" />

      <Divider />

      {error && (
        <div className="bg-primary/20 text-destructive rounded-md p-2 text-sm">
          {error}
        </div>
      )}

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

      {formError && <p className="text-sm text-destructive">{formError}</p>}

      <Button
        className="w-full"
        type="button"
        onClick={handleLogin}
        disabled={isPending}
      >
        {isPending ? 'Signing in…' : 'Login'}
      </Button>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-muted-foreground text-left cursor-pointer hover:underline hover:text-foreground"
        >
          Forgot password?
        </button>
        <p className="text-sm text-muted-foreground text-right">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-medium text-foreground cursor-pointer hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

// ─── Forgot Password ──────────────────────────────────────────────────────────

function ForgotPasswordEmailView({ onNext, onBack }: { onNext: (email: string) => void; onBack: () => void }) {
  const tError = useTranslations('error');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [error, setError] = useState('');
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = () => {
    setFormError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError(tError('error_email_regex'));
      return;
    }
    setError('');
    forgotPassword(
      { email },
      {
        onSuccess: () => onNext(email),
        onError: (err) => {
          if (err instanceof ApiError) {
            setError(tError(err.code.toString()));
            return;
          }
          setError('Something went wrong. Please try again.');
        },
      },
    );
  };

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
        <DialogTitle className="text-lg">Forgot password</DialogTitle>
      </div>

      <DialogDescription>
        Enter your email address and we&apos;ll send you a verification code to reset your password.
      </DialogDescription>

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />

      {formError && <p className="text-sm text-destructive">{formError}</p>}
      {error && (
        <div className="bg-primary/20 text-destructive rounded-md p-2 text-sm">
          {error}
        </div>
      )}

      <Button className="w-full" type="button" onClick={handleSubmit} disabled={isPending}>
        {isPending ? 'Sending…' : 'Send verification code'}
      </Button>
    </div>
  );
}

function ForgotPasswordOtpView({
  email,
  onBack,
  onDone,
}: {
  email: string;
  onBack: () => void;
  onDone: () => void;
}) {
  const tError = useTranslations('error');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [error, setError] = useState('');
  const { mutate: verify, isPending } = useVerifyForgotPassword();

  const isFull = otp.every((d) => d !== '');

  const handleVerify = () => {
    setFormError('');
    if (newPassword.length < 8) {
      setFormError(tError('error_password_min'));
      return;
    }
    if (!/\d/.test(newPassword)) {
      setFormError(tError('error_password_number'));
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setFormError(tError('error_password_uppercase'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setFormError(tError('error_password_confirm'));
      return;
    }
    setError('');
    verify(
      { email, otp: otp.join(''), new_password: newPassword },
      {
        onSuccess: () => onDone(),
        onError: (err) => {
          if (err instanceof ApiError) {
            setError(tError(err.code.toString()));
            return;
          }
          setError('Invalid code. Please try again.');
        },
      },
    );
  };

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
        <DialogTitle className="text-lg">Reset password</DialogTitle>
      </div>

      <DialogDescription>
        Enter the 6-digit code sent to{' '}
        <span className="font-medium text-foreground">{email}</span> and your new password.
      </DialogDescription>

      <OtpInput value={otp} onChange={setOtp} />

      <div className="flex flex-col gap-3">
        <PasswordInput
          placeholder="New password"
          value={newPassword}
          onChange={setNewPassword}
        />
        <PasswordInput
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
      </div>

      {formError && <p className="text-sm text-destructive">{formError}</p>}
      {error && (
        <div className="bg-primary/20 text-destructive rounded-md p-2 text-sm">
          {error}
        </div>
      )}

      <Button
        className="w-full"
        type="button"
        disabled={!isFull || isPending}
        onClick={handleVerify}
      >
        {isPending ? 'Resetting…' : 'Reset password'}
      </Button>
    </div>
  );
}

// ─── Signup ───────────────────────────────────────────────────────────────────

type SignupData = { email: string; password: string };

function SignupMethodView({ onNext, onSwitchToLogin }: { onNext: (data: SignupData) => void; onSwitchToLogin: () => void }) {
  const tError = useTranslations('error');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const { mutate: register, isPending } = useEmailRegister();

  const handleNext = () => {
    setFormError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError(tError('error_email_regex'));
      return;
    }
    if (password.length < 8) {
      setFormError(tError('error_password_min'));
      return;
    }
    if (!/\d/.test(password)) {
      setFormError(tError('error_password_number'));
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setFormError(tError('error_password_uppercase'));
      return;
    }
    if (password !== confirmPassword) {
      setFormError(tError('error_password_confirm'));
      return;
    }
    setError('');
    register(
      { email, password },
      {
        onSuccess: () => onNext({ email, password }),
        onError: (err) => {
          if (err instanceof ApiError) {
            console.log(err.code); // body.code（API 自定義錯誤碼）
            console.log(err.status); // HTTP status code
            setError(tError(err.code.toString()));
            return;
          }
          setError('Email 或密碼錯誤，請再試一次');
        },
      },
    );
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

      {error && (
        <div className="bg-primary/20 text-destructive rounded-md p-2 text-sm">
          {error}
        </div>
      )}

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
        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
      </div>

      {formError && <p className="text-sm text-destructive">{formError}</p>}

      <Button
        className="w-full"
        type="button"
        onClick={handleNext}
        disabled={isPending}
      >
        {isPending ? 'Sending code…' : 'Next'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-medium text-foreground cursor-pointer hover:underline"
        >
          Log in
        </button>
      </p>
    </div>
  );
}

function SignupOtpView({
  signupData,
  onBack,
  onDone,
}: {
  signupData: SignupData;
  onBack: () => void;
  onDone: () => void;
}) {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const { mutate: verify, isPending: isVerifying } = useVerifyEmailRegister();
  const { mutate: login, isPending: isLoggingIn } = useEmailLogin();

  const isPending = isVerifying || isLoggingIn;
  const isFull = otp.every((d) => d !== '');

  const handleVerify = () => {
    setError('');
    verify(
      { email: signupData.email, otp: otp.join('') },
      {
        onSuccess: () => {
          login(
            { email: signupData.email, password: signupData.password },
            {
              onSuccess: () => onDone(),
              onError: () => onDone(),
            },
          );
        },
        onError: () => setError('Invalid code. Please try again.'),
      },
    );
  };

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
        <span className="font-medium text-foreground">{signupData.email}</span>.
        Please enter it below.
      </DialogDescription>

      <OtpInput value={otp} onChange={setOtp} />

      {error && <p className="text-sm text-destructive text-center">{error}</p>}

      <Button
        className="w-full"
        type="button"
        disabled={!isFull || isPending}
        onClick={handleVerify}
      >
        {isPending ? 'Verifying…' : 'Verify & complete sign up'}
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
  const { authMode, closeAuth, openLogin, openSignup } = useAuth();

  const [loginStep, setLoginStep] = useState<LoginStep>('login');
  const [forgotEmail, setForgotEmail] = useState('');
  const [signupStep, setSignupStep] = useState<SignupStep>('method');
  const [signupData, setSignupData] = useState<SignupData>({
    email: '',
    password: '',
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeAuth();
      setLoginStep('login');
      setForgotEmail('');
      setSignupStep('method');
      setSignupData({ email: '', password: '' });
    }
  };

  const handleSwitchToSignup = () => {
    openSignup();
    setSignupStep('method');
  };

  return (
    <Dialog open={authMode !== null} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[460px]">
        {authMode === 'login' && loginStep === 'login' && (
          <LoginView
            onSwitchToSignup={handleSwitchToSignup}
            onForgotPassword={() => setLoginStep('forgot-email')}
          />
        )}

        {authMode === 'login' && loginStep === 'forgot-email' && (
          <ForgotPasswordEmailView
            onNext={(email) => {
              setForgotEmail(email);
              setLoginStep('forgot-otp');
            }}
            onBack={() => setLoginStep('login')}
          />
        )}

        {authMode === 'login' && loginStep === 'forgot-otp' && (
          <ForgotPasswordOtpView
            email={forgotEmail}
            onBack={() => setLoginStep('forgot-email')}
            onDone={() => {
              closeAuth();
              setLoginStep('login');
              setForgotEmail('');
            }}
          />
        )}

        {authMode === 'signup' && signupStep === 'method' && (
          <SignupMethodView
            onNext={(data) => {
              setSignupData(data);
              setSignupStep('otp');
            }}
            onSwitchToLogin={openLogin}
          />
        )}

        {authMode === 'signup' && signupStep === 'otp' && (
          <SignupOtpView
            signupData={signupData}
            onBack={() => setSignupStep('method')}
            onDone={() => {
              closeAuth();
              setSignupStep('method');
              setSignupData({ email: '', password: '' });
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
