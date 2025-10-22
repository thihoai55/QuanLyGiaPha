import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TrangChu from './trang/TrangChu';
import DangNhap from './trang/DangNhap';
import DangKy from './trang/DangKy';
import Dashboard from './trang/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrangChu />} />
        <Route path="/dang-nhap" element={<DangNhap />} />
        <Route path="/dang-ky" element={<DangKy />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
