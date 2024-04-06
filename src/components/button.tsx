import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";

type buttonProps = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: buttonProps) {
  return (
    <>
      <TouchableOpacity {...rest} activeOpacity={0.7} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator className="text-green-500" />
        ) : (
          <Text className="bg-orange-500 w-full h-14 rounded-lg align-middle text-center text-green-500 text-base font-bold uppercase">
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
}
