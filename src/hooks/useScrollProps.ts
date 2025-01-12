import { useMemo, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, Platform } from "react-native";

const useScrollProps = (keyCoord: number) => {
  const [scrollY, setScrollY] = useState(0);

  const scrollPropOnBlur = useMemo(() => {
    if (scrollY > keyCoord) {
      return {
        enableResetScrollToCoords: true,
        resetScrollToCoords: { x: 0, y: 1000 },
      };
    } else {
      return {
        enableResetScrollToCoords: false,
      };
    }
  }, [scrollY]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    setScrollY(contentOffset.y);
  };

  return { scrollPropOnBlur, handleScroll };
};

export default useScrollProps;
