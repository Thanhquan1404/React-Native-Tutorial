import React from "react";

import { millisecondsToHuman} from '../utils/TimerUtils';
import TimerButton from "./TImerButton";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  id?: string
  title?: string,
  project?: string,
  elapsed?: string | number,
  isRunning?: boolean,
  onEditPress: () => void,
  onRemovePress: (id: string) => void,
  onStartPress: (id: string) => void,
  onStopPress: (id: string) => void,
}

export default class Timer extends React.Component<Props> {
  handleRemovePress = () => {
    const {id, onRemovePress} = this.props;

    onRemovePress(id || '');
  }

  handleStartPress = () => {
    const { id, onStartPress } = this.props;

    onStartPress(id || '');
  };

  handleStopPress = () => {
    const { id, onStopPress } = this.props;

    onStopPress(id || '');
  };

  renderActionButton = (): React.ReactNode => {
    const { isRunning } = this.props;

    if (isRunning) {
      return (
        <TimerButton 
          color="#DB2828"
          title="Stop"
          onPress={this.handleStopPress}
        />
      );
    }

    return (
      <TimerButton 
        color="#21BA45"
        title="Start"
        onPress={this.handleStartPress}
      />
    );
  }
  render(): React.ReactNode {
    const {title, project, elapsed, onEditPress} = this.props;
    const elapsedString = millisecondsToHuman(elapsed || "0");
    

    return (
      <View style={styles.timerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text>{project}</Text>
        <Text style={styles.elapsedTime}>{elapsedString}</Text>
        <View style={styles.buttonGroup}>
          <TimerButton color="blue" small title="Edit" onPress={onEditPress}/>
          <TimerButton color="blue" small title="Remove" onPress={this.handleRemovePress}/>
        </View>
        {this.renderActionButton()}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: 'white',
    borderColor: '#d6d7da',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  elapsedTime: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});