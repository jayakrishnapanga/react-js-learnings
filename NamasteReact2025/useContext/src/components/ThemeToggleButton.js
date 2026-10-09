// ThemeToggleButton.js
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext.js';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '10px 20px',
        cursor: 'pointer',
        background: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#333',
        border: '1px solid #ccc',
        borderRadius: '5px',
      }}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeToggleButton;
