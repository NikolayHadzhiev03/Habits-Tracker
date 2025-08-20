import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './context/userContext.tsx'
import { Provider } from 'react-redux'
import { store } from './Store/store.ts'
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <UserProvider>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </UserProvider>
  </Provider>
)
