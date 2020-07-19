import React from 'react';
import "./App.css";
import { Nav } from '@/components';
import { Myfooter } from '@/components';

function App() {
  return (
    <div className="app-container">
      <div className = "app-content">
         <Nav />  This is app
      </div>
      <Myfooter />
    </div>
    
  );
}

export { App };
