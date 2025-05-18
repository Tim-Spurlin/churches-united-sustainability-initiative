import React from 'react';
import './App.css';
import ImpactAnalysis from './components/impact-analysis';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Churches United Sustainability Initiative</h1>
        <h2>Visualization Dashboard</h2>
      </header>
      <main>
        <ImpactAnalysis />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Churches United for the Homeless</p>
      </footer>
    </div>
  );
}

export default App;
