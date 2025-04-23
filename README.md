# 🧠 AI Logo Generator (Expo + Firebase)

An AI-powered logo generator built with **Expo**, **Firebase**, and **Zustand** for state management. This app allows users to input a prompt, select from different logo styles, and generate a custom logo powered by AI.

---

## 📱 Features

- 🎨 Prompt-based AI logo generation  
- 🖼️ Carousel to choose logo styles  
- 📤 Save logo requests to Firebase  
- 🧾 Tracks generation delay time  
- 💾 Persistent app state using Zustand  
- ⚡ Smooth UI and loading states  
- 🛠 Responsive to user status (idle, processing, error, done)

---

## 🧭 How to Run

### 1. Clone the Repo

```bash
git clone https://github.com/mgnkgn/feraset-logo

cd feraset-case
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure firebase in firebaseConfig.js

Currently it is working with my firebase which is in test mode.

```bash
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
```

### 4. Run the App

```bash
npx expo start
```


## 🏗 Tech Stack

| Tech               | Purpose                                          |
|--------------------|--------------------------------------------------|
| **Expo**           | React Native development with fast iteration     |
| **Firebase**       | Cloud Firestore used for storing prompts         |
| **Zustand**        | Lightweight and intuitive global state management|
| **Expo Router**    | Navigation and screen transitions                |
| **React Native**   | Cross-platform UI framework                      |
| **Linear Gradient**| UI gradient button effects                       |
| **Custom Fonts**   | Consistent branding and typography (Manrope)     |


## 🧪 Functionality

- 🔤 **Prompt Input** – Users can type what logo they want
- 🎨 **Style Selection** – Choose from various predefined logo styles
- ⚙️ **Simulated AI Generation** – Adds realistic delay to mimic backend processing
- 🧠 **State Management** – Zustand handles global UI and data states
- ☁️ **Firestore Integration** – Saves prompt, style, and delay duration to Firebase
- 🚫 **Error Handling** – Prevents navigation if Firestore save fails
- 🔄 **Reset State on Focus** – Ensures fresh state when user returns to home
