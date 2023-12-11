import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SearchIcon = (props: any) => {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fill="#444"
        d="M15.7 14.3l-4.2-4.2c-.2-.2-.5-.3-.8-.3.8-1 1.3-2.4 1.3-3.8 0-3.3-2.7-6-6-6S0 2.7 0 6s2.7 6 6 6c1.4 0 2.8-.5 3.8-1.4 0 .3 0 .6.3.8l4.2 4.2c.2.2.5.3.7.3s.5-.1.7-.3c.4-.3.4-.9 0-1.3zM6 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"
      />
    </Svg>
  );
}

export default SearchIcon;