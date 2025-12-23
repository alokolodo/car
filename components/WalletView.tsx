
import React, { useState } from 'react';
import { Wallet, Transaction } from '../types';
import { Plus, CreditCard, Banknote, ArrowDownLeft, ArrowUpRight, ShieldCheck, Loader2, Landmark } from 'lucide-react';

interface WalletViewProps {
  wallet: Wallet;
  setWallet: React.Dispatch<React.SetStateAction<Wallet>>;
}

const WalletView: React.FC<WalletViewProps> = ({ wallet, setWallet }) => {
  const [funding, setFunding] = useState(false);

  const handleAddFunds = () => {
    setFunding(true);
    setTimeout(() => {
      setFunding(false);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 bg-white min-h-full">
      <header>
        <h1 className="text-2xl font-black text-gray-900">Wallet</h1>
        <p className="text-sm text-gray-400 font-medium">Safe campus transactions.</p>
      </header>

      {/* High Fidelity Balance Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-800 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-200 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
          <Landmark size={140} />
        </div>
        <div className="relative z-10 space-y-8">
          <div>
            <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Available Funds</p>
            <h2 className="text-4xl font-black tracking-tight">₦{wallet.balance.toLocaleString()}</h2>
          </div>
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl text-[10px] font-bold flex items-center gap-2 border border-white/20">
              <ShieldCheck size={14} className="text-blue-200" />
              Escrow Active
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Integration UI */}
      <div className="space-y-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Deposit Funds</p>
        <div className="grid grid-cols-1 gap-3">
          <PaymentProviderButton 
            onClick={handleAddFunds} 
            loading={funding} 
            name="Paystack" 
            desc="Pay with Card, Bank or Transfer"
            color="bg-blue-500"
          />
          <PaymentProviderButton 
            onClick={handleAddFunds} 
            loading={funding} 
            name="Flutterwave" 
            desc="Barter, USSD & QR Payments"
            color="bg-amber-500"
          />
        </div>
      </div>

      {/* History */}
      <div className="space-y-4 pt-4">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Transaction History</h3>
        <div className="space-y-3">
          {wallet.history.map(tx => (
            <div key={tx.id} className="flex items-center justify-between p-5 bg-white rounded-3xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  tx.type === 'CREDIT' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {tx.type === 'CREDIT' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div>
                  <p className="text-sm font-black text-gray-900">{tx.description}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{tx.timestamp}</p>
                </div>
              </div>
              <p className={`text-lg font-black ${tx.type === 'CREDIT' ? 'text-green-600' : 'text-gray-900'}`}>
                {tx.type === 'CREDIT' ? '+' : '-'}₦{tx.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PaymentProviderButton: React.FC<{ name: string, desc: string, onClick: () => void, loading: boolean, color: string }> = ({ name, desc, onClick, loading, color }) => (
  <button 
    onClick={onClick}
    disabled={loading}
    className="w-full flex items-center justify-between p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all active:scale-[0.98] group"
  >
    <div className="flex items-center gap-4">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
        <CreditCard size={28} />
      </div>
      <div className="text-left">
        <p className="text-lg font-black text-gray-900">{name}</p>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{desc}</p>
      </div>
    </div>
    {loading ? <Loader2 className="animate-spin text-gray-300" /> : <Plus className="text-gray-300 group-hover:text-blue-600 transition-colors" />}
  </button>
);

export default WalletView;
