/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { userSlice } from './features/navbar/userSlice.tsx'

const queryClient: QueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ApiProvider api={userSlice}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</ApiProvider>
	</React.StrictMode>
)
