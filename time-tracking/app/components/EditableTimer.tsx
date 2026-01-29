import React from "react";

import TimerForm from "./TimerForm";
import Timer from "./Timer";

interface Props {
  id: string,
  title: string,
  project: string,
  elapsed: string | number,
  isRunning?: boolean,
  editFormOpen?: boolean,
}
export default class EditableTimer extends React.Component<Props> {
  render(): React.ReactNode {
    const { id, title, project, elapsed, isRunning, editFormOpen } = this.props;
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