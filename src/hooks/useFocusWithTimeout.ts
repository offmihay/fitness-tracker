import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const useFocusWithTimeout = (timeoutDuration = 100) => {
  const [isAnyInputFocused, setIsAnyInputFocused] = useState(false);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // Type for setTimeout

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setIsAnyInputFocused(true);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setIsAnyInputFocused(false);
    }, timeoutDuration);
  };

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  return { isAnyInputFocused, handleFocus, handleBlur };
};

export default useFocusWithTimeout;
