import React, {useState,useEffect} from 'react';
import axios from 'axios';

export default function PieChart(){

  const [piechart,setPieChart] = useState()
 
  useEffect(async() => {
     const response = await axios.get("http://54.174.147.70:8080/api/v1/file/views")

     let dataArray = [['type','views']];

     if (response.status === 200){

      for (var n = 0; n < response.data.data.length; n++) {

        dataArray.push([response.data.data[n].type, response.data.data[n].views]);
       
    }
    setPieChart(dataArray)
 }  
  },[])

  console.log("data",piechart)

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

    var data = google.visualization.arrayToDataTable(piechart);

    var options = {
      legend:'none',
      colors:['#00caca','#1ca2f8','#4a7d99'],
      backgroundColor:'none',
      pieSliceTextStyle: {
        color: 'none',
      },
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }

  return <div id="piechart" style={{width:'100%',height:'100%'}}></div>
}