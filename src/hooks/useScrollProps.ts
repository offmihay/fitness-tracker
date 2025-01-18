import { useEffect, useMemo, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

const useScrollProps = () => {
  const [isScrollToBottom, setIsScrolledToBottom] = useState(false);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [heightView, setHeightView] = useState(0);

  const [limitCoord, setLimitCoord] = useState(0);

  const coordOffset = 0;

  // console.log("Limit: ", limitCoord);

  useEffect(() => {
    setLimitCoord(scrollViewHeight - heightView + coordOffset);
  }, [scrollViewHeight, heightView]);

  const scrollPropOnBlur = useMemo(() => {
    if (isScrollToBottom) {
      return {
        enableResetScrollToCoords: true,
        resetScrollToCoords: { x: 0, y: 1000 },
      };
    } else {
      return {
        enableResetScrollToCoords: false,
      };
    }
  }, [isScrollToBottom]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y > limitCoord) {
      setIsScrolledToBottom(true);
    } else {
      setIsScrolledToBottom(false);
    }
  };

  const onContentSizeChange = (width: number, height: number) => {
    setScrollViewHeight(height);
  };

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeightView(height);
  };

  return { scrollPropOnBlur, handleScroll, onContentSizeChange, onLayout };
};

export default useScrollProps;
