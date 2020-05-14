import * as React from 'react';

interface DefaultProps {
    play?: boolean;
    startStep?: number;
    endStep?: number;
    helpList?: [{ selector: string, title?: string, description?: string, position?: string }]
    nextLabel?: 'next';
    prevLabel?: 'prev';
    skipLabel?: 'skip';
    closeLabel?: 'close';
    direction?: 'ltr' | 'rtl';
    onPrev?: () => { step: string };
    onNext?: () => { step: string };
    onSkip?: () => { step: string };
    onClose?: () => { step: string };
    prevClassName?: string;
    nextClassName?:string;
    skipClassName?:string;
    closeClassName?:string;
    style?:{}
}

declare class Help extends React.Component<DefaultProps> {
    // @ts-ignore
    render(): JSX.Element;
}

export default Help;
