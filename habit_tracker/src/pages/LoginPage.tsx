import { useState } from "react";

import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
	Box,
	Button,
	Container,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../styles/theme";

export default function LoginPage() {
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			setError(null);
			console.log(email, password);
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/");
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
					Login
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						autoComplete="username"
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
						autoComplete="current-password"
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
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						disabled={!email || !password}
					>
						Accedi
					</Button>
					{error && <Typography color="error">{error}</Typography>}
					<Box sx={{ mt: 3 }}>
						<Link href="/password-reset" variant="body2">
							Password dimenticata?
						</Link>
					</Box>
					<Box display="flex" sx={{ mt: 2 }}>
						<Typography variant="body2">Non hai un account?</Typography>
						<Link href="/signup" variant="body2" sx={{ ml: 1 }}>
							Registrati
						</Link>
					</Box>
				</form>
			</Container>
		</Box>
	);
}
