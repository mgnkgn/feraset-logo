import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import useAppStore from "@/stores/appStore";

const resultImage = require("@/assets/images/result.png");

export default function Output() {
  const router = useRouter();
  const submittedPrompt = useAppStore((state) => state.submittedPrompt);
  const selectedStyle = useAppStore((state) => state.selectedStyle);
  const [copied, setCopied] = useState(false);

  const handleClose = () => {
    router.push("/");
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(submittedPrompt);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCt}>
        <Text style={styles.headerText}>Your Design</Text>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close-outline" size={30} color="#FAFAFA" />
        </TouchableOpacity>
      </View>

      <Image source={resultImage} style={styles.image} />

      {/* Submitted prompt */}
      <View style={styles.promptCt}>
        {/* Prompt header ct */}
        <View style={styles.promptHeaderCt}>
          <Text style={styles.promptText}>Prompt</Text>
          {/* Copy */}
          <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
            <Ionicons
              name={copied ? "checkmark-outline" : "copy-outline"}
              size={16}
              color={copied ? "#4ade80" : "#A1A1AA"}
            />
            <Text style={styles.copyButtonText}>
              {copied ? "Copied!" : "Copy"}
            </Text>
          </TouchableOpacity>
        </View>

        {/*  Submitted prompt text */}
        <Text style={styles.submittedPromptText}>{submittedPrompt}</Text>

        {/* Pill variant */}
        <View style={styles.pillVariant}>
          <Text style={styles.pillText}>{selectedStyle?.label}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    alignItems: "center",
    paddingTop: 56,
    paddingHorizontal: 24,
  },
  headerCt: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  headerText: {
    fontFamily: "Manrope-Extrabold",
    fontSize: 22,
    fontWeight: "800",
    color: "#FAFAFA",
  },
  title: {
    color: "#FAFAFA",
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 342,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  promptCt: {
    backgroundColor: "#27272A",
    width: "100%",
    borderRadius: 12,
    minHeight: 134,
    padding: 12,
    marginTop: 24,
  },
  promptHeaderCt: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  promptText: {
    color: "#FAFAFA",
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Manrope-Bold",
  },
  copyButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  copyButtonText: {
    color: "#A1A1AA",
    marginLeft: 8,
    fontWeight: "400",
    fontFamily: "Manrope-Regular",
    fontSize: 11,
  },
  submittedPromptText: {
    color: "#FAFAFA",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Manrope-Regular",
    marginTop: 12,
  },
  pillVariant: {
    backgroundColor: "#3F3E48",
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 16,
    alignSelf: "flex-start",
  },
  pillText: {
    color: "#FAFAFA",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Manrope-Regular",
  },
});
