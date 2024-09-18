import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";
import GraphPage from "./pages/GraphPage";

import theme from "./styles/theme";

import dayjs from 'dayjs';
import 'dayjs/locale/it';

import "./App.css";

function App() {

	dayjs.locale('it'); // Imposta il locale predefinito a italiano

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={<ProtectedRoute element={<HomePage />} />}
						/>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/password-reset" element={<ResetPasswordPage />} />
						<Route path="/grafici" element={<GraphPage />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</LocalizationProvider>
	);
}

export default App;
