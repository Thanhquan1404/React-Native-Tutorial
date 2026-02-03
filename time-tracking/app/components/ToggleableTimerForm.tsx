import { StyleSheet, View } from "react-native";
import TimerForm from "./TimerForm";
import TimerButton from "./TImerButton";
import React from "react";

interface Props {
  isOpen?: boolean,
  onFormSubmit: (timer: {title?: string, project?: string, id?: string, elapsed?: number, isRunning?: boolean }) => void,
}
interface StateType {
  isOpen: boolean,
}

export default class ToggleableTimerForm extends React.Component<Props, StateType>{
  state: StateType = {
    isOpen: false
  };

  handleFormOpen = () => {
    this.setState({isOpen: true});
  }

  handleFormClose = () => {
    this.setState({ isOpen: false });
  }

  handleFormSubmit = (timer: {title?: string, project?: string, id?: string, elapsed?: number, isRunning?: boolean }) => {
    const { onFormSubmit } = this.props;

    onFormSubmit(timer);
    this.setState({ isOpen: false})
  }

  render(): React.ReactNode {
    const { isOpen } = this.state;

    return (
      <View style={[styles.container, !isOpen && styles.buttonPadding]}>
        {isOpen ? (
          <TimerForm 
            onFormSubmit={this.handleFormSubmit}
            onFormClose={this.handleFormClose}
          /> 
        )  :  (
          <TimerButton 
            title="+" 
            color="black" 
            onPress={this.handleFormOpen}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonPadding: {
    paddingHorizontal: 15,
  },
})