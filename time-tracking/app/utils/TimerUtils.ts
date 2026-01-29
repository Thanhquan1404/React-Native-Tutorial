// utils/TimerUtils.ts

export function millisecondsToHuman(milliseconds: number | string): string {
  const totalSeconds = Math.floor(Number(milliseconds) / 1000);

  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
