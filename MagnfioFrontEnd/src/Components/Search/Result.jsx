import React from 'react';
import './result.css';
import './resultDark.css';

export default function Result({searchResult}) {
  // const data = [
  //   {id:"1"},{id:"2"},{id:"3"},{id:"4"},{id:"5"},{id:"6"},{id:"7"},{id:"8"},{id:"9"},{id:"10"},
  //   {id:'11'},{id:'12'},{id:'13'}
  // ]

  return (
    <>
      <div className="result-container">
      
        {searchResult?.map((result,index) => {
          
          // console.log("resulrt",result)
          
          return (
            <div className="result-list" key={index}>
              <img
                src="http://localhost:3000/static/media/sidebar-logo.1629a1a3.png"
                alt="comapny logo"
              />
              <div className="result-metadata">
                <strong className="result-title">
                  Magnifio
                </strong>
                <span className="result-post-timing">{new Date().getHours()}hours ago .</span>
                <span className="post-user-name">Shreeven</span>
                <span className="result-description">
                  {result[0]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}