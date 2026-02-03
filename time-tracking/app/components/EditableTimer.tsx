import React from "react";

import TimerForm from "./TimerForm";
import Timer from "./Timer";

interface Props {
  id: string,
  title: string,
  project: string,
  elapsed: string | number,
  isRunning?: boolean,
}

interface StateType {
  editFormOpen: boolean,
}
export default class EditableTimer extends React.Component<Props, StateType> {

  state: StateType = {
    editFormOpen: false,
  }

  render(): React.ReactNode {
    const { id, title, project, elapsed, isRunning} = this.props;
    const {editFormOpen} = this.state;

    if (editFormOpen){
      return (<TimerForm id={id} title={title} project={project} />)
    }

    return (
      <Timer 
        // id={id}
        title={title}
        project={project}
        elapsed={elapsed || "0"}
        // isRunning={isRunning}
      />
    );
  }
}