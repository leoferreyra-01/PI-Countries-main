import classNames from 'classnames';
import React from 'react'
import { useDispatch } from 'react-redux';
import { filterAlpha } from '../../../../Redux/Actions';
import './FilterAlpha.scss'

export default function FilterAlpha({setOrder}){
    const dispatch = useDispatch();

    function handleAlpha(e) {
        e.preventDefault();
        dispatch(filterAlpha(e.target.value));
        setOrder(e.target.value);
    }
    
    return (
        <div className={classNames('filter-container')}>
            <select className={classNames('filter-content')} onChange={e => handleAlpha(e)}>
                <option hidden selected value=''>Alphabetical</option>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
            </select>
        </div>
    )
}