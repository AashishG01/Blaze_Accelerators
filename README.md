# Day One — Your Credit Story Starts Here

Day One is a premium, interactive React prototype built for first-salary earners (ages 21–25). 

Rather than overloading the user with a generic list of banking features, Day One leverages a single core wedge: **The Credit Story**. By turning everyday positive financial behaviors into a visible, gamified path toward formal credit options, Day One solves the classic chicken-and-egg problem for young professionals with zero credit history.

---

## 1. The Strategy: Wedge vs. Menu

Neobanking history proves that successful players win on a **wedge, not a menu**. Chime won on early direct payroll access; Nubank won by issuing credit cards to the unbanked. A broad list of standard features (savings accounts, generic cashbacks, basic spending graphs) is easily commoditized.

Furthermore, the collapse of neobank pioneer **Fi Money** in March 2026 (redirecting its 3.5 million users back to Federal Bank's FedMobile app due to unsustainable economics) proved that third-party fintech wrappers struggle to survive on shared deposit economics. 

**Day One** is built on the premise that traditional banks hold the ultimate structural advantage (balance sheets, licensed lending, regulatory depth). By embedding the **Credit Story** wedge directly into the primary banking experience, the host bank captures high-LTV customer relationships at the very beginning of their professional lives.

---

## 2. The Core Concept: What is "Credit Story"?

For a 22-year-old starting their first job, building credit is a paradox: you cannot get a credit card or loan without a CIBIL score, and you cannot build a CIBIL score without credit. 

**Credit Story** resolves this loop. It is an internal scoring engine that acts as the spine of the entire application:
- **Immediate Visibility:** The Credit Story gauge is placed at the top of the dashboard—above the balance card.
- **Positive Behavior Calibration:** Points are awarded for proactive habits (e.g., receiving salary, sticking to a budget, starting an index fund SIP, creating savings goals).
- **Gamified Milestone Unlocks:** Progression is tracked on a visual timeline leading to pre-approved, bank-backed credit products.

---

## 3. Screen-by-Screen Walkthrough

The prototype guides judges through a single, end-to-end narrative:

### Act 1: The Context Setup
* **Screen 1: Splash Screen** — A deep-gradient welcome showcasing the logo and the core value proposition: *"Your credit story starts here."*
* **Screen 2: Onboarding Carousel** — Three slides framing the journey: explaining that having no credit history is the starting line, detailing how everyday actions build your score, and highlighting the upcoming unlocks.
* **Screen 3: Account Type Selection** — Features a tailored **Salary Account** highlighted as recommended for first-jobbers, separating it from standard savings accounts.
* **Screen 4: Identity Verification** — A simulated Aadhaar/PAN check with verification loading animations.
* **Screen 5: Calibrated Context Quiz** — Moves away from generic risk quizzes. It asks:
  1. *Where are you living?* (e.g., Hostel/PG, with parents, independent flat)
  2. *Is this your first-ever salary?*
  3. *What is your salary amount?* (Hardcoded to ₹45,000 for the demo)
  4. *Do you have existing loans?*

### Act 2: Activating the Salary
* **Screen 6: Initial Dashboard** — Shows **Credit Score: 0** and **Balance: ₹0.00**. The Credit Story timeline prompts the user: *"Entry #1 is waiting — receive your first salary."* A simulation button triggers the credit.
* **Screen 7: Salary Celebration 🎉** — Confetti burst and value counter animation credits the ₹45,000. An animated card logs the first entry: `✅ First salary received — +10 Credit Story points`.
* **Screen 8: Calibrated Budgeting** — The app processes the quiz answers. Since the user lives in a hostel, the budget automatically adjusts to a custom split: **Essentials 30%**, **Savings 25%**, **Investments 20%**, and **Spending 25%** (explaining that hostel coverage reduces rent costs). Adjusting and locking the budget awards `+15 Credit Story` points.
* **Screen 9: Grounded AI Coach** — A pre-scripted, interactive chat. The user asks, *"Can I afford a Goa trip?"* The AI analyzes their spending limit and suggests a specific ₹5,000/month goal. Confirming the goal creates it and awards `+3 Credit Story` points.
* **Screen 10: Inline SIP Setup** — Instead of a complex investment portal, a single-path flow recommends a Nifty 50 Index Fund at ₹2,000/month. Starting the SIP awards `+10 Credit Story` points.
* **Screen 11: Goals Board** — Tracks the newly created Goa Trip, MacBook, and Emergency Fund goals. Each goal card details its monthly target and prospective Credit Story point yield.

### Act 3: The Payoff
* **Screen 12: Updated Dashboard** — Available balance displays ₹45,000, widgets denote active allocations, and the Credit Story score is now **38/100**.
* **Screen 13: Progress & Insights** — Tap into custom HTML5 canvas donut and bar charts displaying the budget categories and savings against targets alongside unlocked achievement badges.
* **Screen 14: Credit Story Timeline** — A detailed stepper showing completed actions (Salary, Budget, SIP, Goals) and upcoming milestones (consistent SIPs, first budget month completion).
* **Screen 15: Unlock Ladder (The Finale)**
  * **Month 6:** Unlocks a pre-approved, co-branded **Day One Credit Card** (2% cashback, zero annual fee) without requiring external CIBIL checks.
  * **Month 12:** Unlocks a pre-approved **Personal Loan** up to ₹2,00,000 at a preferred rate of 10.5% (3% below market) based on bank-verified behavior history.

---

## 4. Key Prototype Features

1. **Circular SVG Credit Gauge:** Smooth CSS stroke-dashoffset transitions automatically animate the dial on score changes.
2. **Context-Sensitive Slider Rules:** Budget sliders recalculate amounts in real-time, enforcing constraints and providing feedback.
3. **HTML5 Canvas Charting Engine:** Dependency-free chart logic rendering pixel-perfect, retina-scaled donut charts and target vs. actual bar graphs.
4. **Pre-scripted AI Chat Simulation:** Mimics messaging platforms with typing delays, action states, and clickable chip response paths.
5. **Interactive Feedback Animations:** Custom particle canvas bursts (confetti), numbers counters, and status updates.

---

## 5. Local Development & Installation

The project runs on a standard Vite-React stack without external plotting or styling library dependencies.

### Installation
1. Clone the project files to your directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the prototype in your browser at `http://localhost:5173/`.
