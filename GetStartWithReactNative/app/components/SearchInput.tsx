import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

interface Props {
  placeholder: string,
}
const SearchInput = ({ placeholder}: Props) => (
  <View style={styles.container}>
    <TextInput
      autoCorrect={false}
      placeholder={placeholder}
      placeholderTextColor="white"
      style={styles.textInput}
      clearButtonMode="always"
    />
  </View>
);

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: "#666",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  textInput: {
    color: "white",
    flex: 1,
  },
});
