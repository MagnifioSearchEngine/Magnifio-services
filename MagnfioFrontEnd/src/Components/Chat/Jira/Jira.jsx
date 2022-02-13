import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './jiraDark.css';
// import './jira.css';

export default function Jira() {

    const [jiraData, setJiraData] = useState([]);

    const fetchJiraData = async () => {
        const response = await axios.get('http://54.174.147.70:8080/api/v1/jiraIssues');
        console.log(response.data.data);
        setJiraData(response.data.data);
    }

    useEffect(() => {
        fetchJiraData();
    }, [])

    return (
        <div className="jiraContainer">
            <h1>JIRA</h1>
            {jiraData?.map((data) => (
                <div className="jiraWrapper" key={data._id}>
                  <div className="jiraMessageContainer">
                    <h5 className="name">{data.user_name}</h5>
                    <div className='description'>{data.description}</div>
                    <span className="timeStamp">{data.createdAt?.toLocaleString()}</span>
                  </div>
                </div>
            ))}
        </div>
    );
}