import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import useAppStore from "@/stores/appStore";
import Prompt from "@/components/Prompt";
import LogoCarousel from "@/components/LogoCarousel";
import StatusChip from "@/components/StatusChip";
import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Spinner from "@/ui/Spinner";

const backGradient = require("@/assets/images/back-gradient.png");

export default function Index() {
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("@/assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Bold": require("@/assets/fonts/Manrope-Bold.ttf"),
    "Manrope-Extrabold": require("@/assets/fonts/Manrope-ExtraBold.ttf"),
  });

  const prompt = useAppStore((state) => state.prompt);
  const setSubmittedPrompt = useAppStore((state) => state.setSubmittedPrompt);
  const submittedPrompt = useAppStore((state) => state.submittedPrompt);
  const setPrompt = useAppStore((state) => state.setPrompt);
  const setStatus = useAppStore((state) => state.setStatus);
  const status = useAppStore((state) => state.status);

  const [delayDuration, setDelayDuration] = React.useState(0);

  const router = useRouter();

  const handleCreate = () => {
    // Save for next screen and then clear ui
    setSubmittedPrompt(prompt);
    setPrompt("");
    setStatus("processing");

    // Random delay up to 2min
    const delay = Math.floor(Math.random() * 31 + 30) * 1000;

    //const delay = 3 * 1000; // For testing purposes
    setDelayDuration(delay);
    setTimeout(() => {
      setStatus("done");
    }, delay);
  };

  const handleChipPress = async () => {
    if (status === "done") {
      const success = await saveDataToFirestore();
      if (success) {
        router.push("/output");
      }
    }

    if (status === "error") {
      handleCreate();
    }
  };

  // Save data to Firestore
  // This function is called when the user presses the status chip
  const saveDataToFirestore = async () => {
    try {
      await addDoc(collection(db, "logos"), {
        prompt: submittedPrompt,
        style: useAppStore.getState().selectedStyle?.label || "default",
        createdAt: new Date(),
        duration: delayDuration,
      });
      return true;
    } catch (error) {
      setStatus("error");
      return false;
    }
  };

  // Reset states on screen foıcus
  useFocusEffect(
    React.useCallback(() => {
      setSubmittedPrompt("");
      setPrompt("");
      setStatus("idle");
      setDelayDuration(0);
    }, [])
  );

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

        {/* Status Chip */}
        <StatusChip onPress={handleChipPress} />

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
          disabled={status === "processing"}
        >
          <LinearGradient
            colors={
              status === "processing"
                ? ["#6D6DC6", "#A377D5"]
                : ["#2938DC", "#943DFF"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.flexRow, styles.button]}
          >
            <Text style={[styles.buttonText]}>
              {status === "processing" ? "Creating" : "Create"}
            </Text>
            {status === "processing" ? (
              <Spinner color="#FAFAFA" />
            ) : (
              <FontAwesome6
                name="wand-magic-sparkles"
                size={14}
                color="#FAFAFA"
              />
            )}
          </LinearGradient>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
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
