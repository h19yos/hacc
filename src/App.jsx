import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppContent from './components/pages/Rout';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
