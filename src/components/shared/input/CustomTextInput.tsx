import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useCustomTheme } from "../../../hooks/useCustomTheme";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { CombinedDarkTheme } from "@/src/theme/theme";

type Props = {
  style?: StyleProp<TextStyle>;
  disabled?: boolean;
  styleWrapper?: StyleProp<ViewStyle>;
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  onClear?: (isClear: boolean) => void;
  viewNode?: React.ReactNode;
  label?: string;
  color?: string;
  onFocus?: (e?: any) => void;
  onBlur?: (e?: any) => void;
  isError?: boolean;
  useClearButton?: boolean;
  isPassword?: boolean;
  disabledText?: boolean;
} & React.ComponentProps<typeof TextInput>;

const CustomTextInput = ({
  isPassword,
  color,
  style,
  disabled,
  value,
  onChangeText,
  styleWrapper,
  viewNode,
  label,
  onFocus,
  onBlur,
  isError,
  useClearButton,
  onClear,
  disabledText,
  ...rest
}: Props) => {
  const theme = useCustomTheme();
  const [isFocusedState, setIsFocusedState] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (isPasswordVisible: boolean) => {
    setIsPasswordVisible(isPasswordVisible);
  };

  const clearText = () => {
    onChangeText?.("");
    onClear?.(true);
  };

  const isFocused = useSharedValue(false);
  const hasValue = useSharedValue(!!value);

  const animationProgress = useDerivedValue(() => {
    return isFocused.value || hasValue.value ? 1 : 0;
  });

  const animatedWrapperStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(isError ? theme.colors.error : theme.colors.borderInput, {
      duration: 500,
    }),
  }));

  const animatedLabelStyle = useAnimatedStyle(() => {
    const progress = animationProgress.value;
    return {
      top: withTiming(progress ? -11 : 11, { duration: 300 }),
      left: withTiming(14, { duration: 300 }),
      fontSize: withTiming(progress ? 10 : 16, { duration: 300 }),
      color: withTiming(
        isError
          ? progress
            ? theme.colors.error
            : theme.colors.textTertiary
          : theme.colors.textTertiary,
        {
          duration: 500,
        }
      ),
    };
  });

  const handleFocus = useCallback(
    (e: any) => {
      hasValue.value && isPassword && clearText();
      setIsFocusedState(true);
      isFocused.value = true;
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: any) => {
      setIsFocusedState(false);
      isFocused.value = false;
      onBlur?.(e);
    },
    [onBlur]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      hasValue.value = !!text;
      onChangeText?.(text);
      !!text && onClear?.(false);
    },
    [onChangeText]
  );

  useEffect(() => {
    hasValue.value = !!value;
  }, [value]);

  const inputRef = useRef<TextInput>(null);
  const handleWrapperPress = () => {
    inputRef.current?.focus();
  };

  return (
    <TouchableOpacity onPress={handleWrapperPress} activeOpacity={1} className="py-2">
      <Animated.View
        style={[
          styles.container,
          styleWrapper,
          {
            backgroundColor: color || theme.colors.background,
            borderWidth: 1,
          },
          animatedWrapperStyle,
        ]}
      >
        <TextInput
          ref={inputRef}
          secureTextEntry={isPassword && !isPasswordVisible}
          editable={!disabled}
          selectTextOnFocus={!disabled}
          onPressIn={() => disabled && Keyboard.dismiss()}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            styles.input,
            {
              color: theme.colors.text,
              opacity: !disabledText ? 1 : 0.5,
            },
            style,
          ]}
          value={value}
          onChangeText={handleChangeText}
          placeholderTextColor={theme.colors.textTertiary}
          {...rest}
        />
        {label && (
          <View pointerEvents="none" style={StyleSheet.absoluteFill}>
            <Animated.Text
              style={[
                styles.label,
                { backgroundColor: color || theme.colors.background },
                animatedLabelStyle,
              ]}
            >
              {label}
            </Animated.Text>
          </View>
        )}
        {!isPassword && useClearButton && value && value.length > 0 && isFocusedState && (
          <Animated.View style={styles.icon} entering={FadeIn} exiting={FadeOut} className="left-4">
            <TouchableOpacity
              onPress={clearText}
              style={StyleSheet.absoluteFill}
              className="justify-center items-center"
            >
              <AntDesign
                name="closecircle"
                color={theme.colors.textSurface}
                style={{ opacity: theme.dark ? 1 : 0.5 }}
                size={14}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
        {isPassword && value && value.length > 0 && (
          <Animated.View style={styles.icon} className="left-4" entering={FadeIn} exiting={FadeOut}>
            <TouchableOpacity
              onPressIn={() => togglePasswordVisibility(true)}
              onPressOut={() => togglePasswordVisibility(false)}
              style={StyleSheet.absoluteFill}
              className="justify-center items-center"
            >
              <Ionicons
                name={isPasswordVisible ? "eye" : "eye-off"}
                color={theme.colors.textSurface}
                style={{ opacity: theme.dark ? 1 : 0.5 }}
                size={18}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    minHeight: 45,
    width: "100%",
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
  label: {
    position: "absolute",
    paddingHorizontal: 5,
    lineHeight: 20,
  },
  icon: {
    height: 40,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(CustomTextInput);
