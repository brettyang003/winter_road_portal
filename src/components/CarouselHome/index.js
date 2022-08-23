import { Carousel, Image, Typography } from "antd";
import React from "react";
import homebg_1 from "../../assets/homebg_1.png";
import homebg_2 from "../../assets/homebg_2.png";
import homebg_3 from "../../assets/homebg_3.png";
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

const WinterRoadTitle_White = () => {
  return (
    <div style={{ marginTop: "-430px" }} className="titleText">
      <Typography style={{ color: "white", fontSize: "8vh" }}>
        WRTDIP
      </Typography>
      <Typography
        style={{ color: "white", fontSize: "6vh" }}
        className="titleText"
      >
        Winter Road and Trail Data Information Portal{" "}
      </Typography>
    </div>
  );
};

// The reason why set this separate is becuase the position of the title might need to be adjusted in the future
// This will make everything more maintainable
const WinterRoadTitle_Black = () => {
  return (
    <div style={{ marginTop: "-430px" }} className="titleText">
      <Typography style={{ color: "black", fontSize: "8vh" }}>
        WRTDIP
      </Typography>
      <Typography
        style={{ color: "black", fontSize: "6vh" }}
        className="titleText"
      >
        Winter Road and Trail Data Information Portal{" "}
      </Typography>
    </div>
  );
};

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
        <WinterRoadTitle_White />
      </div>
    </div>
    <div>
      <div style={{ ...contentStyle, backgroundImage: `url(${homebg_2})` }}>
        <WinterRoadTitle_White />
      </div>
    </div>
    <div>
      <div style={{ ...contentStyle, backgroundImage: `url(${homebg_3})` }}>
        <WinterRoadTitle_Black />
      </div>
    </div>
  </Carousel>
);

export default CarouselHome;
