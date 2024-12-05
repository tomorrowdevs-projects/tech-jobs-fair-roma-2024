import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import styles from './HabitChartPage.module.css';

const HabitChartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { habits } = location.state || {};
  const [period, setPeriod] = useState('week');
  const [chartData, setChartData] = useState([]);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (habits && habits.length > 0) {
      const today = new Date();
      const startDate = period === 'week' ? subDays(today, 6) : subDays(today, 29);
      
      const dates = eachDayOfInterval({ start: startDate, end: today });
      
      const data = dates.map(date => {
        const dateString = format(date, 'yyyy-MM-dd');
        const habitCompletions = {};
        
        habits.forEach(habit => {
          const dayIndex = period === 'week' ? 6 - Math.floor((today - date) / (1000 * 60 * 60 * 24)) : Math.floor((today - date) / (1000 * 60 * 60 * 24));
          habitCompletions[habit.name] = habit.completions[dayIndex] ? 1 : 0;
        });

        return {
          date: dateString,
          ...habitCompletions
        };
      });

      setChartData(data);
    }
  }, [habits, period]);

  if (!habits || habits.length === 0) {
    return (
      <div className={styles.habitChartPage}>
        <button className={styles.goBackButton} onClick={handleGoBack}>
          Back
        </button>
        <p className={styles.noData}>
          No habit data available
        </p>
      </div>
    );
  }

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];

  return (
    <div className={styles.habitChartPage}>
      <div className="container py-4 py-md-5">
        <button className={styles.goBackButton} onClick={handleGoBack}>
          Back
        </button>
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <h1 className={styles.pageTitle}>Habit Progress</h1>
            <div className={styles.date}>Today: {format(new Date(), 'MMMM d, yyyy')}</div>
            
            <h2 className={styles.sectionTitle}>Your Habits:</h2>
            <ul className={styles.habitList}>
              {habits.map((habit, index) => (
                <li key={index} className={styles.habitItem}>
                  <span className={styles.habitName}>{habit.name}</span>
                  <span className={styles.habitFrequency}>
                    Frequency: {habit.frequency || 'N/A'}
                  </span>
                </li>
              ))}
            </ul>

            <div className={styles.buttonContainer}>
              <button
                className={`${styles.periodButton} ${period === 'week' ? styles.activePeriod : ''}`}
                onClick={() => setPeriod('week')}
              >
                Week
              </button>
              <button
                className={`${styles.periodButton} ${period === 'month' ? styles.activePeriod : ''}`}
                onClick={() => setPeriod('month')}
              >
                Month
              </button>
            </div>

            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(tick) => format(new Date(tick), 'MMM d')}
                    stroke="#ffffff"
                    padding={{ left: 2, right: 30 }}
                  />
                  <YAxis 
                    ticks={[0, 1]} 
                    domain={[0, 1]} 
                    stroke="#ffffff"
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', color: '#333' }}
                  />
                  <Legend />
                  {habits.map((habit, index) => (
                    <Line
                      key={habit.name}
                      type="monotone"
                      dataKey={habit.name}
                      stroke={colors[index % colors.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitChartPage;