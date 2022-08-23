import { Carousel, Image, Typography } from "antd";
import React from "react";
import homebg_1 from "../../assets/homebg_1.png";
import homebg_2 from "../../assets/homebg_2.png";
import "./styles.css";

const contentStyle = {
  display: "flex",
  height: "100vh",
  width: "100vw",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  backgroundSize: "cover",
};

const WinterRoadTitle = () => (
  <div style={{ marginTop: "-430px" }} className="titleText">
    <Typography style={{ color: "white", fontSize: "8vh" }}>WRTDIP</Typography>
    <Typography
      style={{ color: "white", fontSize: "6vh" }}
      className="titleText"
    >
      Winter Road and Trail Data Information Portal{" "}
    </Typography>
  </div>
);

const BackGroundImageOne = () => (
  <Image
    style={{ zIndex: -100 }}
    src={homebg_1}
    width="100vw"
    height="100vh"
    preview={false}
  ></Image>
);

const CarouselHome = () => (
  <Carousel className="imgContainer">
    <div>
      <div
        style={{
          ...contentStyle,
          backgroundImage: `url(${homebg_1})`,
        }}
      >
        <WinterRoadTitle />
      </div>
    </div>
    <div>
      <div style={{ ...contentStyle, backgroundImage: `url(${homebg_2})` }}>
        <WinterRoadTitle />
      </div>
    </div>
    <div>
      <div style={{ ...contentStyle, backgroundImage: `url(${homebg_2})` }}>
        <WinterRoadTitle />
      </div>
    </div>
  </Carousel>
);

export default CarouselHome;
