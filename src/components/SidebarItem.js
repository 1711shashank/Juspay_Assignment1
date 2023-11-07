import React from 'react';
import { drag } from '../utils/dragAndDrop';
import Icon from './Icon';
import HideTextCmd from './HideTextCmd';
import { getBlockColor, getTextIcon } from '../utils/utility';

const SidebarItem = ({ title, data }) => {
    return (
        <>
            <div className="font-bold"> {title} </div>

            {data.map((_d, i) => (
                <div
                    draggable
                    onDragStart={drag}
                    id={title + i}
                    key={title + i}
                    className={`flex flex-row flex-wrap bg-${getBlockColor(title)}-500 text-white px-2 py-1 my-2 text-sm cursor-pointer`}
                >
                    {/* Text Before the icon */}
                    <HideTextCmd text={getTextIcon(_d, 0)} />
                    
                    {/* Icon If Exists */}
                    {
                        getTextIcon(_d, 1) &&
                        <Icon
                            size={15}
                            name={getTextIcon(_d, 1)}
                            className="text-green-800 mx-2"
                        />
                    }
                    
                    {/* Text After Icon */}
                    <HideTextCmd text={getTextIcon(_d, 2)} />
                </div>
            ))}
        </>
    );
};


export default SidebarItem;
