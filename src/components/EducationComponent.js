import { forwardRef, useState, useImperativeHandle, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import "./../styles/App.css";
import "./../styles/EducationExperience.css";

const EducationComponent = forwardRef((props, ref) => {
  const [schoolName, setSchoolName] = useState({
    text: '',
    valid: 'invalid'
  });
  const [city, setCity] = useState({
    text: '',
    valid: 'invalid'
  });
  const [degree, setDegree] = useState({
    text: '',
    valid: 'invalid'
  });
  const [thesis, setThesis] = useState({
    text: '',
    valid: 'invalid'
  });
  const [fromData, setFromData] = useState({
    text: '',
    valid: 'invalid'
  });
  const [toData, setToData] = useState({
    text: '',
    valid: 'invalid'
  });
  const [displayEducation, setDisplayEducation] = useState({
    schoolName: '',
    city: '',
    degree: '',
    thesis: '',
    fromData: '',
    toData: ''
  });

  useImperativeHandle(ref, () => ({
    doEditForm: () => {
      setSchoolName({text: displayEducation.schoolName, valid: 'valid'});
      setCity({text: displayEducation.city, valid: 'valid'});
      setDegree({text: displayEducation.degree, valid: 'valid'});
      setThesis({text: displayEducation.thesis, valid: 'valid'});
      setFromData({text: displayEducation.fromData, valid: 'valid'});
      setToData({text: displayEducation.toData, valid: 'valid'});
    }
  }), [displayEducation]);


  const onChangeCallback = useCallback((event) => {
    const patterns = {
      schoolName: /^[a-z\s']{1,50}$/i,
      degree: /^[a-z\s']{1,50}$/i,
      thesis: /^[a-z\s']{1,50}$/i,
      city: /^[a-zA-Z0-9\s,'-]*$/i,
      fromData: /^\d{4}$/i,
      toData: /^(\d{4}|present)$/i
    };

    const validate = (name, field) => {
      if (!patterns[name]) return false;
      if (!patterns[name].test(field.value)) {
        field.setCustomValidity('invalid');
        return false
      }
      field.setCustomValidity('');
      return true;
    };
  
    const isValid = validate(event.target.name, event.target) ? 'valid' : 'invalid';

    switch (event.target.name) {
      case 'schoolName':
        setSchoolName({text: event.target.value, valid: isValid});
        break;
      case 'city':
        setCity({text: event.target.value, valid: isValid});
        break;
      case 'degree':
        setDegree({text: event.target.value, valid: isValid});
        break;
      case 'thesis':
        setThesis({text: event.target.value, valid: isValid});
        break;
      case 'fromData':
        setFromData({text: event.target.value, valid: isValid});
        break;
      case 'toData':
        setToData({text: event.target.value, valid: isValid});
        break;
      default: 
        break;
    }
  }, []);

  const onResetCallback = useCallback((event) => {
    event.preventDefault();
    setSchoolName({text: '', valid: 'invalid'});
    setCity({text: '', valid: 'invalid'});
    setDegree({text: '', valid: 'invalid'});
    setThesis({text: '', valid: 'invalid'});
    setFromData({text: '', valid: 'invalid'});
    setToData({text: '', valid: 'invalid'});
  }, []);

  const onSubmitCallback = useCallback((event) => {
    const isFormValid = () => {
      const isValid = (input) => input.valid === 'valid';
  
      return isValid(schoolName) && isValid(city) && isValid(degree) &&
        isValid(thesis) && isValid(fromData) && isValid(toData);
    }
    event.preventDefault();
    if (!isFormValid()) return;
    setDisplayEducation({
      schoolName: schoolName.text,
      city: city.text,
      degree: degree.text,
      thesis: thesis.text,
      fromData: fromData.text,
      toData: toData.text
    });
    props.onUpdateData(props.uuid, {
      schoolName: schoolName.text,
      city: city.text,
      degree: degree.text,
      thesis: thesis.text,
      fromData: fromData.text,
      toData: toData.text
    });
  }, [schoolName, city, degree, thesis, fromData, toData, props]);

  return (
    <form className="education-item-form">
      <label htmlFor="education-schoolname">University or School name</label>
      <input id="education-schoolname" name="schoolName" type="text" value={schoolName.text} placeholder="Name" className={schoolName.valid} onChange={onChangeCallback}></input>
      <label htmlFor="education-city">City</label>
      <input id="education-city" name="city" type="text" value={city.text} placeholder="Name" className={city.valid} onChange={onChangeCallback}></input>
      <label htmlFor="education-degree">Degree title</label>
      <input id="education-degree" name="degree" type="text" value={degree.text} placeholder="Qualification" className={degree.valid} onChange={onChangeCallback}></input>
      <label htmlFor="education-thesis">Thesis title</label>
      <input id="education-thesis" name="thesis" type="text" value={thesis.text} placeholder="Title" className={thesis.valid} onChange={onChangeCallback}></input>
      <label htmlFor="education-fromData">From:</label>
      <input id="education-fromData" name="fromData" type="text" value={fromData.text} placeholder="YYYY" className={fromData.valid} onChange={onChangeCallback}></input>
      <label htmlFor="education-toData">To:</label>
      <input id="education-toData" name="toData" type="text" value={toData.text} placeholder="YYYY or Present" className={toData.valid} onChange={onChangeCallback}></input>
      <button disabled={!props.editable} onClick={onResetCallback}><FontAwesomeIcon icon={faCircleXmark}/> Cancel</button>
      <button disabled={!props.editable} type="submit" onClick={onSubmitCallback}><FontAwesomeIcon icon={faArrowRight}/> Submit</button>
    </form>
  );
});

export default EducationComponent;
