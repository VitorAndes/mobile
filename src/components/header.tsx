import { Text, View } from "react-native";

type HeaderProps = {
  title: string;
};

export function Header(Header: HeaderProps) {
  return (
    <View className="w-full h-28 flex-row items-end bg-black/20 px-8 pb-4 border-b border-white/10">
      <Text className="flex-1 text-white font-medium text-lg text-center">
        {Header.title}
      </Text>
    </View>
  );
}
