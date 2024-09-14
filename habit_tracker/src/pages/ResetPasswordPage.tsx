import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

import {
    Box,
    Button,
    Container,
    Link,
    TextField,
    Typography,
} from '@mui/material';

import { useState } from "react";


export default function ResetPasswordPage() {
    const [email, setEmail] = useState('');
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
        <Container maxWidth="xs">
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
                    onChange={(e) => setEmail(e.target.value)}
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
    )
}
