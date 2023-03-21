import { HexToRgb, LighterRGB } from '../utilities/Conversions';

interface ActivityColors {
    lowest: string;
    low: string;
    medium: string;
    high: string;
}

interface Color {
    [key: string]: string;
}

export const color: Color = {
    brand_green: '#01a982', //to hpe theme
    brand_darkgreen: '#078B69',
    brand_mediumblue: '#32DAC8',
    brand_darkblue: '#0D5265',
    brand_lightblue: '#7FF9E2',
    brand_lightpurple: '#C140FF',
    brand_mediumpurple: '#7630EA',
    brand_error: '#FF4040',
    system_summary: '#8DB99F',
    component_upgrade: '#657685',
    tech_refresh: '#657685',
    pipeline_value: '#814DDA',
    app_background: '#f3f3f8',
    box_background_1: '#efeff3',
    box_background_2: '#e9e9ed',
    box_background_3: '#d9d9e1',
};

export const activityColors: ActivityColors = {
    lowest: '#FA918A', // darker red
    low: '#F7CFC9', // light red
    medium: '#fbe6c8', // light yellow
    high: '#c1ebe1', // light green
};

export const colorBox = {
    borderRadius: 3,
    width: 18,
    minWidth: 14,
    height: 18,
    marginTop: 5,
    marginLeft: 5,
};

export const cardStyles = {
    redcard: { color: HexToRgb(activityColors.low), img: 'url("images/cardbackred.png")' },
    greencard: { color: HexToRgb(activityColors.high), img: 'url("images/cardbackgreen.png")' },
    yellowcard: { color: HexToRgb(activityColors.medium), img: 'url("images/cardbackyellow.png")' },
    greycard: { color: `200,200,200`, img: 'url("images/cardbackgrey.png")' },
    purplecard: {
        color: LighterRGB(HexToRgb(color.brand_mediumpurple), 2),
        img: 'url("images/cardbackpurple.png")',
    },
};

export const tableStyles = {
    coloredHeader: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderLeft: '3px solid white',
        borderRight: '3px solid white',
        borderBottom: 'none',
        color: 'white',
    },
    grandTotals: {
        lightgreen: '#7CDD74',
        lightcyan: '#59D8FD',
    },
};
