import React from 'react';
import './Analytics.css';
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
} from '@coreui/react';
import User from './User'
import 'bootstrap/dist/css/bootstrap.min.css';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function Dashboard() {
  return (
    <div className="bk">
      <div>
        <CCard>
          <CCardHeader component="h5">Trending Topics</CCardHeader>
          <CCardBody>
            <CCardText>
              <TrendingUpIcon /> github was down
            </CCardText>
            <CCardText>
              <TrendingUpIcon /> error in mongodb
            </CCardText>
            <CCardText>
              <TrendingUpIcon /> microsoft new update
            </CCardText>
            <CCardText>
            <TrendingUpIcon /> Magnifio new ui upadte

              </CCardText>
            <CButton href="#">see more</CButton>
          </CCardBody>
        </CCard>
      </div>
      <div>
        <CCard>
          <CCardHeader component="h5" >User's analitics</CCardHeader>
          <CCardBody>
          <User
            avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            name="baluram"
            activity="10 times"
          />
          <User
            avatar="https://joeschmoe.io/api/v1/jane"
            name="jane doe"
            activity="5 times"
          />
          <User
            avatar="https://joeschmoe.io/api/v1/john"
            name="john smith"
            activity="20 times"
          />
          <User
            avatar="https://joeschmoe.io/api/v1/alex"
            name="alex kumar"
            activity="8 times"
          />
          <User
            avatar="https://joeschmoe.io/api/v1/priya"
            name="priya sharma"
            activity="15 times"
          />

            <CButton href="#">see more</CButton>
          </CCardBody>
        </CCard>
      </div>
      <div>
        <CCard>
          <CCardHeader component="h5">Header</CCardHeader>
          <CCardBody>
            <CCardTitle>Special title treatment</CCardTitle>
            <CCardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CCardText>
            <CButton href="#">see more</CButton>
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
}
