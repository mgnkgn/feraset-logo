import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Spinner from "../ui/Spinner";
import useAppStore from "@/stores/appStore";

const result = require("@/assets/images/result.png");

const StatusChip = ({ onPress }) => {
  const { status } = useAppStore();
  if (status === "idle") return null;

  return (
    <TouchableOpacity
      style={[styles.statusChip]}
      onPress={onPress}
      disabled={status === "processing"}
    >
      <View
        style={[
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
            style={{ flex: 1, width: "100%" }}
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
        <View style={[styles.statusTextCt]}>
          <Text style={styles.statusText}>Creating Your Design</Text>
          <Text style={[styles.statusSubText, { color: "#71717A" }]}>
            Ready in 2 minutes.
          </Text>
        </View>
      )}

      {status === "done" && (
        <View style={[styles.statusTextCt]}>
          <LinearGradient
            colors={["#2938DC", "#943DFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.statusText}>Your Design is Ready!</Text>
            <Text style={styles.statusSubText}>Tap to see it.</Text>
          </LinearGradient>
        </View>
      )}

      {status === "error" && (
        <View style={[styles.statusTextCt, { backgroundColor: "#EF4444" }]}>
          <Text style={styles.statusText}>Oops, something went wrong!</Text>
          <Text style={styles.statusSubText}>Click to try again.</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default StatusChip;

const styles = StyleSheet.create({
  statusChip: {
    backgroundColor: "#27272A",
    borderRadius: 16,
    minWidth: "100%",
    height: 70,
    marginBottom: 24,
    flexDirection: "row",
  },
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
    justifyContent: "center",
  },
  statusText: {
    color: "#FAFAFA",
    fontFamily: "Manrope-Extrabold",
    fontWeight: "800",
    fontSize: 16,
    paddingLeft: 12,
  },
  statusSubText: {
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    fontWeight: "500",
    color: "#D4D4D8",
    marginTop: 2,
    paddingLeft: 12,
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: "center",
  },
});
