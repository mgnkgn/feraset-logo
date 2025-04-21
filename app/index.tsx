import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Prompt from "../components/Prompt";
import LogoCarousel from "../components/LogoCarousel";
import Spinner from "../ui/Spinner";

const backGradient = require("@/assets/images/back-gradient.png");
const result = require("@/assets/images/result.png");

export default function Index() {
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("@/assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Bold": require("@/assets/fonts/Manrope-Bold.ttf"),
    "Manrope-Extrabold": require("@/assets/fonts/Manrope-ExtraBold.ttf"),
  });

  const [status, setStatus] = useState<
    "idle" | "processing" | "done" | "error"
  >("idle");
  const router = useRouter();

  const handleCreate = () => {
    setStatus("processing");

    const delay = Math.floor(Math.random() * 31 + 30) * 1000;
    setTimeout(() => {
      setStatus("done");
    }, delay);
  };

  const handleChipPress = () => {
    if (status === "done") {
      router.push("/output");
    }

    if (status === "error") {
      handleCreate();
    }
  };

  return (
    <View style={styles.mainContent}>
      <ImageBackground
        source={backGradient}
        style={styles.backgroundImage}
        imageStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        {/* Title */}
        <View style={[styles.flexCol, styles.titleCt]}>
          <Text style={[styles.titleText]}>AI Logo</Text>
        </View>

        {status !== "idle" && (
          <TouchableOpacity
            style={[styles.flexRow, styles.statusChip]}
            onPress={() => {
              handleChipPress();
            }}
            disabled={status === "processing"}
          >
            <View
              style={[
                styles.flexRow,
                styles.statusIconCt,
                {
                  backgroundColor: status === "error" ? "#EF4444B2" : "#18181B",
                },
              ]}
            >
              {status === "processing" && <Spinner color={"#FAFAFA"} />}
              {status === "done" && (
                <ImageBackground
                  source={result}
                  style={styles.backgroundImage}
                  imageStyle={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                  }}
                />
              )}
              {status === "error" && (
                <MaterialIcons name="error" size={32} color="#FAFAFA" />
              )}
            </View>

            {status === "processing" && (
              <View style={[styles.flexCol, styles.statusTextCt]}>
                <Text style={styles.statusText}>Creating Your Design</Text>
                <Text style={[styles.statusSubText, { color: "#71717A" }]}>
                  Ready in 2 minutes.
                </Text>
              </View>
            )}

            {status === "done" && (
              <View style={[styles.flexCol, styles.statusTextCt]}>
                <LinearGradient
                  colors={["#2938DC", "#943DFF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                  }}
                >
                  <Text style={styles.statusText}>Your Design is Ready!</Text>
                  <Text style={styles.statusSubText}>Tap to see it.</Text>
                </LinearGradient>
              </View>
            )}

            {status === "error" && (
              <View
                style={[
                  styles.flexCol,
                  styles.statusTextCt,
                  { backgroundColor: "#EF4444" },
                ]}
              >
                <Text style={styles.statusText}>
                  Oops, something went wrong!
                </Text>
                <Text style={styles.statusSubText}>Click to try again.</Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {/* Prompt */}
        <Prompt />

        {/* Logos */}
        <View style={[styles.flexCol, styles.logosCt]}>
          <Text style={styles.logosTitle}>Logo Styles</Text>
          {/* Carousel */}
          <LogoCarousel />
        </View>

        {/* Button */}
        <Pressable
          style={[styles.flexRow, styles.button]}
          onPress={handleCreate}
        >
          <LinearGradient
            colors={["#2938DC", "#943DFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.flexRow, styles.button]}
          >
            <Text style={[styles.buttonText]}>Create</Text>
            <FontAwesome6
              name="wand-magic-sparkles"
              size={14}
              color="#FAFAFA"
            />
          </LinearGradient>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  statusIconCt: {
    width: 70,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  statusTextCt: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    flex: 1,
  },
  statusChip: {
    backgroundColor: "#27272A",
    borderRadius: 16,
    minWidth: "100%",
    height: 70,
    marginBottom: 24,
  },
  statusText: {
    color: "#FAFAFA",
    fontFamily: "Manrope-Extrabold",
    fontWeight: "800",
    fontSize: 16,
    paddingLeft: 12,
    paddingTop: 12,
  },
  statusSubText: {
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    fontWeight: "500",
    color: "#D4D4D8",
    marginTop: 2,
    paddingLeft: 12,
  },
  backgroundImage: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 24,
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  titleCt: {
    paddingVertical: 12,
    height: 60,
    alignSelf: "center",
  },
  titleText: {
    fontWeight: "800",
    color: "#FAFAFA",
    fontFamily: "Manrope-Extrabold",
    fontSize: 17,
  },
  logosCt: {
    alignItems: "flex-start",
    width: "100%",
  },
  logosTitle: {
    color: "#FAFAFA",
    fontWeight: "800",
    fontSize: 20,
    fontFamily: "Manrope-Extrabold",
    marginTop: 24,
    paddingBottom: 12,
  },
  button: {
    borderRadius: 50,
    height: 56,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 46,
    gap: 8,
  },
  buttonText: {
    color: "#FAFAFA",
    fontWeight: "800",
    fontSize: 17,
    fontFamily: "Manrope-Bold",
  },
});
