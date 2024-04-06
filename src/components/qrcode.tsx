import { colors } from "@/styles/colors";
import QrCodeSvg from "react-native-qrcode-svg";

type QRCodeProps = {
  value: string;
  size: number;
};

export function QRCode(QRCode: QRCodeProps) {
  return (
    <QrCodeSvg
      value={QRCode.value}
      size={QRCode.size}
      color={colors.white}
      backgroundColor="transparent"
    />
  );
}
