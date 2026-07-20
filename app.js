/* =============================================
   DAY ONE — App Logic
   Navigation, Credit Story engine, animations,
   AI chat simulation, budget sliders, charts.
   ============================================= */

(function () {
  'use strict';

  // ─── State ────────────────────────────────
  const state = {
    currentScreen: 'screen-splash',
    creditScore: 0,
    salary: 45000,
    onboardingSlide: 0,
    quizStep: 0,
    quizAnswers: {},
    sipAmount: 2000,
    chatStep: 0,
    budgetLocked: false,
    sipStarted: false,
    navVisible: false,
  };

  // ─── Screen Navigation ────────────────────
  function showScreen(id) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      state.currentScreen = id;
      target.scrollTop = 0;
      window.scrollTo(0, 0);
    }

    // Show/hide bottom nav (visible from dashboard onward)
    const navScreens = [
      'screen-dashboard', 'screen-dashboard-updated',
      'screen-budget', 'screen-ai-chat', 'screen-goals',
      'screen-sip', 'screen-progress', 'screen-credit-timeline',
      'screen-unlock'
    ];
    const nav = document.getElementById('bottomNav');
    if (navScreens.includes(id)) {
      nav.classList.add('visible');
      state.navVisible = true;
    } else {
      nav.classList.remove('visible');
      state.navVisible = false;
    }

    // Run screen-specific init
    if (id === 'screen-celebration') initCelebration();
    if (id === 'screen-ai-chat') initChat();
    if (id === 'screen-dashboard-updated') initDashboardUpdated();
    if (id === 'screen-progress') initCharts();
    if (id === 'screen-credit-timeline') initTimeline();
  }

  // ─── Credit Story Score Engine ────────────
  function addCreditScore(points, label) {
    state.creditScore += points;
    showToast(`+${points} Credit Story`, label);
  }

  function showToast(text) {
    const toast = document.getElementById('scoreToast');
    const toastText = document.getElementById('toastText');
    toastText.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  function updateGauge(elementId, score, maxScore) {
    const el = document.getElementById(elementId);
    if (!el) return;
    maxScore = maxScore || 100;

    // Calculate dashoffset from dasharray
    const dasharray = parseFloat(el.getAttribute('stroke-dasharray'));
    const pct = Math.min(score / maxScore, 1);
    const offset = dasharray * (1 - pct);
    el.setAttribute('stroke-dashoffset', offset);
  }

  // ─── Confetti ─────────────────────────────
  function fireConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#00d68f', '#4f7cff', '#ffd166', '#a78bfa', '#ff6b6b', '#ffffff'];

    for (let i = 0; i < 120; i++) {
      pieces.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 15,
        vy: Math.random() * -18 - 5,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.3 + Math.random() * 0.2,
        opacity: 1,
      });
    }

    let frame = 0;
    const maxFrames = 150;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      pieces.forEach(p => {
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.opacity = Math.max(0, 1 - frame / maxFrames);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (frame < maxFrames) {
        requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    draw();
  }

  // ─── Counter Animation ────────────────────
  function animateCounter(element, target, duration, prefix) {
    prefix = prefix || '₹';
    duration = duration || 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      element.textContent = prefix + current.toLocaleString('en-IN');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ─── Screen 1: Splash ────────────────────
  document.getElementById('screen-splash').addEventListener('click', () => {
    showScreen('screen-onboarding');
  });

  // Auto-advance splash after 4 seconds
  setTimeout(() => {
    if (state.currentScreen === 'screen-splash') {
      showScreen('screen-onboarding');
    }
  }, 4000);

  // ─── Screen 2: Onboarding ────────────────
  const onboardingBtn = document.getElementById('onboardingBtn');
  const slides = document.querySelectorAll('.onboarding-slide');
  const dots = document.querySelectorAll('#onboardingDots .dot');

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.remove('active', 'exit');
      if (i < index) s.classList.add('exit');
      if (i === index) s.classList.add('active');
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    state.onboardingSlide = index;
    onboardingBtn.textContent = index === 2 ? 'Start My Story →' : 'Next';
  }

  onboardingBtn.addEventListener('click', () => {
    if (state.onboardingSlide < 2) {
      showSlide(state.onboardingSlide + 1);
    } else {
      showScreen('screen-account-type');
    }
  });

  // ─── Screen 3: Account Type ──────────────
  document.getElementById('accountSalary').addEventListener('click', () => {
    showScreen('screen-verification');
  });

  // ─── Screen 4: Verification ──────────────
  const verifyBtn = document.getElementById('verifyBtn');
  const verifyProgress = document.getElementById('verifyProgress');
  const verifyBar = document.getElementById('verifyBar');
  const verifySuccess = document.getElementById('verifySuccess');
  const verifyForm = document.getElementById('verifyForm');

  verifyBtn.addEventListener('click', () => {
    verifyBtn.disabled = true;
    verifyBtn.textContent = 'Verifying...';
    verifyProgress.classList.add('active');

    setTimeout(() => {
      verifyBar.style.width = '100%';
    }, 100);

    setTimeout(() => {
      verifyForm.style.display = 'none';
      verifyProgress.style.display = 'none';
      verifySuccess.classList.add('show');
    }, 2300);
  });

  document.getElementById('verifyNext').addEventListener('click', () => {
    showScreen('screen-quiz');
  });

  // ─── Screen 5: Quiz ─────────────────────
  const quizSteps = document.querySelectorAll('.quiz-step');
  const quizProgressSegments = document.querySelectorAll('#quizProgress .qp-segment');

  function showQuizStep(index) {
    quizSteps.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    quizProgressSegments.forEach((s, i) => {
      s.classList.toggle('filled', i < index);
    });
    state.quizStep = index;
  }

  // Quiz option click
  document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const step = parseInt(opt.dataset.step);
      const value = opt.dataset.value;

      // Deselect siblings
      opt.parentElement.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      state.quizAnswers[step] = value;

      // Advance after a short delay
      setTimeout(() => {
        if (step < 3) {
          // Skip step 2 (salary) — it has its own button
          const next = step + 1;
          showQuizStep(next);
        } else {
          // Final step — show result
          quizProgressSegments.forEach(s => s.classList.add('filled'));
          quizSteps.forEach(s => s.classList.remove('active'));
          document.getElementById('quizResult').classList.add('show');
        }
      }, 400);
    });
  });

  // Salary next button
  document.getElementById('salaryNext').addEventListener('click', () => {
    const input = document.getElementById('salaryInput').value;
    const numeric = parseInt(input.replace(/[^\d]/g, ''));
    if (numeric > 0) state.salary = numeric;
    showQuizStep(3);
  });

  document.getElementById('quizNext').addEventListener('click', () => {
    addCreditScore(10, 'Account opened');
    showScreen('screen-dashboard');
  });

  // ─── Screen 6: Dashboard ────────────────
  document.getElementById('receiveSalaryBtn').addEventListener('click', () => {
    showScreen('screen-celebration');
  });

  // Quick action navigation
  document.getElementById('qaBudget').addEventListener('click', () => showScreen('screen-budget'));
  document.getElementById('qaAiCoach').addEventListener('click', () => showScreen('screen-ai-chat'));
  document.getElementById('qaGoals').addEventListener('click', () => showScreen('screen-goals'));

  // Credit story card click
  document.getElementById('dashCreditCard').addEventListener('click', () => {
    showScreen('screen-credit-timeline');
  });

  // ─── Screen 7: Celebration ───────────────
  function initCelebration() {
    // Fire confetti
    setTimeout(fireConfetti, 300);

    // Animate counter
    const amountEl = document.getElementById('celebrationAmount');
    setTimeout(() => {
      animateCounter(amountEl, state.salary, 2000);
    }, 500);

    // Add credit score
    setTimeout(() => {
      addCreditScore(10, 'First salary received');
    }, 1500);
  }

  document.getElementById('celebrationNext').addEventListener('click', () => {
    showScreen('screen-budget');
  });

  // ─── Screen 8: Budget ────────────────────
  const sliders = document.querySelectorAll('input[data-slider]');
  const salary = () => state.salary;

  function updateBudget() {
    let total = 0;
    sliders.forEach(slider => {
      const cat = slider.dataset.slider;
      const pct = parseInt(slider.value);
      const amount = Math.round(salary() * pct / 100);
      total += pct;

      const valEl = document.querySelector(`[data-value="${cat}"]`);
      const pctEl = document.querySelector(`[data-pct="${cat}"]`);
      if (valEl) valEl.textContent = '₹' + amount.toLocaleString('en-IN');
      if (pctEl) pctEl.textContent = `(${pct}%)`;

      // Update slider background fill
      const fillPct = ((pct - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
      slider.style.background = `linear-gradient(90deg, #4f7cff ${fillPct}%, #1a1f45 ${fillPct}%)`;
    });

    const totalEl = document.getElementById('budgetTotal');
    const allocatedAmt = Math.round(salary() * total / 100);
    totalEl.textContent = '₹' + allocatedAmt.toLocaleString('en-IN') + ' / ₹' + salary().toLocaleString('en-IN');
    
    if (total !== 100) {
      totalEl.style.color = 'var(--color-danger)';
    } else {
      totalEl.style.color = 'var(--color-accent)';
    }
  }

  sliders.forEach(slider => {
    slider.addEventListener('input', updateBudget);
    // Initialize fill
    const fillPct = ((parseInt(slider.value) - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
    slider.style.background = `linear-gradient(90deg, #4f7cff ${fillPct}%, #1a1f45 ${fillPct}%)`;
  });

  document.getElementById('budgetLock').addEventListener('click', () => {
    if (!state.budgetLocked) {
      state.budgetLocked = true;
      addCreditScore(15, 'Budget created');
    }
    showScreen('screen-ai-chat');
  });

  // ─── Screen 9: AI Chat ──────────────────
  const chatMessages = document.getElementById('chatMessages');
  const chatChips = document.getElementById('chatChips');

  const chatConversation = [
    { type: 'user', text: 'Can I afford a Goa trip? 🏖️', delay: 500 },
    { type: 'typing', delay: 1500 },
    {
      type: 'ai',
      text: `Based on your numbers, Rahul:\n\n` +
        `• Your spending money: ₹${Math.round(state.salary * 0.25).toLocaleString('en-IN')}/month\n` +
        `• Goa trip estimate: ~₹15,000\n` +
        `• Save ₹5,000/month from spending → Goa in 3 months\n\n` +
        `That's totally doable without touching savings or investments. Want me to create a Goa goal?`,
      delay: 300,
    },
    { type: 'action', text: 'Yes, create it! 🏖️', delay: 0 },
    { type: 'typing', delay: 1200 },
    {
      type: 'ai',
      text: 'Done! 🎉 Goa Trip goal created — ₹15,000 in 3 months.',
      credit: '+3 Credit Story',
      delay: 300,
    },
  ];

  function initChat() {
    chatMessages.innerHTML = '';
    state.chatStep = 0;
    chatChips.style.display = 'none';
    playNextChatMessage();
  }

  function playNextChatMessage() {
    if (state.chatStep >= chatConversation.length) {
      // Show chips after conversation
      setTimeout(() => {
        chatChips.style.display = 'flex';
      }, 500);

      // Show "continue" suggestion
      setTimeout(() => {
        const continueBtn = document.createElement('div');
        continueBtn.style.cssText = 'text-align:center;margin-top:16px;';
        continueBtn.innerHTML = '<button class="btn btn-accent btn-sm" id="chatNext">Start your first SIP →</button>';
        chatMessages.appendChild(continueBtn);
        document.getElementById('chatNext').addEventListener('click', () => {
          showScreen('screen-sip');
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1200);
      return;
    }

    const msg = chatConversation[state.chatStep];

    setTimeout(() => {
      if (msg.type === 'typing') {
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
          typing.remove();
          state.chatStep++;
          playNextChatMessage();
        }, msg.delay);
      } else if (msg.type === 'action') {
        const actionDiv = document.createElement('div');
        actionDiv.style.cssText = 'align-self:flex-end;';
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary btn-sm';
        btn.style.width = 'auto';
        btn.textContent = msg.text;
        btn.addEventListener('click', () => {
          // Replace with user bubble
          actionDiv.innerHTML = '';
          const bubble = document.createElement('div');
          bubble.className = 'chat-bubble user';
          bubble.textContent = msg.text;
          actionDiv.appendChild(bubble);
          state.chatStep++;
          playNextChatMessage();
        });
        actionDiv.appendChild(btn);
        chatMessages.appendChild(actionDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        // Don't auto-advance — wait for click
      } else {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${msg.type}`;
        bubble.style.whiteSpace = 'pre-line';
        bubble.textContent = msg.text;

        if (msg.credit) {
          const creditDiv = document.createElement('div');
          creditDiv.className = 'cs-inline';
          creditDiv.innerHTML = `⚡ ${msg.credit}`;
          bubble.appendChild(creditDiv);

          // Actually add score
          setTimeout(() => {
            addCreditScore(3, 'Goal created');
          }, 500);
        }

        chatMessages.appendChild(bubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        state.chatStep++;
        playNextChatMessage();
      }
    }, msg.delay);
  }

  // Chat chip interactions
  document.querySelectorAll('.btn-chip[data-chip]').forEach(chip => {
    chip.addEventListener('click', () => {
      const topic = chip.dataset.chip;
      const responses = {
        sip: "Based on your ₹9,000 investment budget and balanced risk profile, I recommend:\n\n📊 Nifty 50 Index Fund\n• ₹2,000/month SIP\n• Medium risk, ~12% annual returns\n• Your ₹2,000 becomes ~₹3.5L in 10 years\n\nWant to start this SIP?",
        emergency: "An emergency fund should cover 3-6 months of expenses.\n\n• Your essentials: ₹13,500/month\n• Target: ₹81,000 – ₹1,00,000\n• From your savings allocation: ~9 months\n\nI've already set this as one of your goals! 🚨",
        tax: "Great question! As a first-year earner:\n\n• Income up to ₹7L: Zero tax under new regime\n• Your ₹45,000/month = ₹5.4L/year\n• You're in the zero tax bracket! 🎉\n\nBut SIP investments in ELSS can save tax when you earn more. Smart to plan ahead.",
      };

      // Add user bubble
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.textContent = chip.textContent;
      chatMessages.appendChild(userBubble);

      // Typing
      const typing = document.createElement('div');
      typing.className = 'typing-indicator';
      typing.innerHTML = '<span></span><span></span><span></span>';
      chatMessages.appendChild(typing);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      setTimeout(() => {
        typing.remove();
        const aiBubble = document.createElement('div');
        aiBubble.className = 'chat-bubble ai';
        aiBubble.style.whiteSpace = 'pre-line';
        aiBubble.textContent = responses[topic] || "I'm here to help with any money question!";
        chatMessages.appendChild(aiBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1500);

      chip.style.opacity = '0.4';
      chip.style.pointerEvents = 'none';
    });
  });

  // ─── Screen 10: SIP ─────────────────────
  const sipAmountBtns = document.querySelectorAll('.sip-amount-btn');
  sipAmountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sipAmountBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.sipAmount = parseInt(btn.dataset.amount);
    });
  });

  document.getElementById('sipStart').addEventListener('click', () => {
    if (!state.sipStarted) {
      state.sipStarted = true;
      addCreditScore(10, 'First SIP started');
    }
    document.getElementById('sipForm').style.display = 'none';
    document.getElementById('sipSuccess').classList.add('show');
    document.querySelector('.sip-recommendation').style.display = 'none';
    document.querySelector('#screen-sip .screen-title').textContent = '🚀';
    document.querySelector('#screen-sip .screen-subtitle').textContent = '';
  });

  document.getElementById('sipNext').addEventListener('click', () => {
    showScreen('screen-goals');
  });

  // ─── Screen 11: Goals ───────────────────
  document.getElementById('goalsNext').addEventListener('click', () => {
    showScreen('screen-dashboard-updated');
  });

  // ─── Screen 12: Dashboard Updated ──────
  function initDashboardUpdated() {
    setTimeout(() => {
      updateGauge('dashGaugeUpdated', state.creditScore, 100);
      document.getElementById('dashScoreUpdated').textContent = state.creditScore;
    }, 500);
  }

  document.getElementById('viewProgress').addEventListener('click', () => {
    showScreen('screen-progress');
  });

  document.getElementById('dashCreditCardUpdated').addEventListener('click', () => {
    showScreen('screen-credit-timeline');
  });

  // ─── Screen 13: Progress ────────────────
  function initCharts() {
    drawDonutChart();
    drawBarChart();
  }

  function drawDonutChart() {
    const canvas = document.getElementById('donutChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) - 30;
    const innerRadius = radius * 0.6;

    const data = [
      { label: 'Essentials', pct: 30, color: '#4f7cff' },
      { label: 'Savings', pct: 25, color: '#00d68f' },
      { label: 'Investments', pct: 20, color: '#a78bfa' },
      { label: 'Spending', pct: 25, color: '#ffd166' },
    ];

    let startAngle = -Math.PI / 2;

    data.forEach(segment => {
      const sliceAngle = (segment.pct / 100) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.arc(cx, cy, innerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();

      // Label
      const midAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius + 18;
      const lx = cx + Math.cos(midAngle) * (innerRadius + (radius - innerRadius) / 2);
      const ly = cy + Math.sin(midAngle) * (innerRadius + (radius - innerRadius) / 2);

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(segment.pct + '%', lx, ly);

      startAngle = endAngle;
    });

    // Center text
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 16px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('₹45,000', cx, cy - 8);
    ctx.fillStyle = '#8892b0';
    ctx.font = '400 11px Inter, sans-serif';
    ctx.fillText('Total Budget', cx, cy + 10);

    // Legend
    const legendY = h - 10;
    const legendStartX = cx - 120;
    data.forEach((d, i) => {
      const lx = legendStartX + i * 65;
      ctx.fillStyle = d.color;
      ctx.fillRect(lx, legendY - 4, 8, 8);
      ctx.fillStyle = '#8892b0';
      ctx.font = '400 9px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(d.label, lx + 12, legendY + 2);
    });
  }

  function drawBarChart() {
    const canvas = document.getElementById('barChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };

    const data = [
      { label: 'Savings', value: 11250, target: 11250, color: '#00d68f' },
      { label: 'Investment', value: 9000, target: 9000, color: '#4f7cff' },
      { label: 'Emergency', value: 0, target: 11111, color: '#ffd166' },
    ];

    const maxVal = Math.max(...data.map(d => Math.max(d.value, d.target)));
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const barWidth = chartW / data.length * 0.4;
    const gap = chartW / data.length;

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + chartH * (1 - i / 4);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = '#4a5568';
      ctx.font = '400 9px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('₹' + Math.round(maxVal * i / 4 / 1000) + 'K', padding.left - 8, y + 3);
    }

    data.forEach((d, i) => {
      const x = padding.left + gap * i + gap / 2 - barWidth;

      // Target bar (ghost)
      const targetH = (d.target / maxVal) * chartH;
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      roundRect(ctx, x - 2, padding.top + chartH - targetH, barWidth * 2 + 4, targetH, 4);
      ctx.fill();

      // Value bar
      const valH = (d.value / maxVal) * chartH;
      if (valH > 0) {
        ctx.fillStyle = d.color;
        roundRect(ctx, x, padding.top + chartH - valH, barWidth * 2, valH, 4);
        ctx.fill();
      }

      // Label
      ctx.fillStyle = '#8892b0';
      ctx.font = '500 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.label, x + barWidth, h - padding.bottom + 16);
    });
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  document.getElementById('progressNext').addEventListener('click', () => {
    showScreen('screen-credit-timeline');
  });

  // ─── Screen 14: Credit Timeline ─────────
  function initTimeline() {
    setTimeout(() => {
      updateGauge('timelineGauge', state.creditScore, 100);
      document.getElementById('timelineScore').textContent = state.creditScore;
    }, 500);
  }

  document.getElementById('timelineNext').addEventListener('click', () => {
    showScreen('screen-unlock');
  });

  // ─── Screen 15: Unlock ──────────────────
  document.getElementById('unlockRestart').addEventListener('click', () => {
    showScreen('screen-dashboard-updated');
  });

  // ─── Bottom Navigation ──────────────────
  const navItems = document.querySelectorAll('.nav-item');
  const navScreenMap = {
    home: 'screen-dashboard-updated',
    budget: 'screen-budget',
    ai: 'screen-ai-chat',
    goals: 'screen-goals',
    profile: 'screen-progress',
  };

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.nav;
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // If we haven't gone through the story yet, use initial dashboard
      if (target === 'home' && state.creditScore < 10) {
        showScreen('screen-dashboard');
      } else {
        showScreen(navScreenMap[target]);
      }
    });
  });

  // ─── Initialize ─────────────────────────
  // Set initial slider backgrounds
  updateBudget();

})();
