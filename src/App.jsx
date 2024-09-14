import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HabitPage from './pages/HabitPage'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HabitPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
