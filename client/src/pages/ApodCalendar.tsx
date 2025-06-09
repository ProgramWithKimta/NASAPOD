import '../App.css'
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_APOD_BYDATE } from '../graphql/queries';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Calendar () {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { loading, error, data } = useQuery(GET_APOD_BYDATE, {
    variables: { 
      date: (() => {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // getMonth is 0-based
        const day = String(selectedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      })()
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return (
    <div style={styles.container}>
      <p style={styles.error}>No photos for that date</p>
      <label>Select a date: </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date ?? new Date())}
        dateFormat="yyyy-MM-dd"
        placeholderText="Click to select a date"
      />
    </div>
  )

  const apod = data.apodByDate;

  return (
    <div style={styles.container}>
      <label>Select a date: </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date ?? new Date())}
        dateFormat="yyyy-MM-dd"
        placeholderText="Click to select a date"
      />
      <h1>{apod.title}</h1>
      <p>{apod.date}</p>

      {apod.media_type === 'image' ? (
        <img src={apod.url} alt={apod.title} style={styles.image} />
      ) : (
        <iframe
          src={apod.url}
          title={apod.title}
          width="100%"
          height="500"
          allowFullScreen
        ></iframe>
      )}

      <p>{apod.explanation}</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center' as const,
  },
  image: {
    maxWidth: '100%',
    borderRadius: '10px',
  },
  error: {
    color: 'red',
    fontStyle: 'italic'
  }
};

export default Calendar;