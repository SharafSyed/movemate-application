import './App.css';
import DatePicker from 'react-datepicker';
import React, { useState, useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css'
import Modal from './Modal'

function App() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, onTimeChange] = useState('');
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [hrs, setHrs] = useState(null);
  const [maxHrs, setMaxHrs]= useState(24);
  const [isWeekend, setWeekendState] = useState(false);
  const today = new Date();
  const futureLimit = new Date(today.getFullYear()+20, today.getMonth(), today.getDate());
  const [totalCost, setTotalCost] = useState('');
  const [show, setVisibility] = useState(false);
  const [isValid, setValid] = useState(null)

  useEffect(() => {
      setMaxHrs(24 - parseFloat(selectedTime));
      console.log(maxHrs);
    },[selectedTime])

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    setWeekendState(date.getDay() === 0 || date.getDay() === 6);
    console.log(isWeekend);
    console.log(futureLimit)
  }

  const handleTime = (event) => {
    onTimeChange(event.target.value)
    
  }

  function updateTime(event) {
    setHrs(event?.target.value);
    console.log(hrs);
  }

  function handleSubmit() {
    const cost = isWeekend? 150 * parseFloat(hrs): 100*parseFloat(hrs);
    if(selectedDate && selectedTime && hrs){
        setTotalCost("The total cost of this booking is: $" + cost.toString());
        setValid('Booking Confirmed!')
      }
    else{
      setTotalCost("Please enter a valid booking period");
      setValid('Invalid Booking')
    }
    setVisibility(true);
  }

  return (
    <div className='App'>
      <h1>Welcome! Please make a Booking</h1>
      <h2>Costs:</h2>
      <h3>Weekdays............$100/hr</h3>
      <h3>Weekends............$150/hr</h3>
      <br></br>
      <DatePicker 
        wrapperClassName= "datepicker"
        selected={selectedDate}
        onChange={ date => handleSelectedDate(date)}
        dateFormat= "dd/MM/yyyy"
        placeholderText='Select Booking Date Please'
        minDate ={new Date()}
        maxDate = {futureLimit}
        dateFormatCalendar='MMMM'
        required = {true}
        showYearDropdown = {true}
        scrollableYearDropdown
        yearDropdownItemNumber={20}
        preventOverFlow = {false}
        popperPlacement = {'bottom'}
        popperModifiers={{
          flip: {
              behavior: ["bottom"] // don't allow it to flip to be above
          },
          preventOverflow: {
              enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
          },
          hide: {
              enabled: false // turn off since needs preventOverflow to be enabled
          }
      }}
      />
      <br></br>
      <label className='label'>
        Enter Length of Booking:
        <input
        className = "picker"
        type="number"
        onKeyDown={e => symbolsArr.includes(e.key) && e.preventDefault()}
        onChange = {(event) => updateTime(event)}
        value = {hrs}
        max = {maxHrs}
        min = '0'
      />
      Enter Time of Booking:
      <input
        type="time" 
        required
        className = "picker"
        value = {selectedTime}
        onChange = {event => handleTime(event)}
      />
      </label>

      <br></br>

      <button className = 'button' onClick = {() => handleSubmit()}>Book Time Slot!</button>

      <Modal title={isValid} onClose={() => setVisibility(false)} show={show}>
        {totalCost}
      </Modal>

    </div>
    
    
  )
}

export default App;
