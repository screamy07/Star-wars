import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const BlackHeart = (props: any) => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d="M13.91 6.75c-1.17 2.25-4.3 5.31-6.07 6.94a.5.5 0 01-.67 0C5.39 12.06 2.26 9 1.09 6.75-1.48 1.8 5-1.5 7.5 3.45c2.5-4.95 8.98-1.65 6.41 3.3z" />
    </Svg>
  );
};

export default BlackHeart;
