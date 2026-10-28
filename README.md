# ⚡ ParkVolt — Private Parking. EV Charging. Real People.

> **Peer-to-Peer Micro-Parking & Destination AC Charging Marketplace (Pune MVP Prototype)**  
> *Smarter Parking. Greener Tomorrow.*

---

## 🚨 The Problem
1. **Urban Parking Search:** Drivers spend 15–30 minutes circling high streets and business districts searching for parking, contributing to 30–40% of peak-hour city traffic.
2. **EV Range Anxiety:** Apartment EV owners without home chargers are forced to rely on expensive public DC fast chargers that degrade battery health over time.
3. **Idle Host Bays:** Thousands of private parking slots in gated societies and budget hotels sit vacant between 9 AM and 6 PM, earning ₹0.
4. **Gated Society Security:** Admitting outside vehicles into gated premises is the #1 objection from societies—requiring auditable, tamper-evident gate verification.

---

## 💡 The Solution: One Platform, Three Experiences

**ParkVolt** connects drivers who need guaranteed parking or slow AC charging within a 3-minute walk of their destination with property owners and residential societies who have idle bays.

| Role | Experience | Core Capabilities |
| :--- | :--- | :--- |
| 🚗 **Customer (Driver)** | **Find & Book** | Interactive Pune map discovery, filter by plug type (`CCS2`, `Type 2`, `15A`), upfront parking + kWh pricing, dynamic Visitor QR Pass, and live active-session countdown. |
| 🏢 **Provider (Host)** | **List & Earn** | Track real-time earnings (`80%` host share), toggle bay availability on/off live on the map, manage bay calendars, and track society maintenance rebates. |
| 🛡️ **Security Guard** | **Verify & Allow** | Mobile-first, AAA high-contrast gate portal. Delivers a `< 3 second` **VALID / CAUTION / INVALID** verdict with single-entry replay protection and manual plate lookup fallback. |
| ⚖️ **Judge / Admin** | **Audit Ledger** | Built-in Judge Fast-Track bar, Demo Clock time-travel (`T-30m`, `T-15m`, `T-5m`, `+20m Overstay`, `+65m Escalated`), and fee-split verification console. |

---

## 💰 Pricing, Fee Split & Overstay Engine

### 1. Upfront Pricing & Auditable Fee Split (`₹220` Reference Fixture)
$$\text{Session Total} = \text{Flat Hourly Parking Fee} + (\text{Estimated/Metered kWh} \times \text{Per-kWh Rate})$$

* **Parking Fee (2 hrs):** `₹100`
* **Electricity (`10 kWh × ₹12/kWh`):** `₹120`
* **Total Billed to Driver:** **`₹220`**
  * **Host Payout (`80%`):** **`₹176`**
  * **Platform Commission (`20%`):** **`₹44`**
    * **Society Community Rebate (`5%` of total, funded from Platform's `20%`):** **`₹11`** (credited to the society's common maintenance fund so the host's `₹176` share is untouched)
    * **Platform Net Remainder (`15%`):** **`₹33`**

### 2. Automated Overstay Engine & Pre-Auth Hold
* **In-App Warnings:** Trigger automatically at **30 minutes**, **15 minutes**, and **5 minutes** before booking expiry.
* **Overstay Penalty:** Billed at **`3×` the full hourly parking rate** for every started **15-minute block** after expiry (e.g., at `₹100/hr`, 20 minutes late = 2 started blocks = **`₹600` penalty**).
* **Pre-Authorization Hold:** Drawn automatically against the simulated `₹1,200` pre-authorization hold; flags the session as **`ESCALATED`** once the hold is exhausted.

---

## 🛠️ Tech Stack
* **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons
* **State & Persistence:** LocalStorage-backed persistent ledger (survives page refreshes across Customer, Provider, and Guard tabs)
* **Access Control:** Deterministic SVG QR Pass with simulated `HMAC-SHA256` single-entry token validation
* **Design System:** Dark Teal (`#0A252A`), Brand Teal (`#0E7490`), Electric Green (`#087443`), and WCAG AAA Guard Verdict tokens (`#0A5C2E` Valid, `#A4141B` Invalid, `#FFC107` Caution) with `tabular-nums` alignment

---

## 🚀 Quick Start (Run Locally in 60 Seconds)

```bash
# 1. Clone the repository
git clone [https://github.com/YOUR_USERNAME/parkvolt-mvp.git](https://github.com/YOUR_USERNAME/parkvolt-mvp.git)
cd parkvolt-mvp

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
