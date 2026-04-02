import React, { useState, useEffect } from 'react';
import { 
  Download, Headphones, MonitorSmartphone, Zap, 
  Settings, Rocket, Star, Heart, Play
} from 'lucide-react';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sparks, setSparks] = useState([]);

  // Handles the global click "sparkle" animation
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Don't spawn sparks if clicking on a button or link
      if (e.target.closest('button') || e.target.closest('a')) return;

      const numSparks = 8;
      const newSparks = Array.from({ length: numSparks }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / numSparks;
        const velocity = 40 + Math.random() * 40; // Travel distance
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        
        // Random colors between cyan and pink for the accent
        const colors = ['#00f0ff', '#ff0055', '#ffffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return {
          id: Date.now() + i + Math.random(),
          x: e.clientX,
          y: e.clientY,
          dx,
          dy,
          color
        };
      });

      setSparks(prev => [...prev, ...newSparks]);

      // Remove after animation finishes (600ms)
      setTimeout(() => {
        setSparks(prev => prev.filter(s => !newSparks.includes(s)));
      }, 600);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <>
      {/* Background Blobs */}
      <div className="bg-blob-1"></div>
      <div className="bg-blob-2"></div>

      {/* Global Sparks */}
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

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <header>
          <div 
            className="logo iosevka-charon-bold" 
            style={{ cursor: 'pointer' }} 
            onClick={() => setCurrentPage('home')}
          >
            <Headphones size={24} color="var(--accent)" />
            VoiceMyBot
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button 
              onClick={() => setCurrentPage('rewards')} 
              className="iosevka-charon-medium"
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: currentPage === 'rewards' ? 'var(--accent)' : 'var(--text-main)', 
                cursor: 'pointer', 
                fontSize: '1rem',
                textShadow: currentPage === 'rewards' ? '0 0 10px rgba(0,240,255,0.5)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              Rewards
            </button>
            <button 
              onClick={() => {
                setCurrentPage('home');
                window.location.hash = '#download';
              }} 
              className="btn btn-primary iosevka-charon-medium"
            >
              Download
            </button>
          </div>
        </header>

        {currentPage === 'home' ? (
          /* ==================== HOME PAGE ==================== */
          <main>
            {/* 1. HERO SECTION */}
            <section className="hero">
              <h1 className="iosevka-charon-bold">Make Your Laptop Come Alive 🎧</h1>
              <p className="iosevka-charon-regular">Add fun voice reactions to every single tap. Works natively on Windows & Mac.</p>
              
              <div className="btn-group" id="download">
                <a href="#download" className="btn btn-primary iosevka-charon-bold">
                  <Download size={18} />
                  Download Now
                </a>
              </div>

              {/* Tall Vertical Reels Video Slideshow directly after Download buttons */}
              <div className="marquee-container">
                <div className="marquee-track">
                  {/* Duplicate set for infinite scrolling illusion */}
                  {[1, 2, 3, 4, 1, 2, 3, 4].map((item, idx) => (
                    <div className="marquee-item" key={idx}>
                      <img src={`https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=360&h=640&random=${item}`} alt="Demo preview Reel" />
                      <div className="play-icon-overlay">
                        <Play size={24} fill="currentColor" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. FEATURES SECTION */}
            <section id="features">
              <h2 className="section-title iosevka-charon-bold">Everything you need</h2>
              <p className="section-subtitle iosevka-charon-regular">A lightweight utility built to make your computer a lot less boring.</p>
              
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <Headphones size={20} />
                  </div>
                  <h3 className="feature-title iosevka-charon-bold">100+ Voice Packs</h3>
                  <p className="feature-desc iosevka-charon-regular">From anime gasps to robotic hums. A massive library of built-in voice reactions included right out of the box.</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <MonitorSmartphone size={20} />
                  </div>
                  <h3 className="feature-title iosevka-charon-bold">Works Everywhere</h3>
                  <p className="feature-desc iosevka-charon-regular">Native support for both Windows 10/11 and macOS (Intel & Apple Silicon) with deep system hooks.</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <Zap size={20} />
                  </div>
                  <h3 className="feature-title iosevka-charon-bold">Real-Time Feedback</h3>
                  <p className="feature-desc iosevka-charon-regular">Zero latency audio response. Engineered perfectly for mechanical keyboards and your laptop's built-in chassis.</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <Settings size={20} />
                  </div>
                  <h3 className="feature-title iosevka-charon-bold">Easy Controls</h3>
                  <p className="feature-desc iosevka-charon-regular">Adjust sensitivity, shift volume thresholds, switch packs, and customize your experience right from the menu bar.</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <Rocket size={20} />
                  </div>
                  <h3 className="feature-title iosevka-charon-bold">Lightweight & Fast</h3>
                  <p className="feature-desc iosevka-charon-regular">Runs quietly in the background using less than 20MB of RAM. You won't even know it's there until you tap.</p>
                </div>
              </div>
            </section>

            {/* 3. HOW IT WORKS */}
            <section id="how-it-works">
              <h2 className="section-title iosevka-charon-bold">How It Works</h2>
              <p className="section-subtitle iosevka-charon-regular">Set it up in roughly 60 seconds.</p>

              <div className="steps-container">
                <div className="step">
                  <div className="step-number iosevka-charon-bold">1</div>
                  <div className="step-content">
                    <h3 className="iosevka-charon-bold">Download the App</h3>
                    <p className="iosevka-charon-regular">Grab the lightweight executable and extract it anywhere on your machine.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number iosevka-charon-bold">2</div>
                  <div className="step-content">
                    <h3 className="iosevka-charon-bold">Select a Pack</h3>
                    <p className="iosevka-charon-regular">Open the tray icon and choose from over 100+ premium audio templates.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number iosevka-charon-bold">3</div>
                  <div className="step-content">
                    <h3 className="iosevka-charon-bold">Tap & Enjoy</h3>
                    <p className="iosevka-charon-regular">Start typing or tapping your device to hear the instant, reactive audio feedback.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. SOCIAL PROOF */}
            <section id="testimonials">
              <h2 className="section-title iosevka-charon-bold">Wall of Love</h2>
              <p className="section-subtitle iosevka-charon-regular">Don't just take our word for it.</p>
              
              <div className="testimonials">
                <div className="testimonial-card">
                  <div className="stars">
                    <Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" />
                  </div>
                  <p className="quote iosevka-charon-regular">"This made my laptop 10x more fun 😂 Using the sci-fi pack while coding is genuinely an incredible experience."</p>
                  <div className="author">
                    <div className="author-avatar" style={{ background: '#ec4899' }}></div>
                    <div className="author-info">
                      <h4 className="iosevka-charon-bold">Alex C.</h4>
                      <p className="iosevka-charon-regular">Software Engineer</p>
                    </div>
                  </div>
                </div>

                <div className="testimonial-card">
                  <div className="stars">
                    <Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" />
                  </div>
                  <p className="quote iosevka-charon-regular">"Didn’t expect this to be this addictive... I literally type louder and faster just to hear the feedback."</p>
                  <div className="author">
                    <div className="author-avatar" style={{ background: '#00f0ff' }}></div>
                    <div className="author-info">
                      <h4 className="iosevka-charon-bold">Jordan K.</h4>
                      <p className="iosevka-charon-regular">Designer</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. FAQ */}
            <section id="faq">
              <h2 className="section-title iosevka-charon-bold">FAQs</h2>
              
              <div className="faq-list">
                <div className="faq-item">
                  <div className="faq-q iosevka-charon-medium">Is it safe?</div>
                  <div className="faq-a iosevka-charon-light">100%. The app operates completely locally, requires no internet connection to run, and does not record or save any of your keystrokes. It only listens for the physical thud/tap using hardware APIs.</div>
                </div>
                <div className="faq-item">
                  <div className="faq-q iosevka-charon-medium">Does it work on Mac?</div>
                  <div className="faq-a iosevka-charon-light">Yes! It is fully optimized for macOS 11+, supporting both Intel and the newest Apple Silicon chips.</div>
                </div>
                <div className="faq-item">
                  <div className="faq-q iosevka-charon-medium">Can I customize sounds?</div>
                  <div className="faq-a iosevka-charon-light">You can swap between our massive library of included voice packs instantly. We are also deploying "Custom Uploads" in an upcoming update!</div>
                </div>
              </div>
            </section>
          </main>
        ) : (
          /* ==================== REWARDS PAGE ==================== */
          <main>
            <section style={{ paddingTop: '80px', paddingBottom: '100px' }}>
              <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎬</div>
                <h1 className="iosevka-charon-bold" style={{ fontSize: '4rem', letterSpacing: '-1.5px', marginBottom: '16px', background: 'linear-gradient(to right, #00f0ff, #fff, #ff0055)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Get 100% back
                </h1>
                <p className="iosevka-charon-regular" style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>
                  Make a Reel. Get views. We pay you back.
                </p>
              </div>

              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-icon">📱</div>
                  <div className="timeline-content">
                    <h3 className="iosevka-charon-bold">Shoot a Reel about VoiceMyBot</h3>
                    <p className="iosevka-charon-regular">Show the world how VoiceMyBot keeps you productive and entertained. Be creative. Funny, honest, unhinged — whatever works.</p>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-icon">🏷️</div>
                  <div className="timeline-content">
                    <h3 className="iosevka-charon-bold">Tag @BuildWithShk + #VoiceMyBot</h3>
                    <p className="iosevka-charon-regular">Post it on Instagram or TikTok, tag <strong>@BuildWithShk</strong>, and add <strong>#VoiceMyBot</strong> so we can find it.</p>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-icon">🔥</div>
                  <div className="timeline-content">
                    <h3 className="iosevka-charon-bold">Hit 2,000 views</h3>
                    <p className="iosevka-charon-regular">Once your Reel crosses 2,000 views, you qualify for a 100% refund. That's right — the app becomes free.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-icon">🚀</div>
                  <div className="timeline-content">
                    <h3 className="iosevka-charon-bold">Hit 50k views? We reward you $50</h3>
                    <p className="iosevka-charon-regular">If your Reel blows up and hits 50,000 views, we'll send you $50 on top of your full refund.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-icon">💵</div>
                  <div className="timeline-content">
                    <h3 className="iosevka-charon-bold">DM us for your reward</h3>
                    <p className="iosevka-charon-regular">Send a DM to <strong>@BuildWithShk</strong> with the link to your Reel, a screenshot of your view count, and the email address you used to purchase. We'll refund 100% of what you paid.</p>
                  </div>
                </div>
              </div>

              <div className="iosevka-charon-light" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '80px', opacity: 0.8, lineHeight: 1.6, padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <strong className="iosevka-charon-bold" style={{color: 'var(--text-main)'}}>The fine print:</strong> You can post as many Reels as you want until one hits 2,000 views — no cap on attempts. Views must be organic (no bots, no paid promotion). We reserve the right to verify view counts and decline suspicious activity. Refund is 100% of the purchase price, sent via the original payment method. The $50 bonus for 50k views is paid via UPI or PayPal. Offer can be withdrawn at any time.
              </div>
            </section>
          </main>
        )}

        {/* 6. FOOTER (Shared) */}
        <footer>
          <div className="footer-content">
            <div className="logo iosevka-charon-bold" style={{ fontSize: '1rem' }}>
              <Headphones size={18} color="var(--accent)" />
              VoiceMyBot
            </div>
            
            <div className="footer-links iosevka-charon-regular">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact Us</a>
            </div>

            <div className="branding-line iosevka-charon-light">
              Built with <Heart size={14} color="#ff0055" fill="#ff0055" /> for fun, by creators.
            </div>
            
            <p className="iosevka-charon-light" style={{ fontSize: '0.75rem', opacity: 0.5 }}>
              &copy; {new Date().getFullYear()} VoiceMyBot. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
