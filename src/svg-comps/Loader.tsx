import * as React from "react";
import Svg, { Circle } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: animateTransform */
const LoaderSVG = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    preserveAspectRatio="xMidYMid"
    style={{
      shapeRendering: "auto",
      display: "block",
      background: "#d2d3d4",
    }}
    viewBox="0 0 100 100"
    {...props}
  >
    <Circle
      cx={50}
      cy={50}
      r={32}
      fill="none"
      stroke="#fff"
      strokeDasharray="50.26548245743669 50.26548245743669"
      strokeLinecap="round"
      strokeWidth={8}
    ></Circle>
    <Circle
      cx={50}
      cy={50}
      r={23}
      fill="none"
      stroke="#7968f2"
      strokeDasharray="36.12831551628262 36.12831551628262"
      strokeDashoffset={36.128}
      strokeLinecap="round"
      strokeWidth={8}
    ></Circle>
  </Svg>
);
export default LoaderSVG;
