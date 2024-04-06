import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { colors } from "@/styles/colors";
import { Credential } from "@/components/credential";
import { Header } from "@/components/header";
import { Button } from "@/components/button";

import * as imagePicker from "expo-image-picker";
import { QRCode } from "@/components/qrcode";

export default function Ticket() {
  const [image, setImage] = useState("");
  const [expandQrCode, setExpandQrCode] = useState(false);

  async function handleSelectImage() {
    try {
      const result = await imagePicker.launchImageLibraryAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });
      if (result.assets) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Foto", "Não foi possivel selecionar a Imagem.");
    }
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
          image={image}
          onChangeAvatar={handleSelectImage}
          onExpandQrCode={() => setExpandQrCode(true)}
        />

        <FontAwesome
          name="angle-double-down"
          size={24}
          color={colors.gray[300]}
          className="self-center my-6"
        />

        <Text className="text-white font-bold text-2xl mt-4">
          Compatilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Moste ao mundo que você vai participar do Unite Summit!
        </Text>

        <Button title="Compatilhar" />
        <TouchableOpacity activeOpacity={0.7}>
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
