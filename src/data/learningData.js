// =============================================
// Finance Academy — Learning Data
// 5 Worlds, 18 Modules, ~55 minutes total content
// =============================================

const learningData = [
  // ─── WORLD 0: Money Basics 🌱 ───
  {
    id: 'world-0',
    title: 'Money Basics',
    emoji: '🌱',
    description: 'Master the fundamentals of your salary and banking',
    color: '#00d68f',
    modules: [
      {
        id: 'mod-0-0',
        title: 'Decoding Your Salary Slip',
        emoji: '📄',
        xpReward: 25,
        creditStoryBonus: 3,
        slides: [
          {
            emoji: '📄',
            title: 'What Even Is a Salary Slip?',
            content: 'Your salary slip is a monthly receipt from your employer. It breaks down exactly how much you earned, what got deducted, and what lands in your bank. Think of it as the "receipt" for your work.',
          },
          {
            emoji: '💰',
            title: 'Gross vs. Net — The Big Difference',
            content: 'Gross salary is the full amount before any deductions. Net salary (or "in-hand") is what you actually receive. The gap? Taxes, provident fund, and insurance. If your CTC is ₹6L, your in-hand might be closer to ₹45,000/month.',
          },
          {
            emoji: '🧩',
            title: 'Key Components',
            content: 'Basic Pay (~40-50% of CTC) is the core. HRA helps with rent tax benefits. Special Allowance fills the gap. PF (12% of basic) is your forced retirement saving. Understanding these helps you plan better.',
          },
        ],
        quiz: {
          question: 'If your CTC is ₹6,00,000, your monthly in-hand salary is typically:',
          options: [
            '₹50,000 (exactly CTC ÷ 12)',
            '₹42,000–₹45,000 (after deductions)',
            '₹60,000 (CTC + bonuses)',
            '₹35,000 (half of CTC ÷ 12)',
          ],
          correctIndex: 1,
          explanation: 'Deductions like PF, tax (TDS), and insurance reduce your CTC to roughly 70-75% as in-hand salary.',
        },
      },
      {
        id: 'mod-0-1',
        title: 'Tax Basics & TDS',
        emoji: '🏛️',
        xpReward: 30,
        creditStoryBonus: 3,
        slides: [
          {
            emoji: '🏛️',
            title: 'What Is TDS?',
            content: 'TDS stands for Tax Deducted at Source. Your employer deducts income tax from your salary every month BEFORE paying you. It\'s not extra money taken — it\'s your tax paid in advance so you don\'t owe a lump sum later.',
          },
          {
            emoji: '📊',
            title: 'How Much Tax Do You Pay?',
            content: 'Under the new tax regime (2024), income up to ₹3L is tax-free. ₹3-7L is taxed at 5-10%. On a ₹45,000/month salary (₹5.4L/year), your tax is roughly ₹12,000/year — about ₹1,000/month. Not as scary as it sounds!',
          },
          {
            emoji: '✅',
            title: 'ITR Filing — Your Annual To-Do',
            content: 'Every July, you must file an Income Tax Return (ITR) — even if your employer already deducted TDS. It\'s how you claim refunds if extra tax was deducted. Use the income tax portal or apps like ClearTax. It takes 15 minutes.',
          },
        ],
        quiz: {
          question: 'TDS means your employer:',
          options: [
            'Adds bonus tax to your salary',
            'Deducts income tax before paying you each month',
            'Pays your rent tax',
            'Charges you for using the office',
          ],
          correctIndex: 1,
          explanation: 'TDS = Tax Deducted at Source. Your employer withholds your income tax monthly and deposits it with the government on your behalf.',
        },
      },
      {
        id: 'mod-0-2',
        title: 'Bank Account Types',
        emoji: '🏦',
        xpReward: 20,
        creditStoryBonus: 2,
        slides: [
          {
            emoji: '🏦',
            title: 'Savings vs. Salary Account',
            content: 'A savings account is for everyone — it earns 2.5-7% interest but may require a minimum balance. A salary account is linked to your employer — zero minimum balance, but converts to a savings account if salary stops for 3 months.',
          },
          {
            emoji: '🔒',
            title: 'Fixed Deposits (FDs)',
            content: 'Lock your money for 6 months to 5 years and earn higher interest (6-7.5%). Great for money you won\'t need soon. The trade-off: early withdrawal means a penalty. Think of FDs as a "patience reward."',
          },
          {
            emoji: '💳',
            title: 'Current Account — Not for You (Yet)',
            content: 'Current accounts are for businesses — they allow unlimited transactions but earn zero interest. As a salaried individual, you don\'t need one. Stick with your salary account for now.',
          },
        ],
        quiz: {
          question: 'What happens if salary credits stop for 3 months in a salary account?',
          options: [
            'The account gets closed immediately',
            'Nothing changes at all',
            'It converts to a regular savings account',
            'You get charged a monthly fee',
          ],
          correctIndex: 2,
          explanation: 'Salary accounts convert to savings accounts (with minimum balance requirements) if no salary is credited for ~3 months.',
        },
      },
      {
        id: 'mod-0-3',
        title: 'UPI & Digital Payments',
        emoji: '📱',
        xpReward: 20,
        creditStoryBonus: 2,
        slides: [
          {
            emoji: '📱',
            title: 'UPI — India\'s Payment Revolution',
            content: 'UPI (Unified Payments Interface) lets you send money instantly using just a phone number or UPI ID. No NEFT forms, no IFSC codes. Over 14 billion UPI transactions happen monthly in India. You\'re already part of this.',
          },
          {
            emoji: '🛡️',
            title: 'Staying Safe with UPI',
            content: 'Never share your UPI PIN with anyone — not even bank staff. No legitimate payment "requires" you to enter your PIN to RECEIVE money. If someone asks, it\'s a scam. Set transaction limits to cap accidental overspends.',
          },
          {
            emoji: '🔄',
            title: 'Auto-Pay & Mandates',
            content: 'UPI autopay lets you set up recurring payments (SIPs, subscriptions, rent) that debit automatically. You approve once, and it runs monthly. This is how you automate your financial life — set and forget.',
          },
        ],
        quiz: {
          question: 'If someone asks you to enter your UPI PIN to "receive" money, you should:',
          options: [
            'Enter the PIN quickly before the request expires',
            'Refuse — UPI PINs are only needed to SEND money',
            'Share your PIN over the phone for verification',
            'Create a new UPI ID and share that instead',
          ],
          correctIndex: 1,
          explanation: 'You never need to enter your UPI PIN to receive money. Any request asking for your PIN to "receive" payment is a scam.',
        },
      },
    ],
  },

  // ─── WORLD 1: Save Smart 💰 ───
  {
    id: 'world-1',
    title: 'Save Smart',
    emoji: '💰',
    description: 'Build unshakeable savings habits from day one',
    color: '#4f7cff',
    modules: [
      {
        id: 'mod-1-0',
        title: 'Emergency Fund 101',
        emoji: '🆘',
        xpReward: 30,
        creditStoryBonus: 4,
        slides: [
          {
            emoji: '🆘',
            title: 'Why You Need One ASAP',
            content: 'An emergency fund is 3-6 months of expenses saved in a liquid account. If you lose your job, have a medical issue, or face an unexpected repair — this is your safety net. Without it, you\'re one bad month away from debt.',
          },
          {
            emoji: '🎯',
            title: 'Your First Target: ₹10,000',
            content: 'Don\'t aim for 6 months right away. Start with ₹10,000 — that\'s roughly ₹2,500/month for 4 months. This covers a phone repair, a medical visit, or an unexpected travel expense. Small goal, massive peace of mind.',
          },
          {
            emoji: '📍',
            title: 'Where to Keep It',
            content: 'Your emergency fund should be liquid — NOT in FDs or stocks. A separate savings account or a liquid mutual fund works best. The key rule: accessible within 24 hours, but NOT in your daily spending account.',
          },
        ],
        quiz: {
          question: 'The ideal place for an emergency fund is:',
          options: [
            'A fixed deposit locked for 3 years',
            'Stocks that can be sold anytime',
            'A separate savings account or liquid fund',
            'Cash hidden at home',
          ],
          correctIndex: 2,
          explanation: 'Emergency funds need to be liquid (accessible within 24 hours) but separate from your daily spending account to avoid temptation.',
        },
      },
      {
        id: 'mod-1-1',
        title: 'The 50-30-20 Rule',
        emoji: '⚖️',
        xpReward: 25,
        creditStoryBonus: 3,
        slides: [
          {
            emoji: '⚖️',
            title: 'The Simplest Budget Framework',
            content: '50% for Needs (rent, food, transport), 30% for Wants (entertainment, dining, shopping), 20% for Savings & Investments. On ₹45,000: that\'s ₹22,500 needs, ₹13,500 wants, ₹9,000 savings. Simple to remember, easy to follow.',
          },
          {
            emoji: '🔧',
            title: 'Customize for Your Reality',
            content: 'Living with parents? Your "needs" might be just 15-20%. Shift that extra to savings. In a metro paying rent? Needs might hit 60%. The 50-30-20 is a starting point — adjust it, but always have a structure.',
          },
          {
            emoji: '📅',
            title: 'Day-One Budgeting Trick',
            content: 'On salary day, immediately transfer your savings/investment amount to a separate account. Spend what remains. This "pay yourself first" trick ensures you never accidentally spend your savings. Automate it with standing instructions.',
          },
        ],
        quiz: {
          question: 'In the 50-30-20 rule, the "20" refers to:',
          options: [
            '20% for entertainment and dining',
            '20% for rent and utilities',
            '20% for savings and investments',
            '20% for EMIs and loan payments',
          ],
          correctIndex: 2,
          explanation: 'The 20 in 50-30-20 stands for 20% of income directed toward savings and investments — your future-building allocation.',
        },
      },
      {
        id: 'mod-1-2',
        title: 'Automating Your Savings',
        emoji: '🤖',
        xpReward: 25,
        creditStoryBonus: 3,
        slides: [
          {
            emoji: '🤖',
            title: 'Why Automation Wins',
            content: 'Willpower is unreliable. If you manually transfer savings each month, you\'ll skip it when tempted. Automated standing instructions move money on salary day — before you see it. Research shows automated savers save 2× more than manual savers.',
          },
          {
            emoji: '⚙️',
            title: 'Set It Up in 2 Minutes',
            content: 'Go to your banking app → Standing Instructions → Set a monthly transfer of ₹9,000 (20% of ₹45K) to your savings account on the 1st of every month. Add another ₹2,000 for SIP. Done. Your savings now run on autopilot.',
          },
          {
            emoji: '🧠',
            title: 'The "Invisible Money" Trick',
            content: 'After automating, you effectively live on ₹34,000/month instead of ₹45,000. Your brain adapts within 2 months. You don\'t miss what you never see. This is the single most powerful financial habit you can build.',
          },
        ],
        quiz: {
          question: 'Why is automated saving more effective than manual transfers?',
          options: [
            'Banks offer higher interest for automated transfers',
            'It removes the need for willpower — money moves before you see it',
            'Manual transfers have higher fees',
            'Automated transfers earn double the returns',
          ],
          correctIndex: 1,
          explanation: 'Automation removes the decision point. You can\'t spend what you never see in your spending account.',
        },
      },
      {
        id: 'mod-1-3',
        title: 'High-Yield Savings',
        emoji: '📈',
        xpReward: 20,
        creditStoryBonus: 2,
        slides: [
          {
            emoji: '📈',
            title: 'Not All Savings Accounts Are Equal',
            content: 'Large banks offer 2.5-3.5% interest. Small finance banks and some digital banks offer 6-7%. On ₹1,00,000 saved: that\'s ₹3,500 vs ₹7,000 per year — double the return just by choosing the right account.',
          },
          {
            emoji: '🔍',
            title: 'What to Look For',
            content: 'Check: interest rate (quarterly compounding is best), minimum balance requirements, withdrawal limits, and whether the bank is RBI-regulated with DICGC insurance up to ₹5 lakh. Safety first, returns second.',
          },
          {
            emoji: '💡',
            title: 'The Parking Strategy',
            content: 'Keep 1-2 months of expenses in your salary account for daily use. Park your emergency fund in a high-yield savings account. Route investments through SIPs. Three accounts, three purposes — clean and optimized.',
          },
        ],
        quiz: {
          question: 'DICGC insurance protects your bank deposits up to:',
          options: [
            '₹1,00,000 per account',
            '₹5,00,000 per depositor per bank',
            '₹10,00,000 total across all banks',
            'Unlimited coverage for savings accounts',
          ],
          correctIndex: 1,
          explanation: 'DICGC (Deposit Insurance) covers up to ₹5 lakh per depositor per bank, protecting your money even if the bank fails.',
        },
      },
    ],
  },

  // ─── WORLD 2: Invest Early 📈 ───
  {
    id: 'world-2',
    title: 'Invest Early',
    emoji: '📈',
    description: 'Start your investment journey with confidence',
    color: '#a78bfa',
    modules: [
      {
        id: 'mod-2-0',
        title: 'What Are Mutual Funds?',
        emoji: '🧺',
        xpReward: 30,
        creditStoryBonus: 4,
        slides: [
          {
            emoji: '🧺',
            title: 'A Basket of Investments',
            content: 'A mutual fund pools money from thousands of investors and invests it in stocks, bonds, or both. You own a small piece of a diversified portfolio. Think of it as a thali meal — you get a bit of everything without cooking each dish yourself.',
          },
          {
            emoji: '👤',
            title: 'Who Manages Your Money?',
            content: 'Professional fund managers research and pick investments. You don\'t need to track the stock market daily. For a small fee (0.5-2% annually, called "expense ratio"), experts handle everything. Lower expense ratio = more returns for you.',
          },
          {
            emoji: '📊',
            title: 'Types That Matter for You',
            content: 'Index Funds: Track the Nifty 50 — lowest cost, great for beginners. Equity Funds: Higher risk, higher return. Debt Funds: Stable, low risk. Hybrid: Mix of both. Start with an Index Fund — it\'s the simplest, cheapest, and historically returns 12-15% annually.',
          },
        ],
        quiz: {
          question: 'An index fund is best for beginners because:',
          options: [
            'It guarantees 15% returns every year',
            'It\'s low-cost, diversified, and tracks the overall market',
            'It only invests in government bonds',
            'It has zero risk of losing money',
          ],
          correctIndex: 1,
          explanation: 'Index funds offer diversification at the lowest cost by tracking a market index like Nifty 50. They don\'t guarantee returns, but historically perform well over 5+ years.',
        },
      },
      {
        id: 'mod-2-1',
        title: 'SIP Explained Simply',
        emoji: '🔄',
        xpReward: 25,
        creditStoryBonus: 3,
        slides: [
          {
            emoji: '🔄',
            title: 'What Is a SIP?',
            content: 'SIP (Systematic Investment Plan) is auto-investing a fixed amount every month into a mutual fund. Instead of investing ₹24,000 at once, you invest ₹2,000/month. It\'s like a Netflix subscription — but for building wealth.',
          },
          {
            emoji: '📉',
            title: 'Rupee Cost Averaging',
            content: 'When markets drop, your ₹2,000 buys MORE units. When markets rise, your existing units grow in value. Over time, this averages out your purchase price. You don\'t need to "time the market" — SIP does it automatically.',
          },
          {
            emoji: '🚀',
            title: 'The Power of Starting at 22',
            content: '₹2,000/month SIP starting at 22 at 12% returns = ₹1.05 crore by age 50. Start at 30 instead? Only ₹50 lakh. Those 8 years cost you ₹55 lakh in lost compounding. Time is your biggest investment advantage. Start NOW.',
          },
        ],
        quiz: {
          question: '₹2,000/month SIP at 12% returns from age 22 to 50 grows to approximately:',
          options: [
            '₹6.72 lakh',
            '₹25 lakh',
            '₹50 lakh',
            '₹1.05 crore',
          ],
          correctIndex: 3,
          explanation: 'Compounding over 28 years turns ₹6.72 lakh invested (₹2K × 336 months) into ~₹1.05 crore. Starting early is the single biggest advantage.',
        },
      },
      {
        id: 'mod-2-2',
        title: 'Risk vs. Return',
        emoji: '⚖️',
        xpReward: 25,
        creditStoryBonus: 3,
        slides: [
          {
            emoji: '⚖️',
            title: 'The Golden Rule',
            content: 'Higher potential returns always come with higher risk. A savings account gives 3.5% with near-zero risk. Equity mutual funds can give 12-15% but can also drop 20% in a bad year. Understanding this trade-off is financial maturity.',
          },
          {
            emoji: '📏',
            title: 'Your Risk Capacity at 22',
            content: 'At 22, you have 30+ years before retirement. You can afford short-term drops because time smooths out volatility. A 22-year-old can allocate 70-80% to equity. A 55-year-old should do the opposite. Your age IS your risk advantage.',
          },
          {
            emoji: '🛡️',
            title: 'Diversification = Your Shield',
            content: 'Don\'t put all money in one stock or one fund. Spread across asset types: equity for growth, debt for stability, gold for crisis protection. Even within equity, an index fund gives you 50 companies at once. Diversify, don\'t speculate.',
          },
        ],
        quiz: {
          question: 'At age 22, you can take higher equity risk because:',
          options: [
            'Young people are luckier in the stock market',
            'You have 30+ years to recover from short-term market drops',
            'Equity funds guarantee returns for young investors',
            'Banks offer special equity rates for people under 25',
          ],
          correctIndex: 1,
          explanation: 'Time horizon is the key factor. With 30+ years ahead, short-term market volatility smooths out, making equity a suitable choice for long-term wealth building.',
        },
      },
      {
        id: 'mod-2-3',
        title: 'Starting Your First SIP',
        emoji: '🚀',
        xpReward: 30,
        creditStoryBonus: 4,
        slides: [
          {
            emoji: '🚀',
            title: 'Step 1: KYC — One-Time Setup',
            content: 'Before investing, complete KYC (Know Your Customer) — Aadhaar + PAN verification. Most platforms (Groww, Zerodha, Kuvera) do this digitally in 5 minutes. It\'s a one-time process that unlocks all future investments.',
          },
          {
            emoji: '🎯',
            title: 'Step 2: Pick Your Fund',
            content: 'For your first SIP, choose a Nifty 50 Index Fund with the lowest expense ratio. Popular options: UTI Nifty 50 (0.18% expense), HDFC Nifty 50 (0.20%). Don\'t overthink — any major Nifty 50 index fund works. Just start.',
          },
          {
            emoji: '✅',
            title: 'Step 3: Set ₹2,000/Month & Forget',
            content: 'Set up a ₹2,000/month SIP with auto-debit on the day after salary day. Choose "Direct" plan (lower fees than "Regular"). Then — and this is the hardest part — don\'t touch it. Don\'t check it daily. Let compounding work quietly.',
          },
        ],
        quiz: {
          question: 'When choosing between "Direct" and "Regular" mutual fund plans:',
          options: [
            'Regular plans have lower expense ratios',
            'Direct plans are cheaper because there\'s no distributor commission',
            'Both have identical returns',
            'Regular plans are only for professionals',
          ],
          correctIndex: 1,
          explanation: 'Direct plans skip the distributor commission, resulting in lower expense ratios and higher net returns over time. Always choose Direct for SIPs.',
        },
      },
    ],
  },

  // ─── WORLD 3: Credit Decoded 💳 ───
  {
    id: 'world-3',
    title: 'Credit Decoded',
    emoji: '💳',
    description: 'Understand credit before you need it',
    color: '#ffd166',
    modules: [
      {
        id: 'mod-3-0',
        title: 'What Is a CIBIL Score?',
        emoji: '📊',
        xpReward: 30,
        creditStoryBonus: 5,
        slides: [
          {
            emoji: '📊',
            title: 'Your Financial Report Card',
            content: 'CIBIL score is a 3-digit number (300-900) that tells lenders how trustworthy you are with borrowed money. Above 750? Banks love you. Below 650? You\'ll struggle to get loans or credit cards. No score at all? That\'s where you are right now.',
          },
          {
            emoji: '🔄',
            title: 'The Chicken-and-Egg Problem',
            content: 'You need credit history to get a credit card. But you need a credit card to build credit history. This is exactly why Day One\'s Fin Story exists — it builds an internal behavior score that bridges this gap until you have a real CIBIL score.',
          },
          {
            emoji: '📈',
            title: 'What Affects Your Score',
            content: 'Payment history (35%): Pay on time, always. Credit utilization (30%): Don\'t max out your card. Credit age (15%): Older accounts are better. Credit mix (10%): Variety helps. Inquiries (10%): Too many loan applications hurt you.',
          },
        ],
        quiz: {
          question: 'The most important factor in your CIBIL score is:',
          options: [
            'Your salary amount',
            'Payment history (paying on time)',
            'Number of bank accounts you have',
            'Your age',
          ],
          correctIndex: 1,
          explanation: 'Payment history accounts for 35% of your CIBIL score — the single biggest factor. Always pay at least the minimum due, on time.',
        },
      },
      {
        id: 'mod-3-1',
        title: 'Credit Cards 101',
        emoji: '💳',
        xpReward: 30,
        creditStoryBonus: 4,
        slides: [
          {
            emoji: '💳',
            title: 'Not Free Money — Free Time',
            content: 'A credit card gives you a 20-50 day interest-free window. Buy on day 1, pay by day 50 — zero interest. It\'s a cash-flow tool, not a spending boost. The trap: if you DON\'T pay in full, you\'re charged 36-42% annual interest. Ouch.',
          },
          {
            emoji: '🎯',
            title: 'The Only Rule That Matters',
            content: 'Always pay the FULL outstanding amount by the due date. Not the "minimum due" — the FULL amount. Paying only the minimum means the remaining balance snowballs at 3.5% per month. A ₹10,000 balance can become ₹14,000 in a year.',
          },
          {
            emoji: '✅',
            title: 'Your First Card Strategy',
            content: 'When you get your Day One card (Month 6 unlock!), use it only for expenses you\'d make anyway — groceries, subscriptions, fuel. Set up auto-pay for full balance. Keep utilization below 30% of your limit. This builds a stellar CIBIL score.',
          },
        ],
        quiz: {
          question: 'If you only pay the "minimum due" on your credit card:',
          options: [
            'You\'re in great shape — that\'s what it\'s for',
            'The remaining balance grows at 36-42% annual interest',
            'The bank waives the rest of the balance',
            'Your fin score improves faster',
          ],
          correctIndex: 1,
          explanation: 'Paying only the minimum due triggers interest charges of 3-3.5% per month (36-42% annually) on the unpaid balance. Always pay the full amount.',
        },
      },
      {
        id: 'mod-3-2',
        title: 'Good Debt vs. Bad Debt',
        emoji: '⚔️',
        xpReward: 25,
        creditStoryBonus: 3,
        slides: [
          {
            emoji: '⚔️',
            title: 'Not All Debt Is Evil',
            content: 'Good debt helps you build assets or earn more. An education loan that increases your salary by ₹2L/year? Good debt. A home loan for an appreciating property? Good debt. A personal loan for a vacation? That\'s bad debt — it creates no future value.',
          },
          {
            emoji: '🚫',
            title: 'Debt Traps to Avoid at 22',
            content: 'Buy Now Pay Later (BNPL) for impulse purchases. Credit card EMIs on gadgets. Personal loans for lifestyle upgrades. If you can\'t afford it with cash, you can\'t afford it. The exception: genuine emergencies (which your emergency fund should cover).',
          },
          {
            emoji: '📐',
            title: 'The 20% Rule',
            content: 'Total EMIs (including future ones) should never exceed 20% of your monthly income. On ₹45,000, that\'s ₹9,000 max. If a loan pushes you past this, you\'re over-leveraged. Banks check this ratio — it\'s called your FOIR (Fixed Obligation to Income Ratio).',
          },
        ],
        quiz: {
          question: 'Which of these is an example of "good debt"?',
          options: [
            'A personal loan to buy the latest iPhone',
            'An education loan that boosts your earning potential',
            'A credit card EMI for a vacation trip',
            'A BNPL purchase for designer clothes',
          ],
          correctIndex: 1,
          explanation: 'Good debt builds assets or increases earning capacity. An education loan that raises your salary creates long-term value — unlike consumption loans.',
        },
      },
    ],
  },

  // ─── WORLD 4: Future Planning 🏠 ───
  {
    id: 'world-4',
    title: 'Future Planning',
    emoji: '🏠',
    description: 'Plan your financial milestones ahead of time',
    color: '#f59e0b',
    modules: [
      {
        id: 'mod-4-0',
        title: 'Insurance Basics',
        emoji: '🛡️',
        xpReward: 30,
        creditStoryBonus: 4,
        slides: [
          {
            emoji: '🛡️',
            title: 'Insurance ≠ Investment',
            content: 'Insurance protects you from financial catastrophe. It\'s NOT an investment — it\'s a safety net. A ₹1 crore term life plan costs just ₹600-800/month at age 22. Health insurance covers a ₹5L hospital bill that would otherwise wipe out your savings.',
          },
          {
            emoji: '❤️',
            title: 'Health Insurance — Your #1 Priority',
            content: 'Even if your employer provides health cover, get your own ₹5-10L policy. Why? Employer cover vanishes when you switch jobs. Your own policy gives continuous coverage. At 22, a ₹5L health plan costs just ₹400-600/month. Prices rise sharply with age.',
          },
          {
            emoji: '📋',
            title: 'Term Life — Buy When Young',
            content: 'Term insurance pays your family a lump sum if something happens to you. No investment component, no maturity benefit — pure protection at the cheapest price. At 22, lock in a ₹1 crore plan for ₹600/month. At 35, the same plan costs ₹1,500/month.',
          },
        ],
        quiz: {
          question: 'Why should you buy health insurance even if your employer provides it?',
          options: [
            'Employer insurance covers everything you need',
            'Personal insurance continues even when you switch jobs',
            'Employer insurance is always better than personal',
            'You don\'t need health insurance at 22',
          ],
          correctIndex: 1,
          explanation: 'Employer health cover is temporary — it ends when you switch or leave. A personal policy provides continuous, portable coverage regardless of your job.',
        },
      },
      {
        id: 'mod-4-1',
        title: 'Rent vs. Buy',
        emoji: '🏘️',
        xpReward: 25,
        creditStoryBonus: 3,
        slides: [
          {
            emoji: '🏘️',
            title: 'The Great Indian Debate',
            content: 'Society says "buy a house ASAP." Math often says "rent and invest the difference." In metros, a ₹80L flat might cost ₹55,000/month in EMI, while renting the same flat costs ₹20,000. The ₹35,000 difference invested monthly can grow to ₹2+ crore in 15 years.',
          },
          {
            emoji: '🧮',
            title: 'The Real Cost of Buying',
            content: 'A ₹80L home loan at 9% for 20 years means you pay ₹1.53 crore total — almost double the property price! Add registration (7%), maintenance, property tax, and insurance. Buying makes sense ONLY when you\'re settled in a city and can hold for 10+ years.',
          },
          {
            emoji: '⏰',
            title: 'The Right Time to Buy',
            content: 'At 22 on ₹45K/month — it\'s too early. Focus on: building an emergency fund, starting SIPs, getting employer stability (2-3 years minimum). Target buying at 28-32 when your salary is 2-3× higher and you have a solid down payment saved.',
          },
        ],
        quiz: {
          question: 'At 22 with a ₹45,000 salary, the best housing strategy is:',
          options: [
            'Buy immediately with a home loan',
            'Rent affordably and invest the surplus',
            'Take a loan from parents for a down payment',
            'Buy a smaller property in a tier-2 city',
          ],
          correctIndex: 1,
          explanation: 'At an early career stage, renting is more financially sound. Investing the surplus in SIPs typically builds more wealth than property appreciation at this income level.',
        },
      },
      {
        id: 'mod-4-2',
        title: 'Retirement Planning (Yes, Already!)',
        emoji: '🏖️',
        xpReward: 30,
        creditStoryBonus: 5,
        slides: [
          {
            emoji: '🏖️',
            title: 'Why Think About Retirement at 22?',
            content: 'Because math doesn\'t care about your age. ₹5,000/month invested from 22 at 12% = ₹2.6 crore by 55. Start at 32? Just ₹95 lakh. That 10-year head start is worth ₹1.65 crore. Your 22-year-old self is your retirement plan\'s best asset.',
          },
          {
            emoji: '🏦',
            title: 'EPF — You\'re Already Saving',
            content: 'If you\'re salaried, 12% of your basic pay goes to EPF (Employee Provident Fund) — and your employer matches it. This is forced retirement saving at 8.15% interest. Don\'t withdraw it when switching jobs — let it compound. That\'s the whole point.',
          },
          {
            emoji: '🎯',
            title: 'NPS — The Extra Boost',
            content: 'National Pension System (NPS) gives you an extra ₹50,000 tax deduction (Section 80CCD). At 22, choose the aggressive equity option (75% equity). It\'s locked until 60, which is actually a FEATURE — it prevents you from raiding your retirement.',
          },
        ],
        quiz: {
          question: '₹5,000/month invested from age 22 at 12% returns will grow to approximately __ by age 55:',
          options: [
            '₹20 lakh',
            '₹95 lakh',
            '₹2.6 crore',
            '₹5 crore',
          ],
          correctIndex: 2,
          explanation: '33 years of compounding at 12% turns ₹19.8 lakh invested into approximately ₹2.6 crore. Starting early is the most powerful retirement strategy.',
        },
      },
    ],
  },
];

export default learningData;
