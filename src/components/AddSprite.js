import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { drag } from '../utils/dragAndDrop';
import { switchTab, appendTab } from '../redux/action';

function AddSprite() {

    const dispatch = useDispatch();
    const tabs = useSelector((state) => state.tabs);
    const currentTab = useSelector((state) => state.currentTab);

    const getName = (id) => {
        const integers = id.match(/(\d+)/);
        return 'Sprite ' + integers[0];
    };

    const toggleTab = (e) => {
        dispatch(switchTab(e.target.dataset.tab));
    };

    const addTabs = () => {
        if (tabs.length > 4) return;
        dispatch(appendTab());
    };
    return (
        <>
            <div className="relative">
                <div
                    onDragStart={drag}
                    onClick={toggleTab}
                    className="border-b border-gray-300 w-full flex flex-no-wrap overflow-x-auto items-start scrolling-touch"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            draggable
                            data-tab={tab}
                            id={'sprite-' + tab}
                            className={`${tab === currentTab ? 'bg-green-500' : 'bg-blue-400 hover:bg-blue-500'}  text-white font-bold py-2 px-4 mr-1 inline-flex items-center`}
                        >
                            {getName(tab)}
                        </button>
                    ))}
                </div>

                <button
                    onClick={addTabs}
                    className=" text-red-500 rounded-full text-white font-bold text-2xl py-1 px-4  absolute top-0 right-0"
                >
                    +
                </button>
            </div>
        </>
    );
}

export default AddSprite;
