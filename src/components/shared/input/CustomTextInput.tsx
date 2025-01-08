import React, { forwardRef, useCallback, useEffect, useState } from "react";
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
  withTiming,
} from "react-native-reanimated";
import { AntDesign, Ionicons } from "@expo/vector-icons";

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
  isForceFocused?: boolean;
} & React.ComponentProps<typeof TextInput>;

const CustomTextInput = forwardRef<TextInput, Props>(
  (
    {
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
      isForceFocused,
      ...rest
    },
    ref
  ) => {
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
      borderColor: withTiming(
        isError ? theme.colors.error : isFocused.value ? theme.colors.link : theme.colors.border,
        {
          duration: 500,
        }
      ),
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
            : isFocused.value
            ? theme.colors.link
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

    useEffect(() => {
      if (isForceFocused) {
        setIsFocusedState(true);
        isFocused.value = true;
      } else {
        setIsFocusedState(false);
        isFocused.value = false;
      }
    }, [isForceFocused]);

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

    return (
      <View className="py-2">
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor: color || theme.colors.background,
              borderWidth: 1,
            },
            styleWrapper,
            animatedWrapperStyle,
          ]}
        >
          <TextInput
            ref={ref}
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

          {!isPassword && useClearButton && (
            <View style={styles.icon}>
              {value && value.length > 0 && isFocusedState && (
                <Animated.View style={StyleSheet.absoluteFill} entering={FadeIn} exiting={FadeOut}>
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
            </View>
          )}
          {isPassword && (
            <View style={styles.icon}>
              {value && value.length > 0 && (
                <Animated.View style={StyleSheet.absoluteFill} entering={FadeIn} exiting={FadeOut}>
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
            </View>
          )}
        </Animated.View>
      </View>
    );
  }
);

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
  },
  icon: {
    height: 40,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomTextInput;
