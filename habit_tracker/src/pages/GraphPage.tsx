import React, { useState } from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	Box,
	Select,
	FormControl,
	InputLabel,
	Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { auth } from '../../firebase'; // Assumi che tu stia usando Firebase per autenticazione
import { signOut } from 'firebase/auth';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GraphPage() {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedHabit, setSelectedHabit] = useState<string>(''); // Per la selezione delle habit
	const [habitDataOption, setHabitDataOption] = useState<string>(''); // Per Habit giornaliere
	const [chartData, setChartData] = useState<any>(null); // Per i dati del grafico

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		try {
			await signOut(auth);
			navigate('/');
		} catch (error) {
			console.error('Logout error:', error);
		}
	};

	const generateGraphData = (dataType: string) => {
		// Logica di esempio per generare dati di un grafico.
		if (dataType === 'giornaliere') {
			// Genera dati fittizi per le habit giornaliere (15 giorni)
			return {
				labels: Array.from({ length: 15 }, (_, i) => `Giorno ${i + 1}`),
				datasets: [
					{
						label: 'Habit Completate',
						data: Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)),
						borderColor: 'rgba(75, 192, 192, 1)',
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
					},
				],
			};
		} else {
			// Genera dati fittizi per una habit selezionata
			return {
				labels: Array.from({ length: 7 }, (_, i) => `Giorno ${i + 1}`),
				datasets: [
					{
						label: `Progresso di ${dataType}`,
						data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)),
						borderColor: 'rgba(153, 102, 255, 1)',
						backgroundColor: 'rgba(153, 102, 255, 0.2)',
					},
				],
			};
		}
	};

	const handleGenerateGraph = () => {
		// Genera il grafico basato su selectedHabit o habitDataOption
		const dataType = selectedHabit || habitDataOption;
		if (dataType) {
			const graphData = generateGraphData(dataType);
			setChartData(graphData);
		} else {
			console.log('Nessuna opzione selezionata per il grafico.');
		}
	};

	return (
		<Box sx={{ height: '90vh' }}>
			<AppBar position="static" sx={{ height: '80px' }}>
				<Toolbar sx={{ height: '80px' }}>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						Grafici Habit Tracker
					</Typography>
					<Typography variant="h6" sx={{ mr: 2 }}>
						{auth.currentUser?.email}
					</Typography>
					<IconButton onClick={handleMenuOpen}>
						<Avatar alt="Profile Icon" />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						sx={{ mt: 8 }}
					>
						<MenuItem onClick={() => navigate('/home')}>Home</MenuItem>
						<MenuItem onClick={handleLogout}>Logout</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>

			<Box sx={{ padding: 3 }}>
				{/* Seleziona la habit */}
				<FormControl fullWidth sx={{ mb: 3 }}>
					<InputLabel id="habit-select-label">Seleziona Habit</InputLabel>
					<Select
						labelId="habit-select-label"
						value={selectedHabit}
						label="Seleziona Habit"
						onChange={(e) => setSelectedHabit(e.target.value)}
					>
						<MenuItem value=""><em>Nessuna</em></MenuItem>
						<MenuItem value="habit1">Habit 1</MenuItem> {/* Modifica con le tue habit */}
						<MenuItem value="habit2">Habit 2</MenuItem>
					</Select>
				</FormControl>

				{/* Habit giornaliere (dati su 15 giorni) */}
				<Button
					variant={habitDataOption === 'giornaliere' ? 'contained' : 'outlined'}
					onClick={() => setHabitDataOption('giornaliere')}
					sx={{ mb: 3 }}
				>
					Habit Giornalieri (15 giorni)
				</Button>

				{/* Bottone per generare il grafico */}
				<Button variant="contained" onClick={handleGenerateGraph}>
					Genera Grafico
				</Button>

				{/* Stampa il grafico a schermo */}
				{chartData && (
					<Box sx={{ mt: 5 }}>
						<Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
					</Box>
				)}
			</Box>
		</Box>
	);
}
