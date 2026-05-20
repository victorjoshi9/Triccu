'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Phone, KeyRound, Loader2, ArrowRight } from 'lucide-react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Initialize Firebase (Replace with actual config)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dummy",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const PhoneAuth = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Setup recaptcha verifier
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible'
      });
    }
  }, []);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formattedPhone = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      window.confirmationResult = confirmationResult;
      setStep('OTP');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await window.confirmationResult.confirm(otp);
      // Trigger success callback
      onLoginSuccess();
    } catch (err: any) {
      console.error(err);
      setError('Invalid OTP. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#061611]/90 backdrop-blur-md">
      <div id="recaptcha-container"></div>
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm glass-card border border-emerald-500/20 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
        
        <div className="p-8 relative z-10">
          <div className="w-16 h-16 rounded-2xl green-gradient-bg flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-white/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight mb-2">
            {step === 'PHONE' ? 'Agent Login' : 'Verification'}
          </h2>
          <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-8">
            {step === 'PHONE' ? 'Secure OTP Access' : 'Enter 6-digit code'}
          </p>

          <AnimatePresence mode="wait">
            {step === 'PHONE' ? (
              <motion.form 
                key="phone-form"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                onSubmit={handleSendOTP}
                className="space-y-6"
              >
                <div>
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest block mb-2">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/50" />
                    <input 
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20 font-bold tracking-widest"
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-xs text-red-500 font-bold">{error}</p>}

                <button 
                  type="submit"
                  disabled={loading || phoneNumber.length < 10}
                  className="w-full py-4 green-gradient-bg rounded-2xl font-black text-sm uppercase tracking-[0.2em] text-white shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send OTP'}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="otp-form"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                onSubmit={handleVerifyOTP}
                className="space-y-6"
              >
                <div>
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest block mb-2">OTP Code</label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/50" />
                    <input 
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="000000"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20 font-black tracking-[0.5em] text-center text-xl"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-xs text-red-500 font-bold">{error}</p>}

                <button 
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full py-4 green-gradient-bg rounded-2xl font-black text-sm uppercase tracking-[0.2em] text-white shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Login'}
                </button>
                
                <button 
                  type="button"
                  onClick={() => setStep('PHONE')}
                  className="w-full text-center text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-white"
                >
                  Change Phone Number
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}
