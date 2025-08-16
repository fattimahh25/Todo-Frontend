import React from "react";
import "./review.css";

const Portfolio = ({ name, email, github, skills, projects }) => {
  return (
    <div className="portfolio-container">
      <h1>{name}'s Portfolio</h1>
      <p>Email: {email}</p>
      <p>
        GitHub: <a href={github}>{github}</a>
      </p>

      <h2>Skills</h2>
      <ul>
        {skills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>

      <h2>Projects</h2>
      {projects.map((p, i) => (
        <div key={i} className="project">
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <a href={p.link} target="_blank" rel="noreferrer">View Project</a>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
