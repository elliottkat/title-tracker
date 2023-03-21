import React, { FC, HTMLAttributes } from 'react';
import styled, { keyframes } from 'styled-components';
import { color } from '../styling/AppColors';
import { AppFonts as fonts } from '../styling/AppFonts';
import { Add, FormClose } from 'grommet-icons';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
interface ButtonProps {
    border?: string;
    position?: {
        top: string;
        align: string;
    };
}
const Button = styled.button<ButtonProps>`
    background-color: ${color.brand_green};
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    transition: transform 0.4s;
    cursor: pointer;
    border: none;
    font-size: ${fonts.medium};
    letter-spacing: 0.4px;
    font-weight: normal;
    margin: 4px;
    position: relative;
    justify-self: center;
    align-self: start;
    z-index: 99;
    & .hover-tip {
        position: absolute;
        top: ${(p) => (p.position?.top === 'bottom' ? '30px' : '-72px')};
        ${(p) => p.position?.align || 'left'}: 0;
        transform: ${(p) =>
            p.position?.align === 'center'
                ? 'translateX(-16px)'
                : `translateX(${p.position?.align === 'left' ? '-80%' : '80%'})`};
        padding: 10px;
        background-color: #444;
        color: white;
        display: none;
        width: 94%;
        border-radius: 8px;
        animation: ${fadeIn} 0.5s forwards;
    }
    &:hover {
        transform: translateY(-2px);
        background-color: ${color.brand_darkgreen};
        box-shadow: 3px 3px 3px rgba(30, 30, 30, 0.3);
    }
    &:disabled {
        background-color: #777;
        border: none;
        color: white;
        &:hover {
            transform: none;
            box-shadow: none;
            outline: 2px solid ${color.brand_green};
        }
        &:hover .hover-tip {
            display: block;
        }
    }
`;

interface TitleTrackerButtonProps extends HTMLAttributes<HTMLButtonElement> {
    label: string;
    onClick: React.MouseEventHandler;
    icon?: AppIconKeys;
    disabled?: boolean;
    position?: {
        top: string;
        align: string;
    };
}

type AppIconKeys = 'add' | 'delete';

export const TitleTrackerButton: FC<TitleTrackerButtonProps> = ({
    onClick,
    label,
    disabled,
    icon,
    position = { top: 'bottom', align: 'center' },
}) => {
    const AppIcons = {
        add: <Add size="small" color={'white'} />,
        delete: <FormClose />,
    };

    return (
        <Button onClick={onClick} disabled={disabled} position={position}>
            {icon ? <span style={{ marginRight: 6 }}>{AppIcons[icon]}</span> : null}
            {label}
        </Button>
    );
};
