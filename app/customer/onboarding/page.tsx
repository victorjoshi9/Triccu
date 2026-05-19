'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Camera, ShieldCheck, ChevronRight, CheckCircle2, Lock, Smartphone, FileText, ArrowRight, Upload, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // KYC States
  const [formData, setFormData] = useState({
    fullName: '',
    panNumber: '',
  });
  const [fileStatus, setFileStatus] = useState({
    selfie: null as 'pending' | 'verifying' | 'success' | 'error' | null,
    aadhar: null as 'pending' | 'verifying' | 'success' | 'error' | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'fullName') {
      if (!value.trim()) error = 'Full name is required to proceed';
      else if (value.trim().length < 3) error = 'Please enter your full legal name (min 3 chars)';
    }
    if (name === 'panNumber') {
      const cleanPAN = value.replace(/\s+/g, '').toUpperCase();
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!value.trim()) error = 'PAN number is required for credit assessment';
      else if (!panRegex.test(cleanPAN)) error = 'Must be in format: ABCDE 1234 F';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const formatPAN = (value: string) => {
    const cleanValue = value.replace(/\s+/g, '').toUpperCase();
    let formatted = '';
    
    for (let i = 0; i < cleanValue.length; i++) {
      if (i === 5) formatted += ' ';
      if (i === 9) formatted += ' ';
      formatted += cleanValue[i];
    }
    
    return formatted.trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'panNumber') {
      const formattedValue = formatPAN(value);
      if (formattedValue.length > 12) return; // ABCDE 1234 F is 12 chars
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      validateField(name, formattedValue);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      validateField(name, value);
    }
  };

  const simulateFileUpload = (type: 'selfie' | 'aadhar') => {
    setFileStatus(prev => ({ ...prev, [type]: 'verifying' }));
    setTimeout(() => {
      // 90% success rate for simulation
      const isSuccess = Math.random() > 0.1;
      setFileStatus(prev => ({ ...prev, [type]: isSuccess ? 'success' : 'error' }));
    }, 2000);
  };

  const isStep2Valid = 
    formData.fullName.trim().length >= 3 && 
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.replace(/\s+/g, '').toUpperCase()) &&
    fileStatus.selfie === 'success' && 
    fileStatus.aadhar === 'success';

  const nextStep = () => {
    if (step === 2 && !isStep2Valid) return;
    
    if (step < 5) setStep(step + 1);
    else router.push('/customer');
  };

  const skipStep = () => {
    if (step < 5) setStep(step + 1);
    else router.push('/customer');
  }

  return (
    <div className="relative min-h-full flex flex-col px-6 py-12 overflow-x-hidden">
      {/* Background decorations */}
      <div className="fixed top-[-10%] right-[-20%] w-64 h-64 bg-red-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-20%] w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Progress Header */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div 
              key={s} 
              className={`h-1.5 rounded-full transition-all duration-300 ${s === step ? 'w-8 red-gradient-bg' : s < step ? 'w-4 bg-green-500' : 'w-4 bg-white/10'}`} 
            />
          ))}
        </div>
        <button onClick={skipStep} className="text-xs font-bold text-white/50 uppercase tracking-widest hover:text-white">Skip</button>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col justify-center relative z-10"
          >
            <div className="w-20 h-20 rounded-[32px] red-gradient-bg flex items-center justify-center mb-8 shadow-lg shadow-red-900/40">
              <span className="text-4xl font-bold text-white">T</span>
            </div>
            <h1 className="text-3xl font-outfit font-bold text-white leading-tight mb-4">
              Welcome to <br />
              <span className="red-gradient-text">Triccu Finance</span>
            </h1>
            <p className="text-white/60 mb-8 text-sm leading-relaxed">
              We&apos;re excited to help you finance your new device. Let&apos;s get your account set up in just a few minutes so you can take your device home today.
            </p>

            <div className="glass-card p-4 space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">1. Verify Profile</h3>
                  <p className="text-[11px] text-white/50 mt-1">Quick identity check</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">2. Set up Auto-Pay</h3>
                  <p className="text-[11px] text-white/50 mt-1">Register NACH mandate</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">3. Secure Device</h3>
                  <p className="text-[11px] text-white/50 mt-1">Enable Finance Lock</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={nextStep}
              className="mt-auto w-full py-4 red-gradient-bg rounded-2xl font-bold text-white shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col relative z-10 min-h-full"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-outfit font-bold text-white mb-2">Profile Setup</h1>
              <p className="text-sm text-white/60">Let&apos;s verify your identity quickly. We need a clear photo of you and your ID proof.</p>
            </div>

            <div className="space-y-4">
              {/* Progress Bar for Verifying state */}
              {(fileStatus.selfie === 'verifying' || fileStatus.aadhar === 'verifying') && (
                <div className="px-5">
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                      transition={{ duration: 2, ease: "linear" }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>
              )}
              <div className={`glass-card p-5 border-white/5 relative overflow-hidden group transition-all ${
                fileStatus.selfie === 'error' ? 'border-red-500/50 bg-red-500/5' : 
                fileStatus.selfie === 'success' ? 'border-green-500/50 bg-green-500/5' : ''
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors ${
                    fileStatus.selfie === 'error' ? 'bg-red-500/20 border-red-500/30' : 
                    fileStatus.selfie === 'success' ? 'bg-green-500/20 border-green-500/30' : 'bg-[#1A1A2E]/50 border-white/10'
                  }`}>
                    {fileStatus.selfie === 'verifying' ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : 
                     fileStatus.selfie === 'success' ? <CheckCircle2 className="w-6 h-6 text-green-400" /> :
                     fileStatus.selfie === 'error' ? <AlertCircle className="w-6 h-6 text-red-500" /> :
                     <Camera className="w-6 h-6 text-white/50" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white">Take a Selfie</h3>
                    <p className={`text-[10px] mt-1 ${fileStatus.selfie === 'error' ? 'text-red-400 font-bold' : 'text-white/40'}`}>
                      {fileStatus.selfie === 'verifying' ? 'Processing biometrics...' : 
                       fileStatus.selfie === 'error' ? 'Face check failed. Try again.' : 
                       fileStatus.selfie === 'success' ? 'Face verified successfully' : 'Ensure good lighting'}
                    </p>
                  </div>
                  <button 
                    onClick={() => simulateFileUpload('selfie')}
                    disabled={fileStatus.selfie === 'verifying'}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                      fileStatus.selfie === 'success' ? 'bg-green-500 text-white' : 
                      fileStatus.selfie === 'error' ? 'bg-red-500 text-white' : 'bg-white/10 text-white'
                    }`}
                  >
                    {fileStatus.selfie === 'verifying' ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : fileStatus.selfie === 'error' ? (
                      'Retry'
                    ) : fileStatus.selfie === 'success' ? (
                      'Change'
                    ) : (
                      'Capture'
                    )}
                  </button>
                </div>
              </div>

              {/* Aadhar Upload */}
              <div className={`glass-card p-5 border-white/5 relative overflow-hidden group transition-all ${
                fileStatus.aadhar === 'error' ? 'border-red-500/50 bg-red-500/5' : 
                fileStatus.aadhar === 'success' ? 'border-green-500/50 bg-green-500/5' : ''
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors ${
                    fileStatus.aadhar === 'error' ? 'bg-red-500/20 border-red-500/30' : 
                    fileStatus.aadhar === 'success' ? 'bg-green-500/20 border-green-500/30' : 'bg-[#1A1A2E]/50 border-white/10'
                  }`}>
                    {fileStatus.aadhar === 'verifying' ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : 
                     fileStatus.aadhar === 'success' ? <CheckCircle2 className="w-6 h-6 text-green-400" /> :
                     fileStatus.aadhar === 'error' ? <AlertCircle className="w-6 h-6 text-red-500" /> :
                     <Upload className="w-6 h-6 text-white/50" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white">Upload Aadhar</h3>
                    <p className={`text-[10px] mt-1 ${fileStatus.aadhar === 'error' ? 'text-red-400 font-bold' : 'text-white/40'}`}>
                      {fileStatus.aadhar === 'verifying' ? 'Extracting ID details...' : 
                       fileStatus.aadhar === 'error' ? 'ID blurred or unreadable' : 
                       fileStatus.aadhar === 'success' ? 'Aadhar validated' : 'Front and back'}
                    </p>
                  </div>
                  <button 
                    onClick={() => simulateFileUpload('aadhar')}
                    disabled={fileStatus.aadhar === 'verifying'}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                      fileStatus.aadhar === 'success' ? 'bg-green-500 text-white' : 
                      fileStatus.aadhar === 'error' ? 'bg-red-500 text-white' : 'bg-white/10 text-white'
                    }`}
                  >
                    {fileStatus.aadhar === 'verifying' ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : fileStatus.aadhar === 'error' ? (
                      <>
                        <RefreshCw className="w-3 h-3" />
                        Retry
                      </>
                    ) : fileStatus.aadhar === 'success' ? (
                      'Change'
                    ) : (
                      'Upload'
                    )}
                  </button>
                </div>
              </div>
              
              {/* Input Fields */}
              <div className="mt-8 space-y-4">
                <div className="space-y-1">
                  <div className={`neu-input p-1 transition-all border ${errors.fullName ? 'border-red-500/50 bg-red-500/5' : 'border-white/5'}`}>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full Name (as per ID)" 
                      className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30" 
                    />
                  </div>
                  {errors.fullName && <p className="text-[10px] text-red-400 font-bold ml-2">{errors.fullName}</p>}
                </div>

                <div className="space-y-1">
                  <div className={`neu-input p-1 transition-all border ${errors.panNumber ? 'border-red-500/50 bg-red-500/5' : 'border-white/5'}`}>
                    <input 
                      type="text" 
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      placeholder="PAN Number (e.g. ABCDE 1234 F)" 
                      className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 truncate uppercase" 
                    />
                  </div>
                  {errors.panNumber && <p className="text-[10px] text-red-400 font-bold ml-2">{errors.panNumber}</p>}
                </div>
              </div>
            </div>
            
            <button 
              onClick={nextStep}
              disabled={!isStep2Valid || fileStatus.selfie === 'verifying' || fileStatus.aadhar === 'verifying'}
              className={`mt-12 w-full py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${
                isStep2Valid ? 'bg-white text-gray-900 shadow-white/10' : 'bg-white/5 text-white/20 cursor-not-allowed shadow-none border border-white/5'
              }`}
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col relative z-10 min-h-full"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-outfit font-bold text-white mb-2">Auto-Pay Setup</h1>
              <p className="text-sm text-white/60">Register your NACH mandate to automate your monthly EMI payments. This ensures you never miss a payment and avoid late fees.</p>
            </div>

            <div className="glass-card p-6 border-white/5 flex flex-col items-center justify-center text-center mb-6 shadow-2xl shadow-blue-900/10">
              <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-500/30 relative">
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 border-t-blue-400 animate-spin" />
                <ShieldCheck className="w-10 h-10 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">e-NACH Mandate</h2>
              <p className="text-xs text-white/50 px-4">Powered by NPCI for secure automated payments</p>
              
              <div className="w-full mt-6 bg-[#1A1A2E]/50 rounded-xl p-4 text-left border border-white/5">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-white/50 font-medium">Monthly EMI</span>
                  <span className="text-xs font-bold text-white">Rs. 6,450</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-white/50 font-medium">Auto-debit Date</span>
                  <span className="text-xs font-bold text-white">5th of every month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/50 font-medium">Tenure</span>
                  <span className="text-xs font-bold text-white">12 Months</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 neu-input font-bold text-white flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-[#1A1A2E]">
                Authenticate via NetBanking
              </button>
              <button className="w-full py-4 neu-input font-bold text-white flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-[#1A1A2E]">
                Authenticate via Debit Card
              </button>
            </div>
            
            <button 
              onClick={nextStep}
              className="mt-6 w-full py-4 red-gradient-bg rounded-2xl font-bold text-white shadow-lg shadow-red-900/40 active:scale-95 transition-transform"
            >
              Simulate Success
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col relative z-10 min-h-full"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-outfit font-bold text-white mb-2">Secure Device</h1>
              <p className="text-sm text-white/60">To finalize your loan, we need to activate the Mobile Finance Lock on this device.</p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center py-8">
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
                <div className="w-32 h-64 glass-card rounded-[32px] border-white/20 p-2 relative flex flex-col items-center z-10">
                   <div className="w-12 h-1 bg-white/20 rounded-full mt-2" />
                   <div className="flex-1 flex items-center justify-center">
                     <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/50">
                        <Lock className="w-8 h-8 text-red-500" />
                     </div>
                   </div>
                </div>
              </div>

              <div className="glass-card p-5 w-full">
                <h3 className="text-sm font-bold text-white mb-3">Why are we doing this?</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-xs text-white/70 items-start">
                     <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                     Required for zero downpayment financing
                  </li>
                  <li className="flex gap-3 text-xs text-white/70 items-start">
                     <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                     Provides security against device theft
                  </li>
                  <li className="flex gap-3 text-xs text-white/70 items-start">
                     <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                     Automatically removed after all EMIs are paid
                  </li>
                </ul>
              </div>
            </div>
            
            <button 
              onClick={nextStep}
              className="mt-auto w-full py-4 red-gradient-bg rounded-2xl font-bold text-white shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              Activate Finance Lock
            </button>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center relative z-10 min-h-[60vh] text-center"
          >
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-8 border border-green-500/50 shadow-2xl shadow-green-900/20 relative">
               <motion.div 
                 initial={{ scale: 0 }} 
                 animate={{ scale: 1 }} 
                 transition={{ type: "spring", delay: 0.2 }}
                 className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"
               />
               <CheckCircle2 className="w-12 h-12 text-green-400" />
            </div>
            
            <h1 className="text-3xl font-outfit font-bold text-white mb-4">All Set!</h1>
            <p className="text-sm text-white/60 max-w-[250px] leading-relaxed mb-12">
              Your profile is verified, auto-pay is active, and your device is secured. You are ready to go!
            </p>

            <button 
              onClick={() => router.push('/customer')}
              className="w-full py-4 bg-white text-gray-900 rounded-2xl font-bold shadow-lg shadow-white/10 active:scale-95 transition-transform"
            >
              Go to Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
