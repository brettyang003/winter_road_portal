import React from "react";
import { Grid, Layout, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import CanadaMap from "../../../assets/canada_map.png";
import titleImage from "../../../assets/homebg_3.png";

import PartnerItem from "./PartnerItem";
import "./styles.css";

const Partner = ({ props }) => {
  return (
    <div className="partnerPage">
      <Typography className="partnerPageTitleText">Partners</Typography>
      <div className="partnerOverallContainer">
        {props.map((content) => (
          <PartnerItem key={content.id} props={content} />
        ))}
      </div>
    </div>
  );
};

export default Partner;
