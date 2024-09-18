import { Recurrence } from "./Recurrence";

export interface Habit {
    id: string;
    userId: string;
    title: string;
    startDate: Date;
    endDate?: Date;
    startTime?: string;
    endTime?: string;
    notificationTime?: string;
    recurrence?: Recurrence;
    recurrenceInterval?: number;
    isAllDay: boolean;
    completionDates: Date[];
}
