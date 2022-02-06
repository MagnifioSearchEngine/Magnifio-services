import React, { useState } from 'react';
import { 
  ScheduleComponent, 
  Day, 
  Week, 
  WorkWeek, 
  Month, 
  Agenda, 
  Inject, 
  DragAndDrop, 
  Resize
} from '@syncfusion/ej2-react-schedule';
import {
 createEvent, 
 updateEvent, 
 deleteEvent,
} from '../Loginpage/Loginpage';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from './sampleBase';
import * as dataSource from './dataSource.json';
import axios from 'axios';
import "./Calendar.css";

export default class Calendar extends SampleBase {

  constructor() {
    super(...arguments);
    this.data = extend([], dataSource.scheduleData, null, true);
    this.state = {
      events: [],
      res: [],
    };
  }

  onPopupClose(args) {
    if (args.type === "Editor" && args.target.classList.contains("e-work-cells")) {
      let data = args.data;
      data.Id = this.scheduleObj.getEventMaxID();
      console.log('calendarData', data);
    }
  }

  onActionComplete(args) {
    console.log(args);
    if (args.requestType === "eventCreated") {
      console.log(args.addedRecords[0]);
      console.log(args.addedRecords[0].Id.split('-').join(''));
      createEvent({
        id: args.addedRecords[0].Id.split('-').join(''),
        summary: args.addedRecords[0].Subject,
        location: args.addedRecords[0].Location,
        start: {
          dateTime: args.addedRecords[0].StartTime.toISOString(),
        },
        end: {
          dateTime: args.addedRecords[0].EndTime.toISOString(),
        }
      });
    }
    else if(args.requestType === "eventRemoved") {
      deleteEvent(args.deletedRecords[0].Id.split('-').join(''));
    }
    else if(args.requestType === "eventChanged") {
      updateEvent(args.changedRecords[0].Id.split('-').join(''), {
          summary: args.changedRecords[0].Subject,
          location: args.changedRecords[0].Location,
          start: {
            dateTime: args.changedRecords[0].StartTime.toISOString(),
          },
          end: {
            dateTime: args.changedRecords[0].EndTime.toISOString(),
          }
        });
    }
  }
  
  // onActionDelete(args) {
  //   if (args.requestType === "eventRemoved") {
  //     console.log(args.deletedRecords[0]);
  //     deleteEvent(args.deletedRecords[0].Id);
  //   }
  // }

  fetchCalendarEvents = async () => {
    const { data } = await axios.get(`http://3.87.73.247:8080/events`)
    // console.log('data', data)
    this.setState({
      events: data,
      res: data.map(event => {
        const year1 = parseInt(event.startTime.substring(0, 4));
        const month1 = parseInt(event.startTime.substring(5, 7));
        const date1 = parseInt(event.startTime.substring(8, 10));
        const h1 = parseInt(event.startTime.substring(11, 13));
        const m1 = parseInt(event.startTime.substring(14, 16));

        const year2 = parseInt(event.endTime.substring(0, 4));
        const month2 = parseInt(event.endTime.substring(5, 7));
        const date2 = parseInt(event.endTime.substring(8, 10));
        const h2 = parseInt(event.endTime.substring(11, 13));
        const m2 = parseInt(event.endTime.substring(14, 16));
        return ({
          Id: event.eventId,
          Subject: event.subject,
          StartTime: new Date(year1, month1 - 1, date1, h1, m1),
          EndTime: new Date(year2, month2 - 1, date2, h2, m2),
        })
      })
    })


  }

  componentDidMount() {
    this.fetchCalendarEvents();
    // createEvent();
    // deleteEvent();
  }

  render() {
    return (
      <div className='calendar'>
        <ScheduleComponent 
          height='550px' 
          selectedDate={Date.now()}
          ref={(val) => (this.scheduleObj = val)}
          eventSettings={{ dataSource: this.state.res }} 
          currentView='Month'
          popupClose={this.onPopupClose.bind(this)}
          actionComplete={this.onActionComplete.bind(this)}
        >
          <Inject 
            services={[
              Day, 
              Week, 
              WorkWeek, 
              Month, 
              Agenda, 
              DragAndDrop, 
              Resize
            ]} 
          />
        </ScheduleComponent>
      </div>
    );
  }
}