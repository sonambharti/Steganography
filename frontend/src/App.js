import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Encoder from './components/Encoder.tsx';
import Decoder from './components/Decoder.tsx';
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Steganography Tool</h1>
        <Routes>
          <Route path="/" element={<Encoder />} />
          <Route path="/decoder" element={<Decoder />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
