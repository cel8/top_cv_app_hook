import React, { useState } from 'react';
import PersonalInformation from './components/PersonalInformation';
import EducationExperience from './components/EducationExperience';
import WorkingExperience from './components/WorkingExperience';
import PersonalInformationDisplay from './components/PersonalInformationDisplay';
import EducationExperienceDisplay from './components/EducationExperienceDisplay';
import WorkingExperienceDisplay from './components/WorkingExperienceDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import "./styles/App.css";

function App() {
  const keys = {
    keyPI: 'personal-information',
    keyEE: 'education-experience',
    keyWE: 'working-experience'
  }
  const curYear = new Date().getFullYear();

  const [pi, setPI] = useState(undefined);
  const [ee, setEE] = useState([]);
  const [we, setWE] = useState([]);


  const onUpdateData = (node, data) => {
    const { keyPI, keyEE, keyWE } = keys;
    if (keyPI === node)
      setPI(data);
    else if (keyEE === node)
      setEE(data);
    else if (keyWE === node)
    setWE(data);
  };

  return (
    <div className="App">
      <div className="App-cv">
        <div>
          <PersonalInformation keyUpdate={keys.keyPI} onUpdateData={onUpdateData}/>
          <WorkingExperience keyUpdate={keys.keyWE} onUpdateData={onUpdateData}/>
          <EducationExperience keyUpdate={keys.keyEE} onUpdateData={onUpdateData}/>
        </div>
        <div>
          <PersonalInformationDisplay data={pi}/>
          <WorkingExperienceDisplay data={we}/>
          <EducationExperienceDisplay data={ee}/>
        </div>
      </div>
      <footer className="App-footer">
        <div>Copyright © {curYear} - Alessandro Celotti <a className="App-link" href="https://github.com/cel8"><FontAwesomeIcon icon={faGithub}/></a></div>
      </footer>
    </div>
  );
};

export default App;
