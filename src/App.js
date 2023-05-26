import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import './App.css';
import Products from './components/routes/Products';
import Header from './components/routes/Header';
import Details from './components/routes/Details';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" Component={Products} />
        <Route path="Details/:id" Component={Details} />
      </Routes>
    </Router>
  );
}

export default App;
