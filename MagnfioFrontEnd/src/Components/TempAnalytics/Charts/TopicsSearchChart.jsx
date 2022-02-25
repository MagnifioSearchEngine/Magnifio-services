import React, {useState,useEffect} from 'react';
import axios from 'axios';

export default function TopicSearchChart() {
   
  const [TopicSearchChart,setTopicSearchChart] = useState()
 
  useEffect(async() => {

     const response = await axios.get("http://54.174.147.70:8080/api/v1/file/type")
     let dataArray = [['file','percent']];

     if (response.status === 200){

      for (var n = 0; n < response.data.data.length; n++) {

        dataArray.push([response.data.data[n].file, response.data.data[n].percent]);
       
    }
    setTopicSearchChart(dataArray)
 }  
  },[])
  
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(TopicSearchChart);

    var options = {
     legend:{alignment:'center',position:'bottom'},
      pieHole: 0.85,
      backgroundColor: 'none',
      colors:['#9ecbd7','#1ca2f8','#4a7d99','#3c9295'],

      pieSliceTextStyle: {
        color: 'none',
      },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById('donutchart')
    );
    chart.draw(data, options);
  }

  return <div id="donutchart" style={{ width: '100%', height: '100%' }}></div>
}
