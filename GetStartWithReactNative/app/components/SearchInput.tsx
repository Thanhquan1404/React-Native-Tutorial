import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Platform,
  Keyboard,
} from "react-native";

interface SearchInputProps {
  placeholder: string;
  onSubmit: (text: string) => void;
}

interface SearchInputState {
  text: string;
  focused: boolean;
}

export default class SearchInput extends React.Component<
  SearchInputProps,
  SearchInputState
> {
  state: SearchInputState = {
    text: "",
    focused: false,
  };

  handleChangeText = (text: string): void => {
    this.setState({ text });
  };

  handleSubmitEditing = (): void => {
    const value = this.state.text.trim();

    if (!value) return;

    this.props.onSubmit(value);
    this.setState({ text: "" });
    Keyboard.dismiss();
  };

  render() {
    const { placeholder } = this.props;
    const { text, focused } = this.state;

    return (
      <View
        style={[
          styles.container,
          focused && styles.containerFocused,
        ]}
      >
        <TextInput
          value={text}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.7)"
          autoCorrect={false}
          autoCapitalize="words"
          returnKeyType="search"
          clearButtonMode="while-editing"
          style={styles.textInput}
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
          accessibilityLabel="Search city input"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    marginTop: 25,
    marginHorizontal: 30,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },

  containerFocused: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },

  textInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontFamily:
      Platform.OS === "ios" ? "AvenirNext-Medium" : "Roboto",
  },
});
