import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
// import ActuatorSizing from '../components/Actuatorsizing';
// import ActuatorSelector from '../components/Actuatorselector';
import ActuatorSizing from '../pages/ActuatorSizing';

function Mainlayout() {
  return (
    <div style={styles.layout}>
      <Header />
      <div style={styles.contentWrapper}>
        
           
        <main style={styles.main}>
         <Outlet />
        </main>
        
      </div>
      
      <Footer />
    </div>
  );
}

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  contentWrapper: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: '#fff',
  },
};

export default Mainlayout;