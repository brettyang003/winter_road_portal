import React from "react";
import {Typography}  from "antd";
import {Container,Row,Col} from 'react-bootstrap';
import FeatureItem from "./FeatureItem";
import "./styles.css";

const Feature = ({ props }) => {
  return (
    <Container>
      <Row
        className="justify-content-md-center"
      >
        <Typography className="featurePageTitleText ">Features</Typography>
        {props.map((content) => (
          <Col xs lg="3">
            <FeatureItem key={content.id} props={content} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Feature;
