import React from "react";
import {Typography} from "antd";
import { Container, Row, Col } from "react-bootstrap";

import PartnerItem from "./PartnerItem";
import "./styles.css";

const Partner = ({ props }) => {
  return (
    <Container class="row justify-content-center">
      <Typography className="partnerPageTitleText">Partners</Typography>
      <Row className="justify-content-md-center">
        {props.map((content) => (
          <Col xs lg="3" align="center" className="p-3">
            <img src={content.image} className="img-fluid" width="150" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Partner;
