import React from 'react';
import CatSprite from './CatSprite';
import { useSelector } from 'react-redux';
import { commandParser, mergeSprite } from '../utils/utility';

export default function PreviewArea() {
    const commands = useSelector((state) => state.commands);

    const execute = async (e) => {
        if (e.target.dataset.run) await commandParser(mergeSprite(commands));
    };

    return (
        <div
            onClick={execute}
            className="flex-none w-full h-full overflow-y-auto p-2"
        >
            <CatSprite id="movingCat" className="transition-all" />
            <button
                className="fixed right-2 top-2 bg-green-500 hover:bg-green-700 text-gray-50 h-8 w-20"
                data-run
            >
                Run
            </button>
        </div>
    );
}
