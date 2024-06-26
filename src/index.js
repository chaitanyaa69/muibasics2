import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './App/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor=persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
       <Provider store={store}>
          <PersistGate persistor={persistor}>
             <BrowserRouter>
                 <App />
             </BrowserRouter> 
          </PersistGate>
       </Provider>
    </React.StrictMode>
  
);