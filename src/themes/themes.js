import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
    label: '#1a2027',
    secondaryLabel: '#65748B',
    strongLabel: '#39393D',

    bodyColor: '#F9FAFC',
    backgroundColor: '#fff',
    secondaryBackground: '#F0F2F5',
    tertiaryBackground: '#E4E6EB',
    quaternaryBackground: '#e5e5e5',

    sideBarBackground: '#111827',
    borderColor: 'rgba(0, 0, 0, 0.12)',
    tableheadColor: '#f3f4f6',
}
export const darkTheme = {
    label: '#dddddd',
    secondaryLabel: '#A5AEB7',
    strongLabel: '#F3F6F9',

    bodyColor: '#111217',
    backgroundColor: '#17181D',
    secondaryBackground: '#202028',
    tertiaryBackground: '#37373D',
    quaternaryBackground: '#4E4E57',
    // bodyColor: '#18191A',
    // backgroundColor: '#242526',
    // secondaryBackground: '#3A3B3C',
    // tertiaryBackground: '#4E4F50',
    // quaternaryBackground: '#4a4a4f',

    sideBarBackground: '#111827',
    borderColor: '#25272D',
    tableheadColor: '#1f2937',
}

export const GlobalStyles = createGlobalStyle`

:root {
    --bg-body: ${(props) => props.theme.bodyColor};
    --fc-primary: ${(props) => props.theme.label};
    --fc-secondary: ${(props) => props.theme.secondaryLabel};
    --fc-strong: ${(props) => props.theme.strongLabel};
    --bg-primary-color: ${(props) => props.theme.backgroundColor};
    --bg-secondary-color: ${(props) => props.theme.secondaryBackground};
    --bg-tertiary-color: ${(props) => props.theme.tertiaryBackground};
    --bg-quaternary-color: ${(props) => props.theme.quaternaryBackground};
    --bg-sidebar-color: ${(props) => props.theme.sideBarBackground};
    --tablehead-color: ${(props) => props.theme.tableheadColor};
    --separator: rgba(56, 56, 58, 1);
    --shadow-color: #1c1c1e;
    --code-highlight: #1e1f1a;
    --border-color: ${(props) => props.theme.borderColor};

    /* BUTTONS */
    --btn-primary-bg: var(--color-primary);
    --btn-primary-bg__hover: var(--color-secondary);
    --btn-primary-bg__disabled: var(--color-secondary);

    --btn-outlined-color: rgba(var(--color-primary-rgb), 0.7); 
    --btn-outlined-bg: rgba(var(--color-primary-rgb), 0.1);

    --btn-borderless-color: var(--color-danger-primary);
    --btn-borderless-bg: var(--color-danger-secondary);

    --ic-disabled-fill: rgba(0,0,0,0.4)

}
body{
    background-color: ${(props) => props.theme.backgroundColor};
}
p{
    color: ${(props) => props.theme.secondaryLabel};
}
h1,
h2,
h3,
h4,
h5 {
    color: ${(props) => props.theme.strongLabel};
}


`
