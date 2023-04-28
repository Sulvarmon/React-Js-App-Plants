import NotFound from './pages/notFound/notFound';
import './App.css';
import Home from './pages/home/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChoosePage from './pages/choosePage/choosePage';



function App() {


  return (
    <div className='container container-md gx-0 overflow-hidden position-relative'>
      <div className='background_image'></div>
      <BrowserRouter>
        <Routes>
          <Route exact={true} path="/" element={<Home />} />
          <Route exact={true} path="/choose-page" element={<ChoosePage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
