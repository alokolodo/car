
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { ShieldCheck, Camera, Upload, CheckCircle, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { verifyIDDocument } from '../services/geminiService';

interface VerificationProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const Verification: React.FC<VerificationProps> = ({ user, setUser }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ isValid: boolean, reason: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startVerification = async () => {
    if (!file) return;
    setLoading(true);
    
    // Convert to base64 for Gemini
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const verificationResult = await verifyIDDocument(base64);
      setResult(verificationResult);
      setLoading(false);
      
      if (verificationResult.isValid) {
        // Simulate immediate approval for demo purposes
        setUser(prev => ({ ...prev, isVerified: true, verificationStatus: 'APPROVED' }));
      }
    };
    reader.readAsDataURL(file);
  };

  if (user.isVerified) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-100">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-3xl font-black text-gray-900">Verified & Secure</h1>
        <p className="text-gray-500 max-w-sm mx-auto">Your account is fully verified. You have access to all high-priority rides and driver earnings.</p>
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm inline-block">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">ID Verified</p>
          <p className="font-bold">NIN / Driver's License</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Verification Center</h1>
        <p className="text-gray-500">To maintain campus safety, all users must verify their identity.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-bold">Why verify?</h3>
          <ul className="space-y-3">
            <FeatureItem text="Unlock Driver Mode" />
            <FeatureItem text="Higher wallet withdrawal limits" />
            <FeatureItem text="Priority matching on campus" />
            <FeatureItem text="Safety badge on your profile" />
          </ul>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-100 flex flex-col justify-center">
          <Sparkles className="mb-4" />
          <h3 className="text-xl font-bold mb-2">Smart Verification</h3>
          <p className="text-indigo-100 text-sm leading-relaxed">
            Our AI-powered system analyzes your documents in real-time to get you on the road faster.
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-6">Upload Document</h3>
        <div className="space-y-6">
          <div 
            className={`border-2 border-dashed rounded-[2rem] p-12 text-center transition-all ${
              file ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200 hover:border-blue-400'
            }`}
          >
            {file ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle size={32} />
                </div>
                <div>
                  <p className="font-bold text-blue-900">{file.name}</p>
                  <p className="text-xs text-blue-600">Ready for analysis</p>
                </div>
                <button 
                  onClick={() => setFile(null)} 
                  className="text-xs font-bold text-red-500 hover:underline"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center mx-auto">
                  <Upload size={32} />
                </div>
                <div>
                  <p className="font-bold text-gray-700">Click to upload or drag & drop</p>
                  <p className="text-xs text-gray-400">NIN Slip, Voter's Card or Driver's License (JPG/PNG)</p>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="id-upload" 
                  onChange={handleFileChange}
                />
                <label 
                  htmlFor="id-upload" 
                  className="inline-block px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold cursor-pointer hover:bg-black transition-all"
                >
                  Select File
                </label>
              </div>
            )}
          </div>

          {result && !result.isValid && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 text-red-700">
              <AlertCircle className="shrink-0" />
              <div>
                <p className="text-sm font-bold">Analysis Failed</p>
                <p className="text-xs">{result.reason}</p>
              </div>
            </div>
          )}

          <button 
            disabled={!file || loading}
            onClick={startVerification}
            className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-2 ${
              !file || loading 
              ? 'bg-gray-100 text-gray-400 shadow-none' 
              : 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700'
            }`}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Camera />}
            {loading ? 'Analyzing with AI...' : 'Verify Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-center gap-3 text-sm text-gray-600 font-medium">
    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
      <CheckCircle size={12} />
    </div>
    {text}
  </li>
);

export default Verification;
