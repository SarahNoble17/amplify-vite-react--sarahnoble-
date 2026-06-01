import React from 'react';
import ReactDOM from 'react-dom/client';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import App from './App.tsx';
import outputs from '../amplify_outputs.json';
import './index.css';
import '@aws-amplify/ui-react/styles.css';

// Configures backend resources
Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          {/* Top banner displaying user info and sign out button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f4f4f4' }}>
            <span>Welcome, <strong>{user?.username || user?.email}</strong></span>
            <button onClick={signOut} style={{ padding: '0.25rem 0.5rem' }}>Sign Out</button>
          </div>
          <App />
        </div>
      )}
    </Authenticator>
  </React.StrictMode>
);
