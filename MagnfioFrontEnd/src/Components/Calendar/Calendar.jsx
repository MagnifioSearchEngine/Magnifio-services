import React, {useState, useContext} from "react";
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
} from "@syncfusion/ej2-react-schedule";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  createEvent, 
  updateEvent, 
  deleteEvent,
 } from '../Loginpage/Loginpage';
 import { v4 as uuidv4 } from 'uuid';
import { ToastContainer} from 'react-toastify';
import eventContext from '../../context/events/eventContext';
 import "./Calendar.css";

//  import { extend } from '@syncfusion/ej2-base';
//  import { SampleBase } from './sampleBase';
//  import * as dataSource from './dataSource.json';
//  import eventContext from '../../context/events/eventContext';
//  import axios from 'axios';
//  import { values } from 'lodash';
export default function Welcome() {

  const {events} = useContext(eventContext);

  let data = [
    {
      Id: "3oui8lvblatvv8dn0mqsssri7c",
      Subject: "Meeting",
      StartTime: new Date(2022, 1, 15, 10, 0),
      EndTime: new Date(2022, 1, 15, 12, 30),
      IsAllDay: false,
      Status: "Completed",
      Priority: "High"
    }
  ];
  console.log("data",data)
  let ownerData = [
    { OwnerText: "baluram1226@gmail.com", Id: "baluram1226@gmail.com" , OwnerColor: "#ffaa00" },
    { OwnerText: "bkraftaar1@gmail.com", Id: "bkraftaar1@gmail.com" , OwnerColor: "#f8a398" },
    { OwnerText: "shreeven@magnifio.io", Id: "shreeven@magnifio.io" , OwnerColor: "#7499e1" },
    { OwnerText: "kumavat@magnifio.io", Id: "kumavat@magnifio.io" , OwnerColor: "#7499e1" },
    { OwnerText: "piyush@magnifio.io", Id: "piyush@magnifio.io" , OwnerColor: "#7499e1" },
    { OwnerText: "ankit@magnifio.io", Id: "ankit@magnifio.io" , OwnerColor: "#7499e1" },
    
  ];
  let fields = { text: "OwnerText", value: "Id" };
  
   function onPopupClose(args) {
    if (args.type === "Editor" && args.target.classList.contains("e-work-cells")) {
      let data = args.data;
      data.Id = this.scheduleObj.getEventMaxID();
      console.log('calendarData', data);
    }
  }

   function onActionComplete(args) {
    console.log(args);
    if (args.requestType === "eventCreated") {
      console.log(args.addedRecords[0]);
      console.log(args.addedRecords[0].Id);

      var attendees = args.addedRecords[0]?.OwnerId?.map((attendee) =>{
        return({ 
          email:attendee
        })
      })

      createEvent({
        id: args.addedRecords[0].Id.split('-').join(''),
        summary: args.addedRecords[0].Subject,
        location: args.addedRecords[0].Location,
        start: {
          dateTime: args.addedRecords[0].StartTime.toISOString(),
        },
        end: {
          dateTime: args.addedRecords[0].EndTime.toISOString(),
        },
        attendees:attendees,
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
        conferenceData: {
          createRequest: {
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
            requestId: uuidv4(),
          },
        },
      });
    }
    else if(args.requestType === "eventRemoved") {
      deleteEvent(args.data[0].Id.split('-').join(''));
    }
    else if(args.requestType === "eventChanged") {
      updateEvent(args.data[0].Id.split('-').join(''), {
          summary: args.changedRecords[0].Subject,
          location: args.changedRecords[0].Location,
          start: {
            dateTime: args.changedRecords[0].StartTime.toISOString(),
          },
          end: {
            dateTime: args.changedRecords[0].EndTime.toISOString(),
          },
          attendees: args.changedRecords[0].OwnerId,
        });
    }
  }

  function editorTemplate(props) {
    return props !== undefined && Object.keys(props).length > 0 ? (
      <table
        className="custom-event-editor"
        style={{ width: "100%", padding: "5" }}
      >
        <tbody>
          <tr>
            <td className="e-textlabel">Summary</td>
            <td colSpan={4} style={{ width: "100%", padding: "3px" }}>
              <input
                id="Summary"
                className="e-field e-input"
                type="text"
                name="Subject"
                style={{ width: "100%", padding: "3px" }}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Attendees</td>
            <td colSpan={4} style={{ width: "100%", padding: "10px" }}>
              <MultiSelectComponent
                className="e-field"
                placeholder="Choose owner"
                data-name="OwnerId"
                dataSource={ownerData}
                fields={fields}
                value={ownerData.Id}
                placeholder={"Select Attendees"}
                allowCustomValue={true}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">StartTime</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="StartTime"
                data-name="StartTime"
                value={new Date(props.startTime || props.StartTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">EndTime</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="EndTime"
                data-name="EndTime"
                value={new Date(props.endTime || props.EndTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Description</td>
            <td colSpan={4} style={{ width: "100%", padding: "10px" }}>
              <textarea
                id="Description"
                className="e-field e-input"
                name="Description"
                rows={3}
                cols={50}
                style={{
                  width: "100%",
                  height: "60px !important",
                  resize: "vertical"
                }}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div></div>
    );
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        theme="dark"
      />
      <div className="calendar">
        <ScheduleComponent
          height="550px"
          selectedDate={Date.now()}
          eventSettings={{ dataSource: events}}
          currentView="Month"
          actionComplete={onActionComplete}
          onPopupClose={onPopupClose}
          editorTemplate={editorTemplate}
        >
          <Inject
            services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]}
          />
        </ScheduleComponent>
      </div>
    </div>
  );
}
