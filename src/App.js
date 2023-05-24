import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import { addProduct } from './redux/products/productsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/1')
      .then((response) => response.json())
      .then((data) => dispatch(addProduct(data)))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
