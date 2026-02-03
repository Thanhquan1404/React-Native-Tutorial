import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { newTimer } from "./utils/TimerUtils";
import uuid from 'react-native-uuid';


interface TimerType {
  title: string, 
  project: string,
  id: string,
  elapsed: string | number,
  isRunning: boolean,
}
interface StateType {
  timers: TimerType[],
}
export default class App extends React.Component<any, StateType> {

  state: StateType = {
    timers: [
      {
        title: 'Mow the lawn', 
        project: 'House Chores',
        id: uuid.v4().toString(),
        elapsed: 5456099,
        isRunning: true,
      },
      {
        title: 'Bake squash', 
        project: 'Kitchen Chores',
        id: uuid.v4().toString(),
        elapsed: 1273998,
        isRunning: false,
      },
    ],
  }

  handleCreateFormSubmit = (timer: {title?: string, project?: string, id?: string, elapsed?: number, isRunning?: boolean}) => {
    const {timers} = this.state;
    
    this.setState({
      timers: [newTimer(timer), ...timers]
    })
  }

  handleFormSubmit = (attrs: {
    title?: string;
    project?: string;
    id?: string;
    elapsed?: number;
    isRunning?: boolean;
  }) => {
    const { timers } = this.state;

    this.setState({
      timers: timers.map(timer => {
        if (timer.id === attrs.id) {
          return {
            ...timer,
            title: attrs.title ?? timer.title,
            project: attrs.project ?? timer.project,
          };
        }
        return timer;
      }),
    });
  };

  /**
   * Initalize App component 
   * @returns App component
   */
  render(): React.ReactNode {
    const {timers} = this.state;

      return (
        <View style={styles.appContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Timers</Text>
          </View>
        
          <ScrollView style={styles.timerList}>
            <ToggleableTimerForm isOpen={false} onFormSubmit={this.handleCreateFormSubmit}/>
            {
              timers.map(({title, project, id, elapsed, isRunning}) => (
                <EditableTimer 
                  key={id}
                  id={id}
                  title={title}
                  project={project}
                  elapsed={elapsed}
                  isRunning={isRunning}
                  onFormSubmit={this.handleFormSubmit}
                />
              ))
            }
          </ScrollView>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 15
  }
})