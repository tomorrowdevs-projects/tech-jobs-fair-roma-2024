import { useState, useEffect } from 'react';

import { auth, db } from '../../firebase';
import {
    addDoc,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
    DocumentReference,
    Timestamp,
} from 'firebase/firestore';

import { Habit } from '../types/Habit';

export const useHabits = () => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const getHabitRefById = async (id: string): Promise<DocumentReference | null> => {
        try {
            const habitsRef = collection(db, 'habits');
            const q = query(habitsRef, where('id', '==', id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                return doc.ref;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    };

    const addHabit = async (newHabit: Habit) => {
        try {

            if (!auth.currentUser)
                throw new Error('Utente non autenticato.');

            let habit = {
                ...newHabit,
                userId: auth.currentUser.uid,
                startDate: Timestamp.fromDate(newHabit.startDate),
                endDate: newHabit.endDate ? Timestamp.fromDate(newHabit.endDate) : null,
                completionDates: newHabit.completionDates.map((date) => Timestamp.fromDate(date)),
            };

            habit = cleanUndefinedFields(habit);

            await addDoc(collection(db, 'habits'), habit);
        } catch (e) {
            setError('Errore durante l\'aggiunta dell\'habit.');
        }
    };

    const completeHabit = async (habit: Habit, completionDate: Date) => {
        try {
            if (!auth.currentUser)
                throw new Error('Utente non autenticato.');

            const habitRef = await getHabitRefById(habit.id);

            if (habitRef) {
                const habitDoc = doc(db, 'habits', habitRef.id);
                await updateDoc(habitDoc, {
                    completionDates: arrayUnion(Timestamp.fromDate(completionDate)),
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    const deleteHabit = async (habit: Habit) => {
        try {
            if (!auth.currentUser)
                throw new Error('Utente non autenticato.');

            const habitRef = await getHabitRefById(habit.id);
            if (habitRef) {
                const habitDoc = doc(db, 'habits', habitRef.id);
                await deleteDoc(habitDoc);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const editHabit = async (updatedHabit: Habit) => {
        try {
            if (!auth.currentUser)
                throw new Error('Utente non autenticato.');

            let habitToUpdate = cleanUndefinedFields(updatedHabit);

            const habitRef = await getHabitRefById(updatedHabit.id);
            if (habitRef) {
                const habitDoc = doc(db, 'habits', habitRef.id);
                const updatedData = {
                    ...habitToUpdate,
                    userId: auth.currentUser.uid,
                    startDate: Timestamp.fromDate(habitToUpdate.startDate),
                    endDate: habitToUpdate.endDate ? Timestamp.fromDate(habitToUpdate.endDate) : null,
                    completionDates: habitToUpdate.completionDates.map((date) => Timestamp.fromDate(date))
                };

                await updateDoc(habitDoc, updatedData);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const fetchHabits = async () => {
        try {
            if (!auth.currentUser)
                throw new Error('Utente non autenticato.');

            setLoading(true);
            const userId = auth.currentUser.uid;
            const habitsRef = collection(db, 'habits');
            const q = query(habitsRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            const habitsData: Habit[] = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    ...data,
                    startDate: data.startDate instanceof Timestamp ? data.startDate.toDate() : new Date(data.startDate),
                    endDate: data.endDate ? (data.endDate instanceof Timestamp ? data.endDate.toDate() : new Date(data.endDate)) : null,
                    completionDates: (data.completionDates || []).map((date: Timestamp | string) =>
                        date instanceof Timestamp ? date.toDate() : new Date(date)
                    ),
                } as Habit;
            });

            setHabits(habitsData);
        } catch (e) {
            setError('Errore durante il recupero degli habits.');
        } finally {
            setLoading(false);
        }
    };

    const cleanUndefinedFields = <T extends object>(obj: T): T => {
        return Object.keys(obj).reduce((acc, key) => {
            const value = (obj as any)[key];
            if (value !== undefined) {
                (acc as any)[key] = value;
            }
            return acc;
        }, {} as T);
    };


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchHabits();
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        addHabit,
        completeHabit,
        deleteHabit,
        editHabit,
        error,
        fetchHabits,
        habits,
        loading,
        setError,
        setLoading,
        setHabits,
    };
};
