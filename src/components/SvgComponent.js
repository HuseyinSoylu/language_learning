import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={900} height={600} {...props}>
    <Path
      fill="#8800C7"
      d="m0 204 21.5-11.5C43 181 86 158 128.8 162.2c42.9 4.1 85.5 35.5 128.4 61.1C300 249 343 269 385.8 271.8c42.9 2.9 85.5-11.5 128.4-40 42.8-28.5 85.8-71.1 128.6-85.5 42.9-14.3 85.5-.3 128.4 18.4 42.8 18.6 85.8 42 107.3 53.6L900 230V0H0Z"
    />
  </Svg>
);

export default SvgComponent;
