import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

interface SearchInputProps {
  placeholder: string;
  onSubmit: (text: string) => void;
}

interface SearchInputState {
  text: string;
}

export default class SearchInput extends React.Component<
  SearchInputProps,
  SearchInputState
> {
  state: SearchInputState;

  constructor(props: SearchInputProps) {
    super(props);
    this.state = { text: "" };
  }

  handleChangeText = (text: string): void => {
    this.setState({ text });
  };

  handleSubmitEditing = (): void => {
    this.props.onSubmit(this.state.text);
    this.setState({
      text: ""
    })
  };

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor="white"
          style={styles.textInput}
          clearButtonMode="always"
          value={text}
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
          returnKeyType="search"
        />
      </View>
    );
  }
}

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
