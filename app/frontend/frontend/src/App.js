import './App.css';
import Header from './components/Header';
import BeneficiariesPage from './pages/BeneficiariesPage';
import RegisterPage from './pages/RegisterPage';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path='/' element={ <RegisterPage /> } />
        <Route path='/beneficiaries' element={ <BeneficiariesPage /> } />
      </Routes>
    </div>
  );
}

export default App;
