import ProjectFirst from "../../assets/smartphone_icon_colour.png";
import ProjectSecond from "../../assets/online_survey_icon.png";
import ProjectThird from "../../assets/ice_road_icon.png";

import CoverBanner from "../../components/Global/CoverBanner";
import ProjectBanner from "../../components/Projects/ProjectBanner";
function Projects() {
  const BannerContents = [
    {
      id: 1,
      image: ProjectFirst,
      title: "Winter Road and Trail Watch",
      content:
        "We invite all the citizen scientists in the North to contribute to our real-time science research toward climate change adaptation. More details coming soon!",
      bgColor: "white",
    },

    {
      id: 2,
      image: ProjectSecond,
      title: "Winter Road and Trail Community Online Survey",
      content:
        "We will invite the Winter Road and Trail Watch observers to complete an online survey about climate change impacts on the winter road and trail networks in the Northwest Territories, Yukon, and Nunavut. More details coming soon!",
      bgColor: "#F7FAEF",
    },
    {
      id: 3,
      image: ProjectThird,
      title: "Winter Road Profile",
      content:
        "We will work with a community researcher and/or liaison to create a winter road profile for each winter roads.",
      bgColor: "white",
    },
  ];
  return (
    <div>
      <CoverBanner title="Projects" />

      {BannerContents.map((content) => (
        // <TemplateBanner key={content.id} props={content} />
        <ProjectBanner  key={content.id} props={content} />
      ))}

    </div>
  );
}

export default Projects;
