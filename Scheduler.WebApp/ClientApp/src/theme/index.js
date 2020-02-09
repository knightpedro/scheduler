const palette = {
    fresh: '#F7F5E6',
    vermillion: '#333A56',
    sunshine: '#52658F',
    clean: '#E8E8E8'
};

const appointments = {
    conflict: {
        border: '1px solid red'
    },
    JobTask: {
        background: '#d4ffee',
        border: 'none'
    },
    Leave: {
        background: '#d4e4ff',
        border: 'none'
    },
    OutOfService: {
        background: palette.clean,
        border: 'none'
    },
    Training: {
        background: palette.fresh,
        border: 'none'
    }
};

const theme = {
    colours: {
        appointments,
        background: palette.clean,
        body: 'white',
        breadcrumb: palette.clean,
        datePickerHeading: palette.vermillion,
        datePickerHeadingHover: palette.sunshine,
        datePickerHeadingItem: 'white',
        datePickerHeadingItemHover: palette.fresh,
        footer: palette.vermillion,
        footerItem: palette.fresh,
        nav: palette.vermillion,
        navDropdown: palette.sunshine,
        navDropdownHover: palette.vermillion,
        navDropdownItem: palette.fresh,
        navDropdownItemHover: 'white',
        navItem: palette.fresh,
        navItemHover: 'white',
        navItemSelected: 'white',
        tableBody: 'white',
        tableBorder: palette.clean,
        tableHead: palette.sunshine,
        tableHeading: 'white',
        tableHeadingItem: 'white',
        tableHeadingItemHover: palette.fresh
    },
    fonts: {

    }
};

export default theme;