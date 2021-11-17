import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

import { color } from '../styling/AppColors';

export const TitleTrackerTheme = deepMerge(hpe, {
    global: {
        colors: {
            green: {
                light: color.brand_green,
                dark: color.brand_green,
            },
            focus: 'none',
            'selected-background': '#E5F6F2',
            'active-background': color.app_background,
        },
        font: {
            family: 'Helvetica, Arial, San-Serif',
        },
    },
    tabs: {
        header: {
            border: {
                side: 'bottom',
                size: 'small',
                color: 'transparent',
            },
        },
    },
    tab: {
        active: {
            color: color.brand_green,
            background: 'transparent',
        },
        disabled: {
            color: '#aaa',
        },
        border: {
            side: 'bottom',
            color: 'white',
            size: '2px',
            active: {
                color: color.brand_green,
            },
            disabled: {
                color: 'transparent',
            },
            hover: {
                color: color.brand_green,
            },
        },
        hover: {
            color: color.brand_green,
            background: 'transparent',
        },
        pad: 'small',
        margin: {
            // bring the overall tabs border behind invidual tab borders
            vertical: '-2px',
            horizontal: 'none',
        },
    },
});
