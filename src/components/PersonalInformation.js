import { useCallback, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleXmark, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import "./../styles/App.css";
import "./../styles/PersonalInformation.css";

const PersonalInformation = (props) => {
  const [firstName, setFirstName] = useState({
    text: '',
    valid: 'invalid'
  });
  const [lastName, setLastName] = useState({
    text: '',
    valid: 'invalid'
  });
  const [email, setEmail] = useState({
    text: '',
    valid: 'invalid'
  });
  const [phone, setPhone] = useState({
    text: '',
    valid: 'invalid'
  });
  const [location, setLocation] = useState({
    text: '',
    valid: 'invalid'
  });
  const [loaded, setLoaded] = useState(false);
  const [editable, setEditable] = useState(true);
  const [displayPI, setDisplayPI] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: ''
  });

  const onChangeCallback = useCallback((event) => {
    const patterns = {
      firstName: /^[a-z\s']{1,30}$/i,
      lastName: /^[a-z\s']{1,30}$/i,
      email: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
      phone: /^\+\d{12}$/,
      location: /^[a-zA-Z0-9\s,'-]*$/i
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

    const isValid = validate(event.target.name, event.target) ? 'valid'
      : 'invalid';

    switch (event.target.name) {
      case 'firstName':
        setFirstName({text: event.target.value, valid: isValid});
        break;
      case 'lastName':
        setLastName({text: event.target.value, valid: isValid});
        break;
      case 'email':
        setEmail({text: event.target.value, valid: isValid});
        break;
      case 'phone':
        setPhone({text: event.target.value, valid: isValid});
        break;
      case 'location':
        setLocation({text: event.target.value, valid: isValid});
        break;
      default: 
        break;
    }
  }, []);

  const onEditCallback = useCallback((event) => {
    event.preventDefault();

    setFirstName({text: displayPI.firstName, valid: 'valid'});
    setLastName({text: displayPI.lastName, valid: 'valid'});
    setEmail({text: displayPI.email, valid: 'valid'});
    setPhone({text: displayPI.phone, valid: 'valid'});
    setLocation({text: displayPI.location, valid: 'valid'});
    setEditable(true);
  }, [displayPI]);

  const onResetCallback = useCallback((event) => {
    event.preventDefault();
    setFirstName({text: '', valid: 'invalid'});
    setLastName({text: '', valid: 'invalid'});
    setEmail({text: '', valid: 'invalid'});
    setPhone({text: '', valid: 'invalid'});
    setLocation({text: '', valid: 'invalid'});
  }, []);

  const onSubmitCallback = useCallback((event) => {
    const isFormValid = () => {
      const isValid = (input) => input.valid === 'valid';

      return isValid(firstName) && isValid(lastName) &&
        isValid(phone) && isValid(email) && isValid(location);
    };

    event.preventDefault();
    if (!isFormValid()) return;
    setLoaded(true);
    setEditable(false);

    setDisplayPI({
      firstName: firstName.text,
      lastName: lastName.text,
      email: email.text,
      phone: phone.text,
      location: location.text
    });
    props.onUpdateData(props.keyUpdate, {
      firstName: firstName.text,
      lastName: lastName.text,
      email: email.text,
      phone: phone.text,
      location: location.text
    });
  }, [firstName, lastName, email, phone, location, props]);

  return (
    <div className="edit-container">
      <div className="edit-header">
        <p>Personal Information:</p>
        <button disabled={!loaded} onClick={onEditCallback}><FontAwesomeIcon icon={faSquarePen}/> Edit</button>
      </div>
      <form className="edit-form">
        <label htmlFor="pi-first-name">First name</label>
        <input id="pi-first-name" name="firstName" type="text" value={firstName.text} placeholder="Name" className={firstName.valid} onChange={onChangeCallback}></input>
        <label htmlFor="pi-last-name">Last name</label>
        <input id="pi-last-name" name="lastName" type="text" value={lastName.text} placeholder="Surname" className={lastName.valid} onChange={onChangeCallback}></input>
        <label htmlFor="pi-email">E-mail</label>
        <input id="pi-email" name="email" type="text" value={email.text} placeholder="mailname@mail.to" className={email.valid} onChange={onChangeCallback}></input>
        <label htmlFor="pi-phone">Phone number</label>
        <input id="pi-phone" name="phone" type="text" value={phone.text} placeholder="+XXYYYZZZAABB" className={phone.valid} onChange={onChangeCallback}></input>
        <label htmlFor="pi-location">Location</label>
        <input id="pi-location" name="location" type="text" value={location.text} placeholder="Name" className={location.valid} onChange={onChangeCallback}></input>
        <button disabled={!editable} onClick={onResetCallback}><FontAwesomeIcon icon={faCircleXmark}/> Cancel</button>
        <button disabled={!editable} type="submit" onClick={onSubmitCallback}><FontAwesomeIcon icon={faArrowRight}/> Submit</button>
      </form>
    </div>
  );
};

export default PersonalInformation;
