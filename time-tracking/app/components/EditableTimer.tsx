import React from "react";

import TimerForm from "./TimerForm";
import Timer from "./Timer";

interface Props {
  id: string,
  title: string,
  project: string,
  elapsed: string | number,
  isRunning: boolean,
  onFormSubmit: (attrs: {title?: string, project?: string, id?: string, elapsed?: number, isRunning?: boolean}) => void,
  onRemovePress: (id: string) => void,
  onStartPress: (id: string) => void,
  onStopPress: (id: string) => void,
}

interface StateType {
  editFormOpen: boolean,
}
export default class EditableTimer extends React.Component<Props, StateType> {

  state: StateType = {
    editFormOpen: false,
  }

  handleEditPress = () => {
    this.openForm();
  }

  handleFormClose = () => {
    this.closeForm();
  }

  handleSubmit = (timer: {title?: string, project?: string, id?: string, elapsed?: number, isRunning?: boolean}) => {
    const { onFormSubmit } = this.props;

    onFormSubmit(timer);
    this.closeForm();
  }

  closeForm = () => {
    this.setState({editFormOpen: false});
  }

  openForm = () => {
    this.setState({editFormOpen: true});
  }

  render(): React.ReactNode {
    const { id, title, project, elapsed, isRunning, onRemovePress, onStartPress, onStopPress} = this.props;
    const {editFormOpen} = this.state;

    if (editFormOpen){
      return (<TimerForm id={id} title={title} project={project} onFormSubmit={this.handleSubmit} onFormClose={this.handleFormClose}/>)
    }

    return (
      <Timer 
        id={id}
        title={title}
        project={project}
        elapsed={elapsed || "0"}
        onEditPress={this.handleEditPress}
        isRunning={isRunning}
        onRemovePress={onRemovePress}
        onStartPress={onStartPress}
        onStopPress={onStopPress}
      />
    );
  }
}