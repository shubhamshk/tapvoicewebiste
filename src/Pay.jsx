import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Headphones, ShieldCheck, Zap, MonitorSmartphone, CheckCircle2 } from 'lucide-react';
import { supabase } from './supabaseClient'; // Ensure this points to the right client
import './index.css';

export default function Pay() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (emailStr) => {
    return /\S+@\S+\.\S+/.test(emailStr);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error && validateEmail(e.target.value)) setError('');
  };

  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test", // Fetched from .env dynamically
    currency: "USD",
    intent: "capture",
  };

  const saveToSupabase = async (userEmail, paymentId) => {
    // Standard Supabase insert call as requested
    const { data, error } = await supabase
      .from('licenses')
      .insert([
        { email: userEmail, payment_id: paymentId, status: 'active' }
      ]);
    
    if (error) {
      console.error('Error saving to Supabase:', error);
      // In production you would want a retry mechanism or alert
    }
  };

  return (
    <div className="pay-page-wrapper">
      {/* Background blobs matching the dark theme */}
      <div className="bg-blob-1"></div>
      <div className="bg-blob-2"></div>
      
      <div className="pay-container">
        <div className="pay-card">
          
          {/* Top Section */}
          <div className="pay-header">
            <div className="logo iosevka-charon-bold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1.25rem', marginBottom: '4px' }}>
              <Headphones size={24} color="var(--accent)" />
              VoiceMyBot
            </div>
            <h2 className="iosevka-charon-bold" style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              Unlock Full Version
            </h2>
          </div>

          {/* Pricing Section */}
          <div className="pay-pricing">
            <div className="price-tag iosevka-charon-bold">$5</div>
            <p className="iosevka-charon-medium" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              One-time payment • Lifetime access
            </p>
            <div className="badge iosevka-charon-bold">No subscription</div>
          </div>

          {/* Email Input */}
          <div className="pay-input-section">
            <label className="iosevka-charon-medium">Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={handleEmailChange}
              className={`iosevka-charon-regular ${error ? 'input-error' : ''}`}
            />
            {error && <div className="error-text iosevka-charon-medium">{error}</div>}
          </div>

          {/* PayPal Button Section */}
          <div className="pay-action-section">
            <div style={{ position: 'relative', zIndex: 10, minHeight: '150px' }}>
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons 
                  style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
                  disabled={!validateEmail(email)}
                  forceReRender={[email]}
                  onClick={(data, actions) => {
                    if (!validateEmail(email)) {
                      setError('Please enter a valid email address first');
                      return actions.reject();
                    }
                    return actions.resolve();
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          description: "VoiceMyBot Lifetime License",
                          amount: { value: "5.00" }
                        }
                      ]
                    });
                  }}
                  onApprove={async (data, actions) => {
                    setIsProcessing(true);
                    try {
                      const details = await actions.order.capture();
                      const transactionId = details.id;
                      const payerEmail = details.payer.email_address || email;
                      
                      await saveToSupabase(payerEmail, transactionId);
                      navigate('/success');
                    } catch (err) {
                      console.error("Payment Capture Error", err);
                      setIsProcessing(false);
                    }
                  }}
                  onError={(err) => {
                    console.error("PayPal checkout onError", err);
                    setIsProcessing(false);
                  }}
                />
              </PayPalScriptProvider>
            </div>
            
            {isProcessing && (
              <p className="iosevka-charon-medium processing-text">
                Verifying your payment...
              </p>
            )}
          </div>

          {/* Trust Section */}
          <div className="pay-trust-section iosevka-charon-regular">
            <div className="trust-item">
              <ShieldCheck size={18} color="#10b981" />
              <span>Secure payment via PayPal</span>
            </div>
            <div className="trust-item">
              <Zap size={18} color="#f59e0b" />
              <span>Instant unlock after payment</span>
            </div>
            <div className="trust-item">
              <MonitorSmartphone size={18} color="#3b82f6" />
              <span>Works on Windows & Mac app</span>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <p className="pay-footer-note iosevka-charon-light">
          After payment, use your email inside the app to unlock premium features.
        </p>
      </div>
    </div>
  );
}
