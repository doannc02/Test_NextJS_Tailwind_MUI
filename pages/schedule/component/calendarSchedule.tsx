import React, { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Dialog, Button, TextField, DialogTitle, DialogContent, DialogContentText, DialogActions, Autocomplete } from "@mui/material";
import { useSchedules } from "./useSchedule";
import CoreAutocomplete from "@/components/CoreAutocomplete";
import CoreInput from "@/components/CoreInput";
import { DatePickerCustom } from "@/components/DatePickerCustom";
import CoreCheckbox from "@/components/CoreCheckbox";

require("react-big-calendar/lib/css/react-big-calendar.css");

const localizer = momentLocalizer(moment);

interface Appointment {
  title: string;
  start: Date;
  end: Date;
  desc: string;
}

const Calendar: React.FC = () => {
  const [ values, handles ] = useSchedules();
  const { methodForm, managers } = values;
  const { control } = methodForm; 
  const { onSubmit } = handles;
  const [events, setEvents] = useState<Appointment[]>([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [desc, setDesc] = useState("");
  const [openSlot, setOpenSlot] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [clickedEvent, setClickedEvent] = useState<Appointment | null>(null);
  
  const handleClose = () => {
    setOpenSlot(false);
    setOpenEvent(false);
  };

  const handleSlotSelected = (slotInfo: any) => {
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
    console.log(slotInfo, "slInfo")
    setTitle("");
    setDesc("");
    setOpenSlot(true);
  };

  const handleEventSelected = (event: Appointment) => {
    setStart(event.start);
    setEnd(event.end);
    setTitle(event.title);
    setDesc(event.desc);
    setClickedEvent(event);
    setOpenEvent(true);
  };

  const handleStartTime = (event: any, date: Date | null) => {
    setStart(date);
  };

  const handleEndTime = (event: any, date: Date | null) => {
    setEnd(date);
  };

  const setNewAppointment = () => {
    const appointment: Appointment = { title, start: start!, end: end!, desc };
    setEvents((prevEvents:any) => [...prevEvents, appointment]);
    handleClose();
  };

  const updateEvent = () => {
    if (!clickedEvent) return;

    const updatedEvents = events.map((event) =>
      event === clickedEvent
        ? { ...event, title, start: start!, end: end!, desc }
        : event
    );
    setEvents(updatedEvents);
    handleClose();
  };

  const deleteEvent = () => {
    if (!start) return;
  
    const updatedEvents = events.filter((event) => {
      const eventStartString = new Date(event.start).toISOString();
      return eventStartString !== start.toISOString();
    });
  
    setEvents(updatedEvents);
    handleClose();
  };
  

  const eventActions = [
    <Button
      key="cancel"
      variant="outlined"
      onClick={handleClose}
    >
      Cancel
    </Button>,
    <Button
      key="delete"
      variant="outlined"
      color="secondary"
      onClick={() => {
        deleteEvent();
        handleClose();
      }}
    >
      Delete
    </Button>,
    <Button
      key="confirmEdit"
      variant="outlined"
      color="primary"
      onClick={() => {
        updateEvent();
        handleClose();
      }}
    >
      Confirm Edit
    </Button>,
  ];

  const appointmentActions = [
    <Button
      key="cancel"
      variant="outlined"
      color="secondary"
      onClick={handleClose}
    >
      Cancel
    </Button>,
    <Button
      key="submit"
      variant="outlined"
      color="primary"
      onClick={() => {
        setNewAppointment();
        handleClose();
      }}
    >
      Submit
    </Button>,
  ];

  return (
    <div id="Calendar">
      <BigCalendar
        events={events}
        views={["month", "week", "day", "agenda"]}
        timeslots={2}
        defaultView="month"
        defaultDate={new Date()}
        selectable={true}
        localizer={localizer}
        onSelectEvent={(event) => handleEventSelected(event as Appointment)}
        onSelectSlot={(slotInfo) => handleSlotSelected(slotInfo)}
      />
    <Dialog
          open={openSlot}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          title="Chọn thời gian để đặt lịch?"
      >  
        <form onSubmit={onSubmit}>
        <DialogTitle>{"Chọn thời gian đặt lịch với Manager?"}</DialogTitle>
        <DialogContent sx={{display: "flex",flexDirection: "column" ,justifyContent:"space-evenly", height: "400px"}}>       
          <CoreAutocomplete required label="Chọn quản lý để đặt lịch"  placeholder="Chọn quản lý để đặt lịch" rules={{required: "Phải chọn Manager để đặt lịch!"}} options={managers??[]} control={control} labelPath="ManagerFullName" valuePath="ManagerId" name="ManagerId" />
          <DatePickerCustom  title="Chọn thời gian bắt đầu" control={control} name="Start" format='YYYY-MM-DDTHH:mm:ss' />
          <DatePickerCustom  title="Chọn thời gian kết thúc" control={control} name="End" format='YYYY-MM-DDTHH:mm:ss' />
          <CoreCheckbox label="Đặt lịch cho cả năm" name="StatusUpdate" control={control} />
        </DialogContent>
        <DialogActions>
        <Button
        type="submit"
          onClick={() => {
            handleClose();
          }}
        >
          Đặt lịch
        </Button>   
        </DialogActions>   
          </form>   
      </Dialog>
   
      <Dialog
        open={openEvent}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>{"Chọn thời gian đặt lịch với Manager?"}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{display:"flex",flexDirection:"column" ,justifyContent:"space-evenly", margin: "10px"}} id="alert-dialog-slide-description">          
            <TextField
          label="Title"
          fullWidth
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <TextField
          label="Description"
          fullWidth
          multiline
          defaultValue={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {/* <TimePicker
          label="Start Time"
          minutesStep={5}
          value={start}
          onChange={handleStartTime}
        />
        <TimePicker
          label="End Time"
          minutesStep={5}
          value={end}
          onChange={handleEndTime}
        /> */}
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
        <Button
          onClick={() => {
            updateEvent();
            handleClose();
          }}
        >
          Confirm Edit
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            deleteEvent();
            handleClose();
          }}
        >
          Delete
        </Button>
        </DialogActions>
    
       
      </Dialog>
    </div>
  );
};

export default Calendar;
