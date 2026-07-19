# 🚢 Odin Battleship

A modern browser-based **Battleship** game built with pure JavaScript, utilizing Test-Driven Development (TDD) principles. This project is part of The Odin Project curriculum.

---

## 🎮 Features & Implementation
- **Core Game Logic**: Implemented with robust, test-driven JavaScript objects:
  - `Ship`: Handles ship length, hit registering, and tracking whether it is sunk.
  - `Gameboard`: Handles grid layouts, ship placement, hit reception, and tracking missed/successful hits.
  - `Player`: Supports human players and future AI computer opponents, each with their own gameboard and fleet of ships.
- **TDD Workflow**: Fully tested with [Jest](https://jestjs.io/) to verify correctness of rules, placement constraints, and combat mechanics.
- **Webpack Bundler**: Organized with multi-environment Webpack configurations (`development` with source mapping & local server, and `production`).

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 🔧 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kanithi01karthik/odin_battleship.git
   cd odin_battleship
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

---

## 🛠️ Available Scripts

Once dependencies are installed, you can use the following commands:

### Start Development Server
Runs the app in development mode using Webpack Dev Server:
```bash
npm run start
```
Open [http://localhost:8080](http://localhost:8080) to view it in your browser. The page will reload if you make edits.

### Build for Production
Builds the app for production, optimizing and cleaning the output in the `dist` folder:
```bash
npm run build
```

### Run Tests
Executes the Jest test suite to verify the game logic:
```bash
npm test
```

---

## 📁 Project Structure

```
odin_battleship/
├── src/
│   ├── assets/          # Static assets (images, icons)
│   ├── objects.js       # Core game objects (Ship, Gameboard, Player)
│   ├── uiHandler.js     # UI rendering and event handlers
│   ├── index.js         # Entry point for the application
│   ├── template.html    # Base HTML template for Webpack
│   └── test.spec.js     # Jest unit tests for the core logic
├── babel.config.js      # Babel transpiler configuration
├── webpack.common.js    # Shared Webpack configuration
├── webpack.dev.js       # Webpack development server configuration
├── webpack.prod.js      # Webpack production build configuration
├── package.json         # NPM metadata and dependencies
└── .gitignore           # Ignored files list
```
