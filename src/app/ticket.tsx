import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Share,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Credential } from "@/components/credential";
import { Header } from "@/components/header";
import { Button } from "@/components/button";
import { QRCode } from "@/components/qrcode";

import * as imagePicker from "expo-image-picker";
import { useBadgeStore } from "@/store/badge-store";
import { Redirect } from "expo-router";
import { MotiView } from "moti";

export default function Ticket() {
  const [expandQrCode, setExpandQrCode] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleShare() {
    try {
      if (badgeStore.data?.checkInURL) {
        await Share.share({
          message: badgeStore.data.checkInURL,
        });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Compartilhar", "Não foi possível compartilhar!");
    }
  }

  async function handleSelectImage() {
    try {
      const result = await imagePicker.launchImageLibraryAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });
      if (result.assets) {
        badgeStore.updateAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Foto", "Não foi possivel selecionar a Imagem.");
    }
  }

  if (!badgeStore.data?.checkInURL) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 bg-green-500">
      <Header title="Minha Credencial" />
      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential
          data={badgeStore.data}
          onChangeAvatar={handleSelectImage}
          onExpandQrCode={() => setExpandQrCode(true)}
        />

        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: 10,
          }}
          transition={{
            loop: true,
            type: "timing",
            duration: 700,
          }}
        >
          <FontAwesome
            name="angle-double-down"
            size={24}
            color={colors.gray[300]}
            className="self-center my-6"
          />
        </MotiView>

        <Text className="text-white font-bold text-2xl mt-4">
          Compatilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do evento{" "}
          {badgeStore.data.eventTitle}!
        </Text>

        <Button title="Compatilhar" onPress={handleShare} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => badgeStore.remove()}
        >
          <Text className="mt-10 text-base text-white font-bold text-center">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={expandQrCode} statusBarTranslucent animationType="slide">
        <View className="flex-1 w-full bg-green-500 items-center justify-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpandQrCode(false)}
          >
            <QRCode value="teste" size={300} />
            <Text className="text-sm text-orange-500 font-body text-center mt-10">
              Fechar QRCode
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
