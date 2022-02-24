import React, {useState,useEffect} from 'react';
import axios from 'axios';

export default function FileUploadChart(){

  const [fileUploadchart,setfileuploadchart] = useState()
 
  useEffect(async() => {

     const response = await axios.get("http://54.174.147.70:8080/api/v1/file/type")

     let dataArray = [['file','percent']];

     if (response.status === 200){

      for (var n = 0; n < response.data.data.length; n++) {

        dataArray.push([response.data.data[n].file, parseInt(response.data.data[n].percent)]);
       
    }
    setfileuploadchart(dataArray)
 }  
  },[])
  
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {

  var data = google.visualization.arrayToDataTable(fileUploadchart);

  var options = {
    legend: 'none',
    pieSliceText: 'label',
    colors:['#9ecbd7','#007090','#3c9295'],
    backgroundColor:'none',
    pieSliceTextStyle: {
      color: 'none',
    },
  
  };

    var chart = new google.visualization.PieChart(document.getElementById('file-upload-charts'));
    chart.draw(data, options);
  }

  return <div id="file-upload-charts" style={{ height: "90%", width: "90%" }}></div>
}