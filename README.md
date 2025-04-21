# 🚗 Urban Parking Finder App

A modern and innovative mobile + web application that helps users **find**, **book**, and **manage** parking slots in real-time — while giving parking owners the tools to manage their lots, monitor usage, and generate reports.

Built with **React Native (Expo)** for users and an optional **Web Admin Panel** for owners using modern React + Tailwind UI principles.

---

## ✨ Features

### 🧑‍💼 User Side (Mobile App)

- 🔐 **Authentication**: Secure Login/Signup (JWT or Firebase)
- 📍 **Search Nearby**: Locate parking spots using GPS
- 📅 **Real-Time Booking**: Choose date, time, and duration
- 📲 **QR Entry/Exit**: Scan code for contactless access
- 📊 **Live Slot Availability**: View in real-time
- 💳 **Payment Integration**: Razorpay/Stripe ready
- 🕘 **Booking History**: View invoices and past bookings
- 🔔 **Push Notifications**: Get reminders and confirmations

### 🧑‍💼 Owner/Admin Panel (Web)

- ➕ **Manage Slots**: Add, edit, or delete parking spots
- 📆 **View Bookings**: Track and monitor reservations
- ✅ **Approve/Reject**: Manual booking control (if needed)
- 📈 **Generate Reports**: Revenue, occupancy, trends

### ⚙️ Tech Stack
| Area        | Tool/Library           |
|-------------|------------------------|
| Mobile UI   | React Native (Expo)    |
| Navigation  | React Navigation       |
| State Mgmt  | Zustand / Redux        |
| Auth        | Auth                   |
| Location    | Expo Location          |
| Payment     | Stripe                 |
| QR Code     | react-native-qrcode-svg|
| Animations  | Lottie, Reanimated     |
| Backend     | Node.js                |
| Dev Tools   | Expo Go, VS Code       |
| Styling     | Tailwind CSS           |   

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run app in Expo
npx expo start
