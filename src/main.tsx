/**
 * Main application entry point
 * Initialises the React application and renders the root component
 */
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create and render the root React component
createRoot(document.getElementById("root")!).render(<App />);
