import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css'

function App() {
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href === '#signup') {
          e.preventDefault();
          setShowSignup(true);
        } else if (href === '#login') {
          e.preventDefault();
          setShowSignup(false);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  return showSignup ? <Signup /> : <Login />;
}

export default App
