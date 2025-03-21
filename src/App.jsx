import React from 'react';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import ContentArea from './components/ContentArea/ContentArea';
import Footer from './components/Footer/Footer';
import './styles/App.css';

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <main className="grid-container">
        <ContentArea />
      </main>
      <Footer />
    </>
  );
}

export default App;

