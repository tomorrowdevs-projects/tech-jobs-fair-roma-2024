import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

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

export default function ResetPasswordPage() {
	const [email, setEmail] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			setError(null);
			await sendPasswordResetEmail(auth, email);
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
					Inserisci la tua e-mail per recuperare la password
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
					{error && <Typography color="error">{error}</Typography>}
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						disabled={!email}
					>
						Recupera password
					</Button>
					<Box display="flex" sx={{ mt: 2 }}>
						<Link href="/login" variant="body2" sx={{ ml: 1 }}>
							Torna al login
						</Link>
					</Box>
				</form>
			</Container>
		</Box>
	);
}
