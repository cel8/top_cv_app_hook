
import { useCallback, useEffect, useRef, useState } from "react";
import WorkComponent from "./WorkComponent";
import uniqid from 'uniqid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquarePen, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import "./../styles/App.css";
import "./../styles/WorkingExperience.css";

const WorkingExperience = (props) => {
  const childRef = useRef();
  const [works, setWorks] = useState([{
    data: undefined,
    uuid: uniqid(),
    editable: true,
    count: 0
  }]);
  const [counter, setCounter] = useState(0);
  const [lastItem, setLastItem] = useState(undefined);
  
  const doEditWorkItem = useCallback((uuid, data = undefined, editable = undefined) => {
    // Get shallow copy
    const newWorks = works.slice();
    const idx = newWorks.findIndex((value) => value.uuid === uuid);
    if (idx === -1) return;
    if (data) newWorks[idx].data = data;
    if (undefined !== editable) newWorks[idx].editable = editable;
    setWorks(newWorks);
    return newWorks;
  }, [works]);
  
  const doUpdateParentState = useCallback((inWorks) => {
    const data = [];
    inWorks.forEach((w) => {
      if (w.data) data.push(w.data)
    });
    props.onUpdateData(props.keyUpdate, data);
  }, [props]);

  const onEditWorkItem = useCallback((uuid) => {
    doEditWorkItem(uuid, undefined, true);
    if (childRef.current) childRef.current.doEditForm();
  }, [doEditWorkItem]);

  const onDeleteWorkItem = useCallback((uuid) => {
    const newWorks = works.filter((value) => value.uuid !== uuid);

    if (newWorks.length) {
      setWorks(newWorks);
    } else {
      /* Insert empty work */
      setWorks([{
        data: undefined,
        uuid: uniqid(),
        editable: true,
        count: 0
      }]);
    }
    doUpdateParentState(newWorks);
  }, [works, doUpdateParentState]);

  const onAddWorkItem = useCallback(() => {
    setCounter(counter + 1);
    setWorks([...works, { data: undefined, uuid: uniqid(), count: counter + 1, editable: true }]);
  }, [works, counter]);

  const onUpdateData = useCallback((uuid, newData) => {
    const newWorks = doEditWorkItem(uuid, newData, false);
    doUpdateParentState(newWorks);
  }, [doUpdateParentState, doEditWorkItem]);

  useEffect(() => {
    setLastItem(works.at(-1));
    return () => {
    }
  }, [works]);

  return (
    <div className="edit-container">
      <div className="edit-header">
        <p>Working Experience:</p>
      </div>
      <div className="list-items">{works.map((work) => {
        const uuid = work.uuid;
        const divCtrlBtn = (
          <div className="edit-list-items-ctrl">
            <button disabled={!work.data} onClick={() => onDeleteWorkItem(uuid)}><FontAwesomeIcon icon={faDeleteLeft}/></button>
            <button disabled={!work.data} onClick={() => onEditWorkItem(uuid)}><FontAwesomeIcon icon={faSquarePen}/></button>
          </div>
        );
        return (
          <div key={uuid}>
            {divCtrlBtn}
            <WorkComponent uuid={uuid} editable={work.editable} ref={childRef} onUpdateData={onUpdateData}/>
          </div>
        );
      })}</div>
      <button disabled={!(lastItem && lastItem.data)} className="list-items-add" onClick={onAddWorkItem}><FontAwesomeIcon icon={faSquarePlus} size="lg"/> Add work</button>
    </div>
  );
};

export default WorkingExperience;
