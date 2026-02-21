'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthContext';
import { uploadFiles } from '@/utils/uploadthing';

type Step = 'form' | 'payment' | 'success';

export default function RegisterPage() {
    const router = useRouter();
    const { refresh } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [step, setStep] = useState<Step>('form');

    // Form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [college, setCollege] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Status flags
    const [otpSent, setOtpSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [paymentScreenshot, setPaymentScreenshot] = useState<string | null>(null);
    const [paymentFile, setPaymentFile] = useState<File | null>(null);
    const [paymentVerified, setPaymentVerified] = useState(false);

    // Loading / error
    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [otpError, setOtpError] = useState('');
    const [registrationId, setRegistrationId] = useState('');

    // ── SEND OTP ─────────────────────────────────────────────────────────────
    async function handleSendOTP() {
        setError('');
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Enter a valid email address first.');
            return;
        }
        setSending(true);
        try {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setOtpSent(true);
            setOtpError('');
        } catch (e: unknown) {
            setError((e as Error).message || 'Failed to send OTP');
        } finally {
            setSending(false);
        }
    }

    // ── VERIFY OTP ────────────────────────────────────────────────────────────
    async function handleVerifyOTP() {
        setOtpError('');
        if (!otp.trim()) { setOtpError('Enter the OTP.'); return; }
        setVerifying(true);
        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setEmailVerified(true);
            setOtpError('');
        } catch (e: unknown) {
            setOtpError((e as Error).message || 'Invalid OTP');
        } finally {
            setVerifying(false);
        }
    }

    // ── PAYMENT SCREENSHOT ────────────────────────────────────────────────────
    function handleScreenshot(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setPaymentFile(file);
        const reader = new FileReader();
        reader.onload = () => {
            setPaymentScreenshot(reader.result as string);
            setPaymentVerified(true);
        };
        reader.readAsDataURL(file);
    }

    // ── FORM → PAYMENT ────────────────────────────────────────────────────────
    function handleProceedToPayment(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        if (!name.trim()) { setError('Name is required.'); return; }
        if (!emailVerified) { setError('Please verify your email first.'); return; }
        if (!phone.trim() || !/^\+?[\d\s-]{10,}$/.test(phone)) {
            setError('Enter a valid phone number.'); return;
        }
        if (!college.trim()) { setError('College / Institution name is required.'); return; }
        if (!gender) { setError('Please select your gender.'); return; }
        if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
        if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
        setStep('payment');
    }

    // ── FINAL SUBMIT ──────────────────────────────────────────────────────────
    async function handleSubmit() {
        if (!paymentVerified || !paymentFile) {
            setError('Please upload the payment screenshot first.');
            return;
        }
        setError('');
        setSubmitting(true);
        try {
            // Upload the screenshot file to UploadThing
            let savedUrl = '';
            try {
                const uploadRes = await uploadFiles("paymentScreenshot", {
                    files: [paymentFile],
                });
                if (uploadRes && uploadRes.length > 0) {
                    savedUrl = uploadRes[0].url;
                } else {
                    throw new Error("No URL returned from upload");
                }
            } catch (err) {
                console.error("Upload Error:", err);
                throw new Error("Screenshot upload failed. Please try again.");
            }

            // Step 2: Register with the uploaded URL
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    email,
                    phone: phone.trim(),
                    college: college.trim(),
                    gender,
                    password,
                    emailVerified,
                    paymentVerified,
                    paymentScreenshot: savedUrl,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setRegistrationId(data.registrationId);
            await refresh();
            setStep('success');
        } catch (e: unknown) {
            setError((e as Error).message || 'Registration failed');
        } finally {
            setSubmitting(false);
        }
    }


    // ── SUCCESS SCREEN ────────────────────────────────────────────────────────
    if (step === 'success') {
        return (
            <div className="register-hero">
                <div className="reg-success-card">
                    <div className="reg-success-icon">🎉</div>
                    <h1 className="reg-success-title">Registration Successful!</h1>
                    <p className="reg-success-sub">
                        Welcome to Prithvi 2026, <strong>{name}</strong>! Your Registration ID is:
                    </p>
                    <div className="reg-id-badge">{registrationId}</div>
                    <p className="reg-success-note">
                        A confirmation email with your credentials has been sent to <strong>{email}</strong>.
                    </p>
                    <div className="reg-success-actions">
                        <button className="btn" onClick={() => router.push('/')}>Go to Home</button>
                        <button className="btn btn-outline" onClick={() => router.push('/login')}>Login</button>
                    </div>
                </div>
            </div>
        );
    }

    // ── PAYMENT STEP ──────────────────────────────────────────────────────────
    if (step === 'payment') {
        return (
            <div className="register-hero">
                <div className="payment-card">
                    <button className="back-btn" onClick={() => setStep('form')}>← Back</button>
                    <h1 className="payment-title">Complete Payment</h1>
                    <p className="payment-sub">Scan the QR code to pay the registration fee, then upload the payment screenshot.</p>

                    <div className="qr-wrapper">
                        <Image src="/payment-qr.png?v=2" alt="Payment QR Code" width={260} height={260} className="qr-image" unoptimized />
                        <p className="qr-note">🔒 Scan & Pay via UPI / Any Payment App</p>
                        <p className="qr-amount" style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffd700', marginTop: '8px', zIndex: 10 }}>Amount to pay: ₹600</p>
                    </div>

                    <div className="screenshot-upload-area" onClick={() => fileInputRef.current?.click()}>
                        {paymentScreenshot ? (
                            <div className="screenshot-preview">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={paymentScreenshot} alt="Payment screenshot" />
                                <div className="screenshot-badge">✅ Screenshot uploaded</div>
                            </div>
                        ) : (
                            <div className="screenshot-placeholder">
                                <span className="upload-icon">📸</span>
                                <p>Click to upload Payment Screenshot</p>
                                <span className="upload-hint">PNG, JPG, JPEG supported</span>
                            </div>
                        )}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleScreenshot}
                    />

                    {error && <div className="form-error">{error}</div>}

                    <button
                        className="btn submit-btn"
                        onClick={handleSubmit}
                        disabled={submitting || !paymentVerified}
                    >
                        {submitting ? (
                            <span className="btn-loading"><span className="spinner-sm" /> Registering…</span>
                        ) : 'Complete Registration'}
                    </button>
                </div>
            </div>
        );
    }

    // ── FORM STEP ─────────────────────────────────────────────────────────────
    return (
        <div className="register-hero">
            <div className="reg-form-card">
                <div className="reg-form-header">
                    <div className="reg-form-icon">🌍</div>
                    <h1>Register for Prithvi 2026</h1>
                    <p>Fill in your details to join India&apos;s premier Earth Science Symposium</p>
                </div>

                <form onSubmit={handleProceedToPayment} className="reg-form" noValidate>
                    {/* NAME */}
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>

                    {/* EMAIL + OTP */}
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="email-row">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={e => { setEmail(e.target.value); setEmailVerified(false); setOtpSent(false); }}
                                disabled={emailVerified}
                                className={`form-input ${emailVerified ? 'input-verified' : ''}`}
                            />
                            {!emailVerified && (
                                <button
                                    type="button"
                                    className="otp-send-btn"
                                    onClick={handleSendOTP}
                                    disabled={sending}
                                >
                                    {sending ? <span className="spinner-sm" /> : otpSent ? 'Resend' : 'Send OTP'}
                                </button>
                            )}
                            {emailVerified && <span className="verified-badge">✅ Verified</span>}
                        </div>

                        {otpSent && !emailVerified && (
                            <div className="otp-row">
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    maxLength={6}
                                    className="form-input otp-input"
                                />
                                <button
                                    type="button"
                                    className="otp-verify-btn"
                                    onClick={handleVerifyOTP}
                                    disabled={verifying}
                                >
                                    {verifying ? <span className="spinner-sm" /> : 'Verify'}
                                </button>
                            </div>
                        )}
                        {otpError && <p className="field-error">{otpError}</p>}
                        {otpSent && !emailVerified && (
                            <p className="otp-hint">OTP sent to {email}. Check your inbox (and spam folder).</p>
                        )}
                    </div>

                    {/* PHONE */}
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className="form-input"
                        />
                    </div>

                    {/* COLLEGE */}
                    <div className="form-group">
                        <label>College / Institution</label>
                        <input
                            type="text"
                            placeholder="e.g. IIT Kharagpur, Delhi University…"
                            value={college}
                            onChange={e => setCollege(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>

                    {/* GENDER */}
                    <div className="form-group">
                        <label>Gender</label>
                        <select
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                            required
                            className="form-input"
                            style={{ cursor: 'pointer' }}
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-binary">Non-binary</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>

                    {/* PASSWORD */}
                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-row">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Min 8 characters"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="form-input"
                            />
                            <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                        {password && (
                            <div className="password-strength">
                                <div className={`strength-bar ${password.length >= 8 ? (password.length >= 12 ? 'strong' : 'medium') : 'weak'}`} />
                                <span>{password.length >= 12 ? 'Strong' : password.length >= 8 ? 'Medium' : 'Weak'}</span>
                            </div>
                        )}
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="password-row">
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                placeholder="Re-enter password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className={`form-input ${confirmPassword && (confirmPassword === password ? 'input-verified' : 'input-error')}`}
                            />
                            <button type="button" className="eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                                {showConfirm ? '🙈' : '👁️'}
                            </button>
                        </div>
                        {confirmPassword && confirmPassword !== password && (
                            <p className="field-error">Passwords do not match</p>
                        )}
                    </div>

                    {error && <div className="form-error">{error}</div>}

                    <button type="submit" className="btn submit-btn">
                        Next: Proceed to Payment →
                    </button>

                    <p className="login-redirect">
                        Already registered? <a href="/login">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
