import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import "./styles.css";

function App() {
  return (
    <div className="card">
      <Avatar />
      <div>
        <Summery />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img className="avatar" src="Pic.png" alt="Pic" />;
}

function Summery() {
  const expo =
    "A third year computer science student at The Open University, looking for my first position as a full stack developer.";
  return (
    <div className="summery">
      <h1>Eli Gandin</h1>
      <p>{expo}</p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill skill="Java" skillIcon="FaJava" color="#F14C4D" />
      <Skill skill="Python" skillIcon="FaPython" color="#4B8BBE" />
      <Skill skill="C" skillIcon="SiC" color="#D8D9DA" />
      <Skill skill="NodeJS" skillIcon="FaNodeJs" color="#68A063" />
      <Skill skill="React" skillIcon="FaReact" color="#61DBFB" />
      <Skill skill="HTML/CSS" skillIcon="FaHtml5" color="#fcba03" />
      <Skill skill="MongoDB" skillIcon="SiMongodb" color="#4DB33D" />
      <Skill skill="PostgresSQL" skillIcon="SiPostgresql" color="#008bb9" />
    </div>
  );
}

function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.color }}>
      <span>{props.skill}</span>
      <Icon skillIcon={props.skillIcon} />
    </div>
  );
}

function Icon(props) {
  let IconComponent = FaIcons[props.skillIcon];

  if (IconComponent) {
    return <IconComponent />;
  }

  IconComponent = SiIcons[props.skillIcon];

  if (IconComponent) {
    return <IconComponent />;
  }

  if (!IconComponent) {
    // Return a default one
    return <FaIcons.FaBeer />;
  }
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
