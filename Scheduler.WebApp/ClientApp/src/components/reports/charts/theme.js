export default {
  background: "transparent",
  fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
  fontSize: 12,
  textColor: "#333333",
  axis: {
    domain: {
      line: {
        stroke: "#777777",
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: "#777777",
        strokeWidth: 1,
      },
      text: { fontSize: 14 },
    },
    legend: {
      text: {
        fontWeight: "bold",
        fontSize: 16,
      },
    },
  },
  grid: {
    line: {
      stroke: "#dddddd",
      strokeWidth: 1,
    },
  },
  legends: {
    text: {
      fontSize: 14,
      fill: "#333333",
      textTransform: "capitalize",
    },
  },
  labels: {
    text: { textTransform: "capitalize" },
  },
  markers: {
    lineColor: "#000000",
    lineStrokeWidth: 1,
    text: {},
  },
  dots: {
    text: {},
  },
  tooltip: {
    container: {
      textTransform: "capitalize",
      background: "white",
      color: "inherit",
      fontSize: "inherit",
      borderRadius: "2px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
      padding: "5px 9px",
    },
    basic: {
      whiteSpace: "pre",
      display: "flex",
      alignItems: "center",
    },
    table: {},
    tableCell: {
      padding: "3px 5px",
    },
  },
  crosshair: {
    line: {
      stroke: "#000000",
      strokeWidth: 1,
      strokeOpacity: 0.75,
      strokeDasharray: "6 6",
    },
  },
  annotations: {
    text: {
      textTransform: "capitalize",
      fontSize: 13,
      outlineWidth: 2,
      outlineColor: "#ffffff",
    },
    link: {
      stroke: "#000000",
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: "#ffffff",
    },
    outline: {
      fill: "none",
      stroke: "#000000",
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: "#ffffff",
    },
    symbol: {
      fill: "#000000",
      outlineWidth: 2,
      outlineColor: "#ffffff",
    },
  },
};
