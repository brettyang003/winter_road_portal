

import bgImage from "../../assets/homebg_3.png";
import TeamMember from "./TeamMember";
import "./styles.css";
import { Typography } from "antd";
function Team({teamName, teamMemberInfo}) {
   
  return (
    <div className="teamTitle"> <Typography.Title style={{color: "#0e2959", paddingTop: "20px"}}>{teamName}</Typography.Title>
    <div className="teamContainer">
       
        {teamMemberInfo.map((content) => (
        <TeamMember key={content.id} props={content} />
      ))}
    </div>
    </div>
  );
}

export default Team;
