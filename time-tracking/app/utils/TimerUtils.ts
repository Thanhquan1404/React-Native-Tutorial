// utils/TimerUtils.ts
import uuid from 'react-native-uuid';

export function millisecondsToHuman(milliseconds: number | string): string {
  const totalSeconds = Math.floor(Number(milliseconds) / 1000);

  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

interface AttrsType {
  title?: string,
  project?: string,
  id?: string, 
  elapsed?: number,
  isRunning?: boolean,
}

export const newTimer = (attrs: AttrsType) => {
  const timer = {
    title: attrs.title || 'Timer',
    project: attrs.project || 'Project',
    id: uuid.v4.toString(),
    elapsed: 0,
    isRunning: false,
  }

  return timer;
}