import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Headphones, Download } from 'lucide-react';
import './index.css';

export default function Success() {
  const navigate = useNavigate();
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    // Generate a success burst of sparks on load
    const burst = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      dx: Math.cos((Math.PI * 2 * i) / 20) * (50 + Math.random() * 80),
      dy: Math.sin((Math.PI * 2 * i) / 20) * (50 + Math.random() * 80),
      color: ['#10b981', '#00f0ff', '#ffffff'][Math.floor(Math.random() * 3)]
    }));
    setSparks(burst);
  }, []);

  return (
    <div className="pay-page-wrapper" style={{ justifyContent: 'center' }}>
      <div className="bg-blob-1" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(0,0,0,0) 60%)' }}></div>
      <div className="bg-blob-2" style={{ background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(0,0,0,0) 60%)' }}></div>

      {sparks.map(spark => (
        <div 
          key={spark.id}
          className="sparkle-particle"
          style={{
            left: spark.x,
            top: spark.y,
            backgroundColor: spark.color,
            boxShadow: `0 0 8px ${spark.color}`,
            '--dx': `${spark.dx}px`,
            '--dy': `${spark.dy}px`
          }}
        />
      ))}

      <div className="pay-container" style={{ animation: 'cardFloatIn 0.8s ease-out forwards' }}>
        <div className="pay-card" style={{ textAlign: 'center', padding: '48px 32px' }}>
          
          <CheckCircle2 size={64} color="#10b981" style={{ margin: '0 auto 24px', filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.5))' }} />
          
          <h2 className="iosevka-charon-bold" style={{ fontSize: '2rem', marginBottom: '16px', background: 'linear-gradient(to right, #10b981, #00f0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Payment Successful!
          </h2>
          
          <p className="iosevka-charon-medium" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
            Your email has been registered. You can now unlock all premium voice packs from within the app.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/')} 
              className="btn"
              style={{ padding: '14px 28px' }}
            >
              Return Home
            </button>
            <button 
              className="btn btn-primary"
              style={{ background: 'linear-gradient(45deg, #10b981, #00f0ff)', padding: '14px 28px', color: '#000' }}
            >
              <Download size={18} />
              Download App Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
