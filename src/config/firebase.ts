const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || 'AIzaSyCFda70AywhbbcxE28tBG1kEbgKUnvdeWw',
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || 'e-commerce-733b1.firebaseapp.com',
  projectId: import.meta.env.VITE_PROJECT_ID || 'e-commerce-733b1',
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || 'e-commerce-733b1.appspot.com',
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || '668314667929',
  appId: import.meta.env.VITE_APP_ID || '1:668314667929:web:d34a977ed4c87baaf6e108',
  measurementId: import.meta.env.VITE_MEASUREMENT_ID || 'G-4S5ZV6R869',
};

export {firebaseConfig};
