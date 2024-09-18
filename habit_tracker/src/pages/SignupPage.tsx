import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import {
	Box,
	Button,
	Container,
	Link,
	TextField,
	Typography,
} from "@mui/material";

import { useState } from "react";
import theme from "../styles/theme";

export default function SignupPage() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			setError(null);
			await createUserWithEmailAndPassword(auth, email, password);
			setSuccess("Registrazione avvenuta con successo!");
		} catch (error: any) {
			setError(error.message);
		}
	};

	return (
		<Box
			sx={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: theme.palette.background.default,
			}}
		>
			<Container
				maxWidth="xs"
				sx={{
					padding: 4,
					border: `1px solid ${theme.palette.primary.main}`,
					borderRadius: 2,
					boxShadow: 3,
					backgroundColor: "background.paper",
				}}
			>
				<Typography variant="h5" align="center" gutterBottom>
					Habit App
				</Typography>
				<Typography variant="h5" align="center" gutterBottom>
					Registrati
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						label="E-mail"
						type="email"
						fullWidth
						margin="normal"
						value={email}
						onChange={e => setEmail(e.target.value)}
						sx={{
							backgroundColor: "background.default",
							borderRadius: "4px",
						}}
					/>
					<TextField
						autoComplete="off"
						label="Password"
						type="password"
						fullWidth
						margin="normal"
						value={password}
						onChange={e => setPassword(e.target.value)}
						sx={{
							backgroundColor: "background.default",
							borderRadius: "4px",
						}}
					/>
					{success && (
						<Box display="flex" sx={{ my: 2 }}>
							<Typography color="success">{success}</Typography>
							<Link href="/login" variant="body1" sx={{ ml: 1 }}>
								Vai al login
							</Link>
						</Box>
					)}
					{error && <Typography color="error">{error}</Typography>}
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						disabled={!email || !password}
					>
						Registrati
					</Button>
					<Box display="flex" sx={{ mt: 2 }}>
						<Typography variant="body2">Hai già un account?</Typography>
						<Link href="/login" variant="body2" sx={{ ml: 1 }}>
							Accedi
						</Link>
					</Box>
				</form>
			</Container>
		</Box>
	);
}
