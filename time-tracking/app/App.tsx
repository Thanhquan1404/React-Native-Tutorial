import React from "react";
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { newTimer } from "./utils/TimerUtils";
import uuid from 'react-native-uuid';


interface TimerType {
  title: string, 
  project: string,
  id: string,
  elapsed:  number,
  isRunning: boolean,
}
interface StateType {
  timers: TimerType[],
  intervalId: number,
}
export default class App extends React.Component<any, StateType> {
  intervalId?: number;

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
    intervalId: 0,
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

  handleRemovePress = (timerId: string) => {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId),
    });
  }

  componentDidMount(){
    const TIME_INTERVAL = 1000;

    this.intervalId = setInterval( () => {
      const {timers} = this.state;

      this.setState({
        timers: timers.map( (timer) => {
          const {elapsed, isRunning} = timer;

          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
          };
        }),
      });
    }, TIME_INTERVAL);
  }

  componentWillUnmount(): void {
      clearInterval(this.intervalId);
  }

  toggleTimer = (timerId: string) => {
    this.setState( prevState => {
      const {timers} = prevState;

      return {
        timers: timers.map( (timer) => {
          const { id, isRunning } = timer;

          if ( id === timerId){
            return {
              ...timer,
              isRunning: !isRunning,
            };
          }

          return timer;
        }),
      };
    });
  }

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
        
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.timerListContainer}
          >
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
                      onRemovePress={this.handleRemovePress}
                      onStartPress={this.toggleTimer}
                      onStopPress={this.toggleTimer}
                    />
                  ))
                }
            </ScrollView>
          </KeyboardAvoidingView>
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
    paddingBottom: 15,
  },
  timerListContainer: {
    flex: 1,
  }
})