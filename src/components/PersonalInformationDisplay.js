import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSquarePhoneFlip, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import "./../styles/App.css";
import "./../styles/PersonalInformation.css";

const PersonalInformationDisplay = (props) => {
  const { data } = props;
  const firstName = data ? data.firstName : 'First Name';
  const lastName  = data ? data.lastName  : 'Last Name';
  const email     = data ? data.email     : 'Email';
  const phone     = data ? data.phone     : 'Phone';
  const location  = data ? data.location  : 'Address';
  return (
    <div className="display-container pi-display">
      <div className="fullname">
        <div>{firstName}</div>
        <div>{lastName}</div>
      </div>
      <div className="extra-information">
        <div><FontAwesomeIcon icon={faEnvelope} size="lg"/> {email}</div>
        <div><FontAwesomeIcon icon={faSquarePhoneFlip} size="lg"/> {phone}</div>
        <div><FontAwesomeIcon icon={faLocationDot} size="lg"/> {location}</div>
      </div>
    </div>
  );
};

export default PersonalInformationDisplay;
