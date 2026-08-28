'use client';

import { useState } from 'react';

const messages = [
  'Tap the button. Nanba.',
  'Again. That was only one.',
  'Keep going — something is waking up.',
  'Two more. No backing out now.',
  'Last one. Make it count.',
];

export default function Home() {
  const [taps, setTaps] = useState(0);
  const revealed = taps >= 5;

  const tap = () => {
    if (!revealed) {
      setTaps((current) => Math.min(current + 1, 5));
      if (navigator.vibrate) navigator.vibrate(taps === 4 ? [60, 40, 120] : 35);
    }
  };

  return (
    <main className={`experience ${revealed ? 'is-revealed' : ''}`}>
      <div className="noise" aria-hidden="true" />
      {!revealed ? (
        <section className="challenge" aria-live="polite">
          <div className="eyebrow"><span className="live-dot" />classified surprise</div>
          <div className="copy">
            <p className="step">STEP {String(taps + 1).padStart(2, '0')} / 05</p>
            <h1>{messages[taps]}</h1>
          </div>
          <button
            className="tap-button"
            onClick={tap}
            aria-label={`Tap ${taps + 1} of 5`}
            style={{ '--progress': `${taps * 72}deg` } as React.CSSProperties}
          >
            <span className="button-face">
              <span className="tap-word">TAP</span>
              <span className="tap-count">{5 - taps} TO GO</span>
            </span>
          </button>
          <div className="progress" aria-label={`${taps} of 5 taps complete`}>
            {[0, 1, 2, 3, 4].map((index) => <span key={index} className={index < taps ? 'done' : ''} />)}
          </div>
          <p className="footer-note">NO DATA. NO TRICKS. JUST TAP.</p>
        </section>
      ) : (
        <section className="reveal" aria-live="assertive">
          <p className="reveal-kicker">YOU REALLY DID IT</p>
          <div className="emoji-stage" aria-label="Middle finger emoji">
            <div className="burst" aria-hidden="true" />
            <span className="emoji-shadow" aria-hidden="true">🖕</span>
            <span className="emoji">🖕</span>
          </div>
          <h1>Worth it?</h1>
          <p>Five taps. Zero regrets.</p>
          <button className="reset-button" onClick={() => setTaps(0)}>DO IT AGAIN ↻</button>
        </section>
      )}
    </main>
  );
}
