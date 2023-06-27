'use client';
import { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const StyledTime = styled.p`
    font-size: 2rem;
`

const StyledButton = styled.button<{ active: boolean; color: string; }>`
    font-size: 2rem;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    ${({ active, color }) => active ? `background-color: ${color};` : `background-color: gray;`};
`

const Stopwatch: FC = () => {
    const [time, setTime] = useState(0);
    const [active, setActive] = useState(false);
    useEffect(() => {
        if (!active) return;
        const to = setTimeout(() => {
            setTime(time + 1);
        }, 10);
        return () => clearTimeout(to);
    }, [active, time]);
    const formattedTime = useMemo(() => {
        const cents = (time + '').slice(-2);
        const whole = (time + '').slice(0, -2) || 0;
        return `${whole}.${Number(cents) < 10 ? ('0' + cents) : cents}`;
    }, [time]);
    
    return (
        <>
            <StyledTime>
                Cronometro: {formattedTime}
            </StyledTime>
            <StyledButton active={!active} color={'green'} onClick={() => setActive(true)}>Start</StyledButton>
            <StyledButton active={active} color={'red'} onClick={() => setActive(false)}>Stop</StyledButton>
        </>
    );
}

export default Stopwatch;