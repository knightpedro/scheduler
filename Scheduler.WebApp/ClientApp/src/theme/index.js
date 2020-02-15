const visualisation = ["#B388FF", "#8C9EFF", "#80D8FF", "#A7FFEB", "#CCFF90"];

const appointments = {
    colour: "#000000",
    JobTask: visualisation[0],
    Leave: visualisation[1],
    Training: visualisation[2],
    OutOfService: visualisation[3],
};

const theme = {
    colours: {
        appointments,
        primary: "#3700b3",
        primaryVariant: "#6200ee",
        onPrimary: "#ffffff",
        secondary: "#03dac6",
        secondaryVariant: "#018786",
        onSecondary: "#000000",
        background: "#ffffff",
        onBackground: "#000000",
        disabled: "#d9d9d9",
        onDisabled: "#9e9e9e",
        progress: "#004fb0",
        success: "#00b067",
        surface: "#ffffff",
        onSurface: "#000000",
        onSurfaceLight: "#ededed",
        error: "#b00020",
        onError: "#ffffff",
        visualisation,
    },
};

export default theme;
