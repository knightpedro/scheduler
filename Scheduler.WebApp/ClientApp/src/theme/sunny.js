const visualisation = ["#3c1357", "#7b2895", "#d54d88", "#ff6361", "#f19a9b"];

const appointments = {
    colour: "#ffffff",
    JobTask: visualisation[0],
    Leave: visualisation[1],
    Training: visualisation[2],
    OutOfService: visualisation[3],
};

const theme = {
    colours: {
        appointments,
        primary: "#FFA000",
        primaryVariant: "#FFCA28",
        onPrimary: "#000000",
        secondary: "#512DA8",
        secondaryVariant: "#7E57C2",
        onSecondary: "#ffffff",
        background: "#ffffff",
        onBackground: "#000000",
        disabled: "#d9d9d9",
        onDisabled: "#9e9e9e",
        progress: "#004fb0",
        success: "#00b067",
        surface: "#ffffff",
        onSurface: "#000000",
        onSurfaceLight: "#ededed",
        error: "#E53935",
        onError: "#ffffff",
        visualisation,
    },
};

export default theme;
