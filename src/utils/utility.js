import toast from 'react-hot-toast';

export const sleep = (time) =>
    new Promise((resolve) => setTimeout(resolve, time));

export const sleepFor = async (time, unit) => {
    await sleep(time * 1000);
};

export const moveCat = (cat, steps) => {
    cat.style.transform += `translate(${steps * 10}px)`;
};

export const turnCat = (cat, degree, dir) => {
    // clockwise OR anti-clockwise
    dir = dir === 'CW' ? 1 : -1;
    cat.style.transform += `rotate(${dir * degree}deg)`;
};

export const getTextIcon = (data, loc) => {
    const hasIcon = data?.icon;
    const text = hasIcon ? data?.text?.split('#icon') : data?.text;

    if (loc === 0) {
        return hasIcon ? text[0] : text;
    } else if (loc === 1) {
        return hasIcon ? data?.icon : null;
    } else {
        return hasIcon ? text[1] : '';
    }
};


export const mergeSprite = (commands) => {
    const results = [];
    for (const sprite in commands) {
        results.push(...commands[sprite]);
    }
    return results;
};

export const getBlockColor = (blockName) => {
    switch (blockName) {
        case 'Control':
            return 'red';
        case 'Events':
            return 'yellow';
        case 'Looks':
            return 'purple';
        case 'Motion':
            return 'blue';
        default:
            return 'green';
    }
};


export const controlCommands = async (cmd) => {
    const splitCmd = cmd.split(' ');
    switch (splitCmd[0]) {
        case 'Wait':
            await sleepFor(parseInt(splitCmd[1]));
            return;
        default:
            return;
    }
};

export const motionCommands = async (cmd) => {
    let splitCmd = cmd.split(' ');
    splitCmd = splitCmd.filter((cmdStr) => cmdStr.trim());

    const cat = document.querySelector('#movingCat');

    switch (splitCmd[0]) {
        case 'Move':
            moveCat(cat, parseInt(splitCmd[1]));
            return;

        case 'Turn':
            turnCat(cat, parseInt(splitCmd[2]), splitCmd[1]);
            return;

        default:
            return;
    }
};

export const looksCommands = async (cmd) => {
    let splitCmd = cmd.split(' ');

    splitCmd = splitCmd.filter((cmdStr) => cmdStr.trim());

    const toastConfig = {
        duration: parseInt(splitCmd[3]) * 1000,
        position: 'bottom-left',
        icon: '🐱'
    };

    switch (splitCmd[0]) {
        case 'Say':
            toast(splitCmd[1], toastConfig);
            return;

        case 'Think':
            toast('Thinking... ' + splitCmd[1], toastConfig);
            return;

        default:
            return;
    }
};

export const commandParser = async (commands) => {
    for (const cmd of commands) {
        await commandRunner(cmd);
    }
};

export const commandRunner = async (cmd) => {
    if (cmd.cmdID.includes('Control')) return controlCommands(cmd.cmdText);
    if (cmd.cmdID.includes('Events')) return motionCommands(cmd.cmdText);
    if (cmd.cmdID.includes('Looks')) return looksCommands(cmd.cmdText);
    if (cmd.cmdID.includes('Motion')) return motionCommands(cmd.cmdText);
};


