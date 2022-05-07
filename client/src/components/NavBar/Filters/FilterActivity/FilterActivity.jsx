import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActivity, getActivities } from "../../../../Redux/Actions";
import './FilterActivity.scss'

export default function FilterActivity({setCurrentPage}) {
  const dispatch = useDispatch();
  const allActivities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  function handleAcitivity(e) {
    e.preventDefault();
    dispatch(filterActivity(e.target.value));
    setCurrentPage(1);
  }
  return (
    <div className='filter-container'>
      <select className='filter-content' onChange={(e) => handleAcitivity(e)}>
        <option value='All'>All Activities</option>
        {allActivities.map((el) => {
          return (
            <option value={el.name} key={el.id}>
              {el.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}