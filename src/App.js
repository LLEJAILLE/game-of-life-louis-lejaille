import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Basic from './pages/basicGameOfLife/basic';
import CustomGOF from './pages/detailBameOfLife/customGOL';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/basic" element={<Basic />} />
                    <Route path="*" element={<Navigate to="/basic" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
