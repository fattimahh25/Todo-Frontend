import React, { useState } from "react";
import axios from "axios";
import Portfolio from "./portfolio";
import "./portfolio.css";

const PortfolioForm = () => { 
  const [step, setStep] = useState(1);
  const [savedId, setSavedId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    github: "",
    skills: "",
    projects: [{ title: "", description: "", link: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsChange = (e) => {
    setFormData({ ...formData, skills: e.target.value });
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index][name] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: "", description: "", link: "" }],
    });
  };

  const savePortfolio = async () => {
    try {
      const res = await axios.post("http://todo-backend-production-8ee8.up.railway.app/api/portfolio", {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
      });
      setSavedId(res.data.id);
      alert("Portfolio saved successfully!");
    } catch (error) {
      console.error("Error saving portfolio:", error);
      alert("Error saving portfolio!");
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="form-container">
      {step === 1 && (
        <div>
          <h2>Step 1: Personal Info</h2>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="github" placeholder="GitHub Link" value={formData.github} onChange={handleChange} />
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <h2>Step 2: Skills</h2>
          <input type="text" placeholder="Enter skills (comma separated)" value={formData.skills} onChange={handleSkillsChange} />
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Step 3: Projects</h2>
          {formData.projects.map((project, index) => (
            <div key={index}>
              <input type="text" name="title" placeholder="Project Title" value={project.title} onChange={(e) => handleProjectChange(index, e)} />
              <textarea name="description" placeholder="Project Description" value={project.description} onChange={(e) => handleProjectChange(index, e)} />
              <input type="text" name="link" placeholder="Project Link" value={project.link} onChange={(e) => handleProjectChange(index, e)} />
            </div>
          ))}
          <button onClick={addProject}>+ Add Project</button>
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>Step 4: Preview</h2>
          <Portfolio
            name={formData.name}
            email={formData.email}
            github={formData.github}
            skills={formData.skills.split(",").map((s) => s.trim())}
            projects={formData.projects}
          />
          <button onClick={prevStep}>Back</button>
          <button onClick={savePortfolio}>Save Portfolio</button>
          {savedId && (
            <p>
              ✅ Your portfolio is saved. View it at:{" "}
              <a href={`http://localhost:3000/portfolio/${savedId}`} target="_blank" rel="noreferrer">
                Portfolio Link
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioForm;
