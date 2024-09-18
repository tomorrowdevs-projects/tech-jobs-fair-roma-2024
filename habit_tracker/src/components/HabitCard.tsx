import React from 'react';
import { Card, CardContent, Typography, IconButton, Tooltip, Box } from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Habit } from '../types/Habit';
import { useHabits } from '../hooks/useHabits';

interface HabitCardProps {
    habit: Habit;
    selectedDate: Date;
    handleOpenModal: (habit: Habit | null) => void;
    onUpdate: () => void;
}



const HabitCard: React.FC<HabitCardProps> = ({ habit, selectedDate, handleOpenModal, onUpdate }) => {

    const { completeHabit, deleteHabit } = useHabits();

    const handleCompleteHabit = async (habit: Habit) => {
        await completeHabit(habit, selectedDate);
        onUpdate();
    }

    const handleDeleteHabit = async (habit: Habit) => {
        await deleteHabit(habit);
        onUpdate();
    }

    const handleEditHabit = async (habit: Habit | null) => {
        handleOpenModal(habit);
    }

    const isCompleted = habit.completionDates.some(date => date.toDateString() === selectedDate.toDateString());

    return (
        <Card>
            <CardContent>
                <Typography
                    variant="h6"
                    component="div"
                    style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
                    {habit.title}
                </Typography>
                <Typography color="text.secondary">
                    {habit.isAllDay ? 'Tutto il giorno' : habit.endDate ?
                        `Alle ${habit.startTime}` : `Dalle ${habit.startTime} alle ${habit.endTime}`}
                </Typography>
            </CardContent>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="flex-end" flexGrow={1}>
                    <Tooltip title="Completa">
                        <IconButton color="success" onClick={async () => await handleCompleteHabit(habit)}>
                            <CheckIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Modifica">
                        <IconButton color="primary" onClick={async () => await handleEditHabit(habit)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Elimina">
                        <IconButton color="error" onClick={async () => await handleDeleteHabit(habit)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </CardContent>
        </Card>
    );
};

export default HabitCard;