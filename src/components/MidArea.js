import React from 'react';
import { useSelector } from 'react-redux';
import { allowDrop, drop } from '../utils/dragAndDrop';
import AddSprite from './AddSprite';

export default function MidArea() {
    const tabs = useSelector((state) => state.tabs);
    const currentTab = useSelector((state) => state.currentTab);

    return (
        <div className="flex-1 h-full">
            <AddSprite />
            {
                tabs.map((tab) => (
                    <div
                        key={tab}
                        onDrop={drop}
                        onDragOver={allowDrop}
                        className={`flex-1 h-full overflow-auto ${tab === currentTab ? 'block' : 'hidden'}`}
                    />
                ))
            }
        </div>
    );
}
