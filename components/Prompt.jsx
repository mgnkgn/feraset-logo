import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import useAppStore from "@/stores/appStore";

const Prompt = () => {
  const prompt = useAppStore((state) => state.prompt);
  const setPrompt = useAppStore((state) => state.setPrompt);

  const generateRandomText = () => {
    const words = [
      "Amazing",
      "Fantastic",
      "Creative",
      "Magical",
      "Bold",
      "Unique",
      "Mesmerizing",
      "Elengant",
      "Simple",
    ];
    return `${words[Math.floor(Math.random() * words.length)]}...`;
  };

  const prompts = [
    "A blue lion logo reading ‘HEXA’ in bold letters",
    "A futuristic logo for a tech startup using neon colors",
    "A minimalist logo with a mountain silhouette and a sun",
    "A creative logo combining nature and technology elements",
    "A logo of a lion roaring with the word ‘KING’ underneath",
    "A geometric abstract logo with sharp edges and vibrant colors",
    "A mascot logo featuring a fierce tiger with a modern twist",
    "A vintage-style logo with a badge design and elegant fonts",
    "A sleek and modern logo with silver and black colors",
  ];

  const generateRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  };

  const startThinkingAnimation = () => {
    const intervalId = setInterval(() => {
      setPrompt(generateRandomText());
    }, 100);

    setTimeout(() => {
      clearInterval(intervalId);
      const randomPrompt = generateRandomPrompt();
      setPrompt(randomPrompt);
    }, 3000);
  };

  const handleSurpriseMeClick = () => {
    startThinkingAnimation();
  };

  return (
    <View style={[styles.flexCol, styles.promptCt]}>
      {/* Title row */}
      <View style={[styles.flexRow, styles.promptTitleRow]}>
        <Text style={[styles.promptTitleText]}>Enter Your Prompt</Text>
        <TouchableOpacity
          style={[styles.flexRow, { gap: 8 }]}
          onPress={handleSurpriseMeClick}
        >
          <Text>🎲</Text>
          <Text style={{ color: "#FAFAFA", fontFamily: "Manrope-Regular" }}>
            Suprise me
          </Text>
        </TouchableOpacity>
      </View>
      {/* Prompt Area */}
      <View style={styles.promptAreaWrapper}>
        <TextInput
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          maxLength={500}
          placeholder="A blue lion logo reading ‘HEXA’ in bold letters"
          style={styles.promptArea}
          placeholderTextColor={"#71717A"}
          value={prompt}
          onChangeText={(text) => {
            if (text.length <= 500) {
              setPrompt(text);
            }
          }}
        />
        <Text style={styles.charCountText}>{prompt.length}/500</Text>
      </View>
    </View>
  );
};

export default Prompt;

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  promptCt: {
    width: "100%",
  },
  promptTitleRow: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promptTitleText: {
    fontWeight: "800",
    fontSize: 20,
    color: "#FAFAFA",
    fontFamily: "Manrope-Extrabold",
  },
  promptArea: {
    marginTop: 12,
    height: 200,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    backgroundColor: "#27272A",
    color: "#FAFAFA",
    fontFamily: "Manrope-Regular",
  },
  promptAreaWrapper: {
    position: "relative",
    marginTop: 12,
  },
  promptArea: {
    height: 200,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    paddingBottom: 28,
    backgroundColor: "#27272A",
    color: "#FAFAFA",
    fontFamily: "Manrope-Regular",
  },
  charCountText: {
    position: "absolute",
    bottom: 12,
    left: 12,
    fontSize: 11,
    color: "#71717A",
    fontFamily: "Manrope-Regular",
  },
});
