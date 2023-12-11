import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const RedHeart = (props: any) => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M7 1031.4c-1.536 0-3.078.5-4.25 1.7-2.343 2.4-2.279 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-.75.8-.75-.8c-1.172-1.2-2.715-1.7-4.25-1.7z"
        fill="#e74c3c"
        transform="translate(0 -1028.4)"
      />
    </Svg>
  );
};

export default RedHeart;
