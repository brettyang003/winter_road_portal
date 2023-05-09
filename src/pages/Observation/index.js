import ObservationFirst from "../../assets/group_icon.png";

import DataTable from "../../components/DataTable";
import CoverBanner from "../../components/Global/CoverBanner";
import ProjectBanner from "../../components/Projects/ProjectBanner";
import SubSectionBanner from "../../components/SubSectionBanner";
import "./styles.css";
function Observation() {
  const BannerContents = [
    {
      id: 1,
      image: ObservationFirst,
      title: "Winter Road and Trail Watch",
      content: "Feel free to export the data to Excel format ",
      bgColor: "white",
    },
  ];
  return (
    <div>
      <CoverBanner title="Observation" />
      <SubSectionBanner props={BannerContents[0]} />
      <div className="observationIframeContainer">
        <iframe
          className="observationIframe"
          src="https://arcg.is/0rOGWD"
        ></iframe>
      </div>
    </div>
  );
}

export default Observation;
