import { useCallback, useEffect, useRef, useState } from "react";
import EducationComponent from "./EducationComponent";
import uniqid from 'uniqid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquarePen, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import "./../styles/App.css";
import "./../styles/EducationExperience.css";

const EducationExperience = (props) => {
  const childRef = useRef();
  const [educationItems, setEducationItems] = useState([{
    data: undefined,
    uuid: uniqid(),
    editable: true,
    count: 0
  }]);
  const [counter, setCounter] = useState(0);
  const [lastItem, setLastItem] = useState(undefined);

  const doEditEducationItem = useCallback((uuid, data = undefined, editable = undefined) => {
    // Get shallow copy
    const newEducationItems = educationItems.slice();
    const idx = newEducationItems.findIndex((value) => value.uuid === uuid);
    if (idx === -1) return;
    if (data) newEducationItems[idx].data = data;
    if (undefined !== editable) newEducationItems[idx].editable = editable;
    setEducationItems(newEducationItems);
    return newEducationItems;
  }, [educationItems]);
  
  const doUpdateParentState = useCallback((inEducationItems) => {
    const data = [];
    inEducationItems.forEach((e) => {
      if (e.data) data.push(e.data)
    });
    props.onUpdateData(props.keyUpdate, data);
  }, [props]);

  const onEditEducationItem = useCallback((uuid) => {
    doEditEducationItem(uuid, undefined, true);
    if (childRef.current) childRef.current.doEditForm();
  }, [doEditEducationItem]);

  const onDeleteEducationItem = useCallback((uuid) => {
    const newEducationItems = educationItems.filter((value) => value.uuid !== uuid);

    if (newEducationItems.length) {
      setEducationItems(newEducationItems);
    } else {
      /* Insert empty work */
      setEducationItems([{
        data: undefined,
        uuid: uniqid(),
        editable: true,
        count: 0
      }]);
    }
    doUpdateParentState(newEducationItems);
  }, [educationItems, doUpdateParentState]);

  const onAddEducationItem = useCallback(() => {
    setCounter(counter + 1);
    setEducationItems([...educationItems, { data: undefined, uuid: uniqid(), count: counter + 1, editable: true }]);
  }, [educationItems, counter]);

  const onUpdateData = useCallback((uuid, newData) => {
    const newEducationItems = doEditEducationItem(uuid, newData, false);
    doUpdateParentState(newEducationItems);
  }, [doUpdateParentState, doEditEducationItem]);

  useEffect(() => {
    setLastItem(educationItems.at(-1));
    return () => {
    }
  }, [educationItems]);


  return (
    <div className="edit-container">
      <div className="edit-header">
        <p>Education:</p>
      </div>
      <div className="list-items">{educationItems.map((education) => {
        const uuid = education.uuid;
        const divCtrlBtn = (
          <div className="edit-list-items-ctrl">
            <button disabled={!education.data} onClick={() => onDeleteEducationItem(uuid)}><FontAwesomeIcon icon={faDeleteLeft}/></button>
            <button disabled={!education.data} onClick={() => onEditEducationItem(uuid)}><FontAwesomeIcon icon={faSquarePen}/></button>
          </div>
        );
        return (
          <div key={uuid}>
            {divCtrlBtn}
            <EducationComponent uuid={uuid} editable={education.editable} ref={childRef} onUpdateData={onUpdateData}/>
          </div>
        );
      })}</div>
      <button disabled={!(lastItem && lastItem.data)} className="list-items-add" onClick={onAddEducationItem}><FontAwesomeIcon icon={faSquarePlus} size="lg"/> Add education</button>
    </div>
  );
};

export default EducationExperience;
