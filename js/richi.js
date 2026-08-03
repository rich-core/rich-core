  const SYSTEM_PROMPT = `You are Richi, the official AI agent for RichCore — a premium digital-first tech startup based in Pune, Maharashtra, India.
Tagline: "Code Bold, Deliver Gold." — From Core to Cloud.
Website: https://rich-core.github.io/rich-core/#top
Phone: +91 8888534360 | Email: ashishgaike21@gmail.com | WhatsApp: https://wa.me/918888534360
Founded: 2025 | Location: Pune, Maharashtra, India

Services:
1. Web Development — Fast, scalable websites built with modern tech stacks.
2. Creative Design — Vibrant, expressive visuals for bold digital brands.
3. Deployment — CI/CD powered, zero-downtime, instant updates.
4. Digital Solutions — Automated modern tools to boost performance and engagement.

Subscription Products:
1. Cafe Management System — QR Code Based Ordering for cafes and restaurants.
2. Company Workforce Management System — Managing workforce operations.

Tech Expertise: Java Full Stack, Web & Mobile Applications, Cloud & DevOps, Custom Digital Solutions.

Projects built:
1. Worker Connect — Connecting Workers to Companies and vice versa.
2. Billing System — All billing solutions for Enterprises.
3. Custom CRM — Customized modules and functionality.
4. Industries Specific CRM — Healthcare, Banking & Finance, Real Estate, Home Security, Tours & Travels, Retail & eCommerce.

Why RichCore: Agile & outcomes-driven, expert enterprise developers, transparent communication, real value delivery.

Personality: You are Richi — confident, bold, friendly, playful like Shinchan! Keep responses to 2-4 sentences. Use occasional emoji. For project or contact inquiries always share WhatsApp: https://wa.me/918888534360 and phone +91 8888534360. Never make up services or pricing not listed above.`;

  const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
  const KEY_STORE = 'richi_gemini_key';

  let hist = [], busy = false, isOpen = false, greeted = false;

  function getKey() { return localStorage.getItem(KEY_STORE) || ''; }
  function saveKey() {
    const k = document.getElementById('api-key-input').value.trim();
    if (!k) { alert('Please paste your Gemini API key first!'); return; }
    localStorage.setItem(KEY_STORE, k);
    document.getElementById('api-setup').classList.remove('show');
    document.getElementById('richi-window').classList.add('open');
    isOpen = true;
    if (!greeted) { greeted = true; setTimeout(greet, 350); }
    document.getElementById('richi-input').focus();
  }
  function clearKey() {
    localStorage.removeItem(KEY_STORE);
    hist = [];
    greeted = false;
    document.getElementById('richi-msgs').innerHTML = '';
    document.getElementById('richi-window').classList.remove('open');
    document.getElementById('api-setup').classList.add('show');
    isOpen = false;
  }

  function toggleRichi() {
    document.getElementById('notif-badge').style.display = 'none';
    if (!getKey()) {
      const setup = document.getElementById('api-setup');
      setup.classList.toggle('show');
      return;
    }
    isOpen = !isOpen;
    document.getElementById('richi-window').classList.toggle('open', isOpen);
    if (isOpen && !greeted) { greeted = true; setTimeout(greet, 350); }
    if (isOpen) document.getElementById('richi-input').focus();
  }

  function greet() {
    ab("Ayeee~! I'm <strong>Richi</strong> &#128293;<br><br>Your RichCore buddy! We build ultra-cool websites, apps & digital solutions — <em>Code Bold, Deliver Gold!</em><br><br>What can I help you with today?");
  }

  function shinSVG() {
    return `<svg width="34" height="34" viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg">
      <circle cx="23" cy="23" r="22" fill="#FFD700"/>
      <path d="M9 24 Q23 14 37 24" fill="#1a1a2e"/>
      <ellipse cx="23" cy="27" rx="13" ry="11" fill="#FFDAB9"/>
      <ellipse cx="17" cy="28" rx="5" ry="4" fill="#FFB6A3" opacity="0.6"/>
      <ellipse cx="29" cy="28" rx="5" ry="4" fill="#FFB6A3" opacity="0.6"/>
      <circle cx="18" cy="25" r="3.5" fill="#1a1a2e"/><circle cx="28" cy="25" r="3.5" fill="#1a1a2e"/>
      <circle cx="19" cy="24" r="1" fill="#fff"/><circle cx="29" cy="24" r="1" fill="#fff"/>
      <ellipse cx="23" cy="22" rx="2.5" ry="1.5" fill="#C1856B"/>
      <path d="M17 31 Q23 36 29 31" fill="none" stroke="#1a1a2e" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M20 33.5 Q23 35 26 33.5" fill="#FF9999" opacity="0.7"/>
      <rect x="14" y="9" width="18" height="13" rx="5" fill="#1a1a2e"/>
      <ellipse cx="23" cy="9" rx="9" ry="4" fill="#1a1a2e"/>
      <rect x="18" y="7" width="10" height="3" rx="1.5" fill="#E63946"/>
    </svg>`;
  }

  function ab(html) {
    const chat = document.getElementById('richi-msgs');
    const row = document.createElement('div'); row.className = 'mrow';
    const av = document.createElement('div'); av.className = 'mav bot'; av.innerHTML = shinSVG();
    const bub = document.createElement('div'); bub.className = 'bub bot'; bub.innerHTML = html;
    row.appendChild(av); row.appendChild(bub);
    chat.appendChild(row); chat.scrollTop = chat.scrollHeight;
  }
  function au(text) {
    const chat = document.getElementById('richi-msgs');
    const row = document.createElement('div'); row.className = 'mrow user';
    const av = document.createElement('div'); av.className = 'mav user'; av.textContent = 'You';
    const bub = document.createElement('div'); bub.className = 'bub user'; bub.textContent = text;
    row.appendChild(av); row.appendChild(bub);
    chat.appendChild(row); chat.scrollTop = chat.scrollHeight;
  }
  function showTyping() {
    const chat = document.getElementById('richi-msgs');
    const row = document.createElement('div'); row.className = 'mrow'; row.id = 'trow';
    const av = document.createElement('div'); av.className = 'mav bot'; av.innerHTML = shinSVG();
    const bub = document.createElement('div'); bub.className = 'bub bot';
    bub.innerHTML = '<div class="twrap"><div class="td"></div><div class="td"></div><div class="td"></div></div>';
    row.appendChild(av); row.appendChild(bub);
    chat.appendChild(row); chat.scrollTop = chat.scrollHeight;
  }
  function removeTyping() { const t = document.getElementById('trow'); if (t) t.remove(); }

  function md(t) {
    return t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  }

  async function callGemini(userMsg) {
    const apiKey = getKey();
    if (!apiKey) { ab("Please set up your Gemini API key first!"); return; }

    hist.push({ role: 'user', parts: [{ text: userMsg }] });
    showTyping(); busy = true;

    const body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: hist,
      generationConfig: { maxOutputTokens: 500, temperature: 0.8 }
    };

    try {
      const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.status === 400) {
        const err = await res.json();
        removeTyping();
        ab("&#128561; Hmm! Looks like an invalid API key. Please check your key in Google AI Studio. <a href='https://aistudio.google.com/apikey' target='_blank'>Get a new key here</a>");
        busy = false; return;
      }
      if (res.status === 429) {
        removeTyping();
        ab("&#128553; Richi's taking a quick breather! Free tier limit hit. Try again in a minute or contact us on <a href='https://wa.me/918888534360' target='_blank'>WhatsApp</a>.");
        busy = false; return;
      }

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Ayee! I couldn't get a response. Try again!";
      hist.push({ role: 'model', parts: [{ text: reply }] });
      removeTyping();
      ab(md(reply));
    } catch (e) {
      removeTyping();
      ab("&#128561; Network error! Check your internet and try again, or reach us at <a href='https://wa.me/918888534360' target='_blank'>WhatsApp</a>.");
    }
    busy = false;
  }

  function hs() {
    const inp = document.getElementById('richi-input');
    const msg = inp.value.trim(); if (!msg || busy) return;
    inp.value = ''; au(msg); callGemini(msg);
  }
  function sc(text) { if (busy) return; au(text); callGemini(text); }

  document.getElementById('richi-input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); hs(); }
  });
  document.getElementById('api-key-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') saveKey();
  });

  window.addEventListener('load', () => {
    if (!getKey()) {
      setTimeout(() => {
        document.getElementById('notif-badge').style.display = 'flex';
      }, 1000);
    }
  });