# 🚦 GLOSA-BHARAT: Intelligent Urban Mobility Ecosystem

[![Atmanirbhar Bharat](https://img.shields.io/badge/Initiative-Atmanirbhar%20Bharat-orange.svg)](https://www.india.gov.in/spotlight/atmanirbhar-bharat- अभियान)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tech Stack](https://img.shields.io/badge/Stack-Fullstack%20AI-blue.svg)](#-tech-stack)

**GLOSA-BHARAT** (Green Light Optimal Speed Advisory) is a high-fidelity Vehicle-to-Infrastructure (V2I) ecosystem designed to eliminate urban traffic friction and fuel wastage using indigenous AI. Aligned with India's **Smart City** initiatives, it provides real-time speed advisories to drivers, allowing them to pass through traffic signals during the green phase without stopping.

---

## 🌟 Key Features

- **🚀 Real-time Speed Advisory**: Calculates and displays the optimal speed to catch the next green light.
- **🧠 Indigenous AI Core**: Custom-trained models (YOLOv8) optimized for heterogeneous Indian traffic (Bikes, Autos, Vans).
- **📊 Digital Twin Dashboard**: A futuristic Leaflet-based GIS dashboard for traffic authorities to monitor congestion and signal health.
- **⚡ Low-Latency Orchestration**: High-speed Node.js middleware for sub-second data routing.
- **🌱 Fuel & Emission Reduction**: Potential 15-20% reduction in fuel consumption and PM2.5 emissions.
- **🛰️ Hardware-Agnostic**: Works with existing government CCTV infrastructure—no expensive LIDAR needed.

---

## 🏗️ System Architecture

The project is built on a 4-Stage Enterprise Architecture:

1.  **Perception Layer**: Intelligent Edge using Computer Vision (`YOLOv8`, `OpenCV`) to detect traffic density.
2.  **Orchestration Layer**: Centralized Node.js microservice managing data flow and synchronization.
3.  **Advisory Engine**: Mathematical models and predictive analytics for speed optimization.
4.  **Interaction Layer**: Futuristic React.js dashboard with Framer Motion animations and Socket.io for real-time updates.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS, Framer Motion
- **Maps**: Leaflet GIS
- **Real-time**: Socket.io-client

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas)
- **Communication**: Axios, Socket.io

### AI Service
- **Language**: Python
- **Framework**: FastAPI
- **CV Library**: OpenCV, YOLOv8 (Inference)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.9+
- MongoDB instance

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sohansarkar07/GLOSA-BHARAT.git
   cd GLOSA-BHARAT
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   # Create a .env file with your MONGODB_URI
   npm start
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Setup AI Service**:
   ```bash
   cd ../ai-service
   pip install -r requirements.txt
   python main.py
   ```

---

## 🇮🇳 Why GLOSA-BHARAT?

Unlike Western traffic management systems, GLOSA-BHARAT is built for the **Indian reality**:
- **Sovereign Hardware Independence**: Leverages existing CCTV networks.
- **Cultural Intelligence**: Handles unlane-led behavior and high-density environments.
- **National Security**: Keeps traffic telemetry on local Indian servers.

---

## 📈 Impact & Vision

- **B2G**: Traffic Monitoring as a Service (TMaaS) for Smart Cities.
- **B2B**: Fleet optimization for logistics partners (Zomato, Swiggy, Amazon).
- **Future**: Integration with autonomous vehicle EV platforms.

---

## 🤝 Contributing

We welcome contributions! Whether it's fixing bugs, improving the AI model, or enhancing the UI, feel free to open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Developed for the **AI for Atmanirbhar Bharat Seminar 2026**.
