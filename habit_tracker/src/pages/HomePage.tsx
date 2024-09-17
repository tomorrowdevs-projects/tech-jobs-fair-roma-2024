import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';

import { AppBar, Avatar, Box, Card, CardContent, Grid2, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useHabits } from '../hooks/useHabits';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function HomePage() {
    const navigate = useNavigate();
    const { error, habits, loading } = useHabits();

    const [selectedDate, setSelectedDate] = useState<Value>(new Date());
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const filteredHabits = habits.filter(habit => {
        const habitStart = habit.startDate;
        const habitEnd = habit.endDate || habit.startDate;


        if (selectedDate instanceof Date) {
            return selectedDate >= habitStart && selectedDate <= habitEnd;
        }
        return false;
    });


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
        }
    };

    if (loading) return <Typography variant="h6">Caricamento...</Typography>;
    if (error) return <Typography variant="h6" color="error">{error}</Typography>;

    return (
        <Box sx={{ height: '90vh' }}>

            <AppBar position="static" sx={{ height: '80px' }}>
                <Toolbar sx={{ height: '80px' }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Habit Tracker
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
                        <MenuItem>Profilo</MenuItem>
                        <MenuItem>Grafici</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Grid2 container sx={{ flex: 1, overflow: 'hidden' }}>
                <Grid2 sx={{ flex: 3, overflowY: 'auto', padding: 2 }}>
                    <Calendar onChange={setSelectedDate} value={selectedDate} />
                </Grid2>

                <Grid2 sx={{ flex: 9, overflowY: 'auto', padding: 2 }}>
                    <Grid2 container spacing={2}>
                        {filteredHabits.map((habit) => (
                            <Card key={habit.id}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {habit.title}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {habit.isAllDay ? 'Tutto il giorno' : `Dalle ${habit.startTime || 'N/A'} alle ${habit.endTime || 'N/A'}`}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Grid2>
                </Grid2>
            </Grid2>

            <IconButton
                color="primary"
                aria-label="Aggiungi habit"
                onClick={() => navigate('/addHabit')}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    }
                }}
            >
                <AddIcon />
            </IconButton>
        </Box>
    );
}