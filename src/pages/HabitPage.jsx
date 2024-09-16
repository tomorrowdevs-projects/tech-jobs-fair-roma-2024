import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './HabitPage.module.css';

const HabitPage = () => {
  const [dates, setDates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState('');

  const getCalendarDates = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dateArray = [];
    const today = new Date();

    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dateArray.push({
        day: days[date.getDay()],
        date: date.getDate(),
        isToday: i === 0
      });
    }
    setDates(dateArray);
  };

  useEffect(() => {
    getCalendarDates();
  }, []);

  const handleModalToggle = () => setShowModal(!showModal);

  const handleSaveHabit = () => {
    if (newHabitName.trim() !== '') {
      const newHabit = {
        name: newHabitName,
        completions: Array(5).fill(false)
      };
      setHabits([...habits, newHabit]);
      setNewHabitName('');
      handleModalToggle();
    }
  };

  const toggleHabitCompletion = (habitIndex, dateIndex) => {
    const updatedHabits = [...habits];
    updatedHabits[habitIndex].completions[dateIndex] = !updatedHabits[habitIndex].completions[dateIndex];
    setHabits(updatedHabits);
  };

  return (
    <div className={`${styles.habitPage} min-vh-100 d-flex flex-column py-4 py-md-5`}>
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-8 col-sm-6 col-md-4 mt-4">
            <img src="/habit.svg" alt="Habit Icon" />
          </div>
        </div>
        
        <h1 className={`${styles.pageTitle} text-center mb-4`}>Set your goals</h1>
        
        <div className="d-flex justify-content-end mb-3">
          <button onClick={handleModalToggle} className={`${styles.btnCircle} me-4`}>+</button>
          <button className={`${styles.btnCircle}`}>≡</button>
        </div>

        <div className="row">
          <div className="col-12">
            <div className={`${styles.calendarStrip} d-flex justify-content-between mb-4 mt-4 p-2 rounded`}>
              {dates.map((item, index) => (
                <div key={index} className={`${styles.calendarDay} text-center p-1 rounded ${item.isToday ? styles.today : ''}`}>
                  <div className={styles.dateNumber}>{item.date}</div>
                  <div className={styles.dayName}>{item.day}</div>
                </div>
              ))}
            </div>
            {habits.map((habit, habitIndex) => (
              <div key={habitIndex} className={`${styles.habitRow} d-flex align-items-center mb-3`}>
                <div className={styles.habitName}>{habit.name}</div>
                <div className={`${styles.completionStrip} d-flex justify-content-between`}>
                  {habit.completions.map((completed, dateIndex) => (
                    <button
                      key={dateIndex}
                      className={`${styles.completionButton} ${completed ? styles.completed : styles.notCompleted}`}
                      onClick={() => toggleHabitCompletion(habitIndex, dateIndex)}
                    >
                      {completed ? '✔' : '×'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {habits.length === 0 && (
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <div className={`${styles.bigCircle} d-flex align-items-center justify-content-center text-center mt-4 p-3`}>
              You have no active habits
            </div>
          </div>
        )}

        {/* Modal for adding new habit */}
        <Modal show={showModal} onHide={handleModalToggle} centered>
          <Modal.Header closeButton className={`${styles.modalHeader}`}>
            <Modal.Title>Create Habit</Modal.Title>
          </Modal.Header>
          <Modal.Body className={`${styles.modalBody}`}>
            <Form>
              <Form.Group controlId="habitName">
                <Form.Label className="text-white">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter habit name"
                  className={styles.inputField}
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="habitFrequency" className="mt-3">
                <Form.Label className="text-white">Frequency</Form.Label>
                <Form.Select className={styles.inputField}>
                  <option value="everyday">Everyday</option>
                  <option value="every3days">Every 3 Days</option>
                  <option value="onceaweek">Once a Week</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="habitReminder" className="mt-3 d-flex align-items-center justify-content-between">
                <Form.Label className="text-white mb-0">Reminder</Form.Label>
                <Form.Check 
                  type="switch"
                  id="custom-switch"
                  className={styles.switch}
                  checked={reminder}
                  onChange={() => setReminder(!reminder)}
                />
              </Form.Group>

              <Button variant="outline-light" className={`${styles.saveButton} mt-4 w-100`} onClick={handleSaveHabit}>
                Save Habit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default HabitPage;