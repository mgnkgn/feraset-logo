import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const monogram = require("@/assets/images/monogram.png");
const asbtract = require("@/assets/images/abstract.png");
const mascot = require("@/assets/images/mascot.png");

const LogoCarousel = () => {
  const [selectedStyle, setSelectedStyle] = React.useState("none");
  const stylesList = [
    {
      id: "none",
      label: "No Style",
      icon: <FontAwesome name="ban" size={24} color="white" />,
    },
    { id: "monogram", label: "Monogram", image: monogram },
    { id: "abstract", label: "Abstract", image: asbtract },
    { id: "mascot", label: "Mascot", image: mascot },
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carousel}
    >
      {stylesList.map((style) => (
        <TouchableOpacity
          key={style.id}
          style={[styles.flexCol, styles.logoBox]}
          onPress={() => setSelectedStyle(style.id)}
        >
          {style.image ? (
            <ImageBackground
              source={style.image}
              resizeMode="cover"
              style={styles.logoImage}
              imageStyle={{ borderRadius: 13.71 }}
            />
          ) : (
            <View
              style={[
                styles.logoImage,
                { borderWidth: 2, borderColor: "#FAFAFA" },
              ]}
            >
              {style.icon}
            </View>
          )}
          <Text
            style={[
              styles.logoText,
              {
                color: selectedStyle === style.id ? "#FAFAFA" : "#71717A",
              },
            ]}
          >
            {style.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default LogoCarousel;

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  carousel: {},
  logoBox: {
    alignItems: "center",
    marginRight: 12,
  },
  logoImage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    borderRadius: 13.71,
  },
  logoText: {
    marginTop: 6,
    fontFamily: "Manrope-Regular",
    color: "#FAFAFA",
  },
});
