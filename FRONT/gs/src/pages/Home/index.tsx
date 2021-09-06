import React, { useEffect, useState, } from 'react';
import {  Col, Row } from 'react-bootstrap';
import Header from '../../components/Header';
import Navegacao from '../../components/Navegacao';
import foto from '../../assets/foto.jpg'

const Home = () => {
  return (
    <Row>
      <Navegacao />
      <Col >
        <Header />
        <img src={foto} alt="Minha Figura" style={{width:"95%", height:"79%", padding:10}}/>
      </Col>
    </Row>
  )
}

export default Home;