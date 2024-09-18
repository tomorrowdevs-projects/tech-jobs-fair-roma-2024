export type Recurrence = 'daily' | 'weekly' | 'monthly';

export const isRecurrence = (value: string): value is Recurrence => {
    return ['daily', 'weekly', 'monthly'].includes(value);
};