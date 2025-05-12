import { StrictMode } from 'react'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

// export const BASE_URL="http://localhost:5000"

const root = ReactDOM.createRoot(document.getElementById('root'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
)
