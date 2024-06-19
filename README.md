
import * as React from 'react';
import { useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, useTheme, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Header from '../../Components/dashboardPages/Header';
import { tokens } from '../../theme';
import dayjs from 'dayjs';

const Appointments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setOpenAddDialog(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpenDeleteDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setEventTitle("");
  };

  const handleAddEvent = () => {
    if (eventTitle) {
      const newEvent = {
        id: `${selectedDate.format('YYYY-MM-DD')}-${eventTitle}`,
        title: eventTitle,
        date: selectedDate.format('YYYY-MM-DD'),
      };
      setCurrentEvents([...currentEvents, newEvent]);
    }
    handleCloseAddDialog();
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setCurrentEvents(currentEvents.filter(event => event.id !== selectedEvent.id));
    }
    handleCloseDeleteDialog();
  };

  return (
    <Box m="20px">
      <Header title="Appointments" subtitle="Schedule your appointments" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
                button
                onClick={() => handleEventClick(event)}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {dayjs(event.date).format('MMM DD, YYYY')}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 75%" ml="15px">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              onChange={(newDate) => handleDateClick(newDate)}
              sx={{
                width: '100%',
                height: '100%',
                '& .MuiPickersCalendarHeader-root': { marginBottom: 2 },
                '& .MuiPickersCalendar-root': { height: '100%' },
                '& .MuiDayCalendar-monthContainer': { height: '100%' },
                //'& .MuiPickersSlideTransition-root': { minHeight: '100%' },
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      {/* Add Event Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle sx={{backgroundColor: colors.primary[400]}}>Add Event</DialogTitle>
        <DialogContent sx={{backgroundColor: colors.primary[400]}}>
          <TextField
            autoFocus
            margin="dense"
            label="Event Title"
            type="text"
            fullWidth
            variant="outlined"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{backgroundColor: colors.primary[400]}}>
          <Button onClick={handleCloseAddDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddEvent} color="secondary">
            Add Event
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Event Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the event '{selectedEvent && selectedEvent.title}'?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteEvent} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Appointments;