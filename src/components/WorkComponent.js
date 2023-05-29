import { forwardRef, useState, useImperativeHandle, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import "./../styles/App.css";
import "./../styles/WorkingExperience.css";

const WorkComponent = forwardRef((props, ref) => {
  const [position, setPosition] = useState({
    text: '',
    valid: 'invalid'
  });
  const [company, setCompany] = useState({
    text: '',
    valid: 'invalid'
  });
  const [city, setCity] = useState({
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
  const [displayWork, setDisplayWork] = useState({
    position: '',
    company: '',
    city: '',
    fromData: '',
    toData: ''
  });

  useImperativeHandle(ref, () => ({
    doEditForm: () => {
      setPosition({text: displayWork.position, valid: 'valid'});
      setCompany({text: displayWork.company, valid: 'valid'});
      setCity({text: displayWork.city, valid: 'valid'});
      setFromData({text: displayWork.fromData, valid: 'valid'});
      setToData({text: displayWork.toData, valid: 'valid'});
    }
  }), [displayWork]);

  const onChangeCallback = useCallback((event) => {
    const patterns = {
      position: /^[a-z\s']{1,30}$/i,
      company: /^[a-z\s']{1,30}$/i,
      city: /^[a-zA-Z0-9\s,'-]*$/i,
      fromData: /^\d{2}-\d{4}$/i,
      toData: /^(\d{2}-\d{4}|present)$/i
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
      case 'position':
        setPosition({text: event.target.value, valid: isValid});
        break;
      case 'company':
        setCompany({text: event.target.value, valid: isValid});
        break;
      case 'city':
        setCity({text: event.target.value, valid: isValid});
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
    setPosition({text: '', valid: 'invalid'});
    setCompany({text: '', valid: 'invalid'});
    setCity({text: '', valid: 'invalid'});
    setFromData({text: '', valid: 'invalid'});
    setToData({text: '', valid: 'invalid'});
  }, []);

  const onSubmitCallback = useCallback((event) => {
    const isFormValid = () => {
      const isValid = (input) => input.valid === 'valid';
  
      return isValid(position) && isValid(company) &&
        isValid(city) && isValid(fromData) && isValid(toData);
    }
    event.preventDefault();
    if (!isFormValid()) return;
    setDisplayWork({
      position: position.text,
      company: company.text,
      city: city.text,
      fromData: fromData.text,
      toData: toData.text
    });
    props.onUpdateData(props.uuid, {
      position: position.text,
      company: company.text,
      city: city.text,
      fromData: fromData.text,
      toData: toData.text
    });
  }, [position, company, city, fromData, toData, props]);

  return (
    <form className="work-item-form">
      <label htmlFor="work-position">Position title</label>
      <input id="work-position" name="position" type="text" value={position.text} placeholder="Role name" className={position.valid} onChange={onChangeCallback}></input>
      <label htmlFor="work-company">Company name</label>
      <input id="work-company" name="company" type="text" value={company.text} placeholder="Name" className={company.valid} onChange={onChangeCallback}></input>
      <label htmlFor="work-city">City</label>
      <input id="work-city" name="city" type="text" value={city.text} placeholder="Name" className={city.valid} onChange={onChangeCallback}></input>
      <label htmlFor="work-fromData">From:</label>
      <input id="work-fromData" name="fromData" type="text" value={fromData.text} placeholder="MM-YYYY" className={fromData.valid} onChange={onChangeCallback}></input>
      <label htmlFor="work-toData">To:</label>
      <input id="work-toData" name="toData" type="text" value={toData.text} placeholder="MM-YYYY or Present" className={toData.valid} onChange={onChangeCallback}></input>
      <button disabled={!props.editable} onClick={onResetCallback}><FontAwesomeIcon icon={faCircleXmark}/> Cancel</button>
      <button disabled={!props.editable} type="submit" onClick={onSubmitCallback}><FontAwesomeIcon icon={faArrowRight}/> Submit</button>
    </form>
  );
});

export default WorkComponent;
