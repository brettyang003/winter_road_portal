import React from "react";
import { Grid, Layout, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import CanadaMap from "../../../assets/canada_map.png";
import titleImage from "../../../assets/homebg_3.png";

import FeatureItem from "./FeatureItem";
import "./styles.css";

const Feature = ({ props }) => {
  return (
    <div className="featurePage">
      <Typography className="featurePageTitleText">Features</Typography>
      <div className="featureOverallContainer">
      {props.map((content) => (
        <FeatureItem key={content.id} props={content} />
      ))}

      </div>
    </div>
  );
};

export default Feature;
