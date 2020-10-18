import React from "react";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;

export default function Hamburger() {
  const navigation = useNavigation();
  return (
    <Ionicons
      name="md-menu"
      onPress={() => navigation.openDrawer()}
      size={32 * scale}
      style={{ paddingLeft: 25, color: "#FA4616" }}
    />
  )
}