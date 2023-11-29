import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ConfigProvider, theme } from 'antd'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
          // token: {
          //   // Seed Token
          //   colorPrimary: '#00b96b',
          //   borderRadius: 2,

          //   // Alias Token
          //   colorBgContainer: '#f6ffed',
          // },
        }}
      >
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
