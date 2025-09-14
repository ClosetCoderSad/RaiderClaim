## 🚀 Overview and Features
**RaiderClaim** is a cross-platform lost & found & security service that empowers students to:

- Post **lost or found items** with photos in the app's community.
- Drop a pin on a **real-time** map to show where items were last seen.
- Interact through a **community** feed (likes, comments, and direct interactions).
- Call an **AI-powered voice agent** that queries a **live MongoDB database** to answer questions about items.
- Earn **Solana rewards** for contributing (posting/reporting) → **redeemable for NFTs** and campus merch.
- Recover items securely through an **Arduino smart locker system** that unlocks only with **unique PIN authentication.**


## 📌 Technology Stack  
- **Frontend**: Next.js, React.js, TypeScript, Tailwind CSS, ShadCN
- **Backend**: Node.js, MongoDB Atlas, RESTful APIs
- **AI Voice Agent**: Orchestrated using ElevenLabs + Twilio for call-based queries.
- **Chat Widget**: For the chat feature, we used Gemini Flash-2.0 model as the LLM.
- **Solana/Web3/Gamification**: Solana Web3.js SDK, Phantom to manage token rewards and NFT interactions
- **Hardware**: Arduino-based smart lock system with pin verification.
- **Deployment**: Hosted APIs on Render, frontend on Vercel.

## 🛠️ Getting Started  

### 🔹 Prerequisites  
- Node.js **v23.4.0**  


### 🔹 Installation  

#### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/YourUsername/RaiderClaim.git
cd RaiderClaim
```
#### **2️⃣ Set Up**
```bash
npm install
npm run dev
```
