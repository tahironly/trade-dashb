# Logistics Dashboard

A responsive React dashboard for monitoring shipment activity, delivery status, and live shipment locations through an interactive map interface.

This project was created as a frontend technical assignment with a focus on reusable components, clean UI structure, and interactive data visualisation.

---

## Features

- Shipment overview dashboard
- Interactive live map using Leaflet
- Route and delivery status tracking
- Reusable React components
- Responsive layout for desktop and mobile
- Mock logistics dataset integration
- Clean and modular project structure

---

## Tech Stack

- React
- Vite
- React Leaflet
- Leaflet
- JavaScript (ES6+)
- CSS

---

## Project Structure

```
src/
│
├── components/     # Reusable UI components
├── data/           # Mock shipment data
├── utils/          # Helper and utility functions
├── assets/         # Static assets
├── App.jsx
└── main.jsx
```
---

## Installation

```bash

npm install
npm run dev

```

## Design Decisions

This project focuses on maintainability, readability, and reusable component design.

Key implementation choices include:

- Component-based architecture for scalability
- Separation of UI, data, and utility logic
- Vite for a lightweight and fast development workflow
- React Leaflet for interactive shipment visualisation
- Mock data to simulate real-world dashboard behaviour

---

## Future Improvements

Possible enhancements for a production-ready version:

- Live API integration
- Authentication and role-based access
- Filtering and search functionality
- Analytics and chart visualisations
- Unit and integration testing
- Global state management
- Real-time updates with WebSockets
- Dark mode support

---

## Notes

This application uses mock data for demonstration purposes and does not include backend integration.
