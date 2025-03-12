import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import App from './App';
import Upload from './components/Upload';
import SecureUpload from './components/SecureUpload';
import './index.css';

// Define the router with TypeScript support
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="upload" element={<Upload />} />
      <Route path="secure-upload" element={<SecureUpload />} />
    </Route>
  )
);

// Mount the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
