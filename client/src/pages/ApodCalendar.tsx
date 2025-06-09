import '../App.css'
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_APOD_BYDATE } from '../graphql/queries';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LikeButton from '../components/Button';

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
    <div className="apod-calender">
      <p className="apodcal-error">No photos for that date</p>
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
    <div className="apodcal-container">
      <h1 className="apodcal-page-title">Calender APOD Picker</h1>
      <div className="apodcal-div">
      <label className="apodcal-select">Select a date: </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date ?? new Date())}
        dateFormat="yyyy-MM-dd"
        placeholderText="Click to select a date"
      />
      <h1 className="apodcal-img-title">{apod.title}</h1>
      <p className="apodcal-date">{apod.date}</p>
      <LikeButton photo={apod} />
      {apod.media_type === 'image' ? (
        <img src={apod.url} alt={apod.title} className="apodcal-image" />
      ) : (
        <iframe
          src={apod.url}
          title={apod.title}
          width="100%"
          height="500"
          allowFullScreen
        ></iframe>
      )}

      <p className="apodcal-description">{apod.explanation}</p>
      </div>
    </div>
  );
};

export default Calendar;