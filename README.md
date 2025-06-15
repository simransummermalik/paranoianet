# ParanoiaNet: AI-Powered Alternate Internet Simulation

**ParanoiaNet** is a psychological horror simulation disguised as a fake operating system. It’s an immersive web-based experience that evolves as you interact, blending **generative AI**, **timeline corruption**, and **dynamic content rewriting** into a single, narrative-driven technical showcase.

---

## 🔍 Project Overview

Users explore a fictional internet filled with fabricated news articles, glitchy memory logs, AI-generated content, and an interactive terminal. As you engage with the system, it rewrites itself — modifying articles, altering chat logs, and subtly gaslighting the player to create a growing sense of unreliability.

This is more than a UI experiment — it’s an **AI-powered storytelling engine**, where even your past clicks are rewritten.

---

## Key Features

- **Live AI Content Generation** – Dynamic news articles, logs, and UI content generated via GPT-4o.
- **Timeline Rewrites** – Article and log content subtly updates as your interactions increase.
- **Watcher-33 (AI NPC)** – A reactive GPT-powered “observer” that adapts and comments on your behavior.
- **Glitch-Aware Terminal** – A faux command line interface that triggers hidden content and rewritten files.
- **VSCode Window Simulation** – Includes a fake code editor that actively rewrites files while you watch.
- **Narrative-Driven Rewrite Levels** – The deeper you go, the more unstable the world becomes.

---

## 🛠 Built With

- **React + Vite** for performance and speed.
- **Tailwind CSS** for modern, responsive styling.
- **OpenAI API** (GPT-4o + DALL·E) for live AI-driven content.
- **Framer Motion** for UI transitions and subtle distortions.
- **xterm.js** for a live interactive shell component.
- **Modular architecture** with fully customizable rewrite levels and site logic.

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/paranoianet.git
cd paranoianet
npm install
cp .env.example .env    # Add your OpenAI API key
npm start
```

> **Note**: You must add your OpenAI key as `REACT_APP_OPENAI_API_KEY` in the `.env` file.  
> The key is **never committed** thanks to `.gitignore`.

Open `http://localhost:3000` to begin the experience.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Terminal.jsx
│   ├── VSCodeWindow.jsx
│   └── CoreMemoryWindow.js
├── utils/
│   ├── openaiService.js
│   ├── rewriteManager.js
│   └── ghostRewrite.js
├── fakeSites.js
├── App.js
└── index.js
```

---

## 🧪 Dev Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Run the development server (CRA) |
| `npm run build` | Create production build |
| `npm run lint` | Run ESLint/Prettier |
| `npm test` | Run unit tests (Jest) |

---

## 🗺 Roadmap

- Advanced memory rewriting using embeddings
- Procedurally generated fake domains with GPT
- Save/load replayable “rewritten timelines”
- Multi-user collaborative mode (shared hallucinations)
- Full Docker deployment support

---

Built by **[Summer Malik]**, a developer passionate about blending machine learning, storytelling, and interactive experiences.  
This project explores the intersection of artificial intelligence, UX manipulation, and narrative control — all wrapped in a deeply immersive interface.

> If you enjoy creative applications of AI and interactive design, feel free to star this repo and connect!

---



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
