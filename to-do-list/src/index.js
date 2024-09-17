import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
const container = document.getElementById('result')
const root = createRoot(container)
root.render(<App tab="home" />)