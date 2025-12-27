const FILES = Array.from({ length: 16 }, (_, i) => String.fromCharCode(i + 97));

const mapSizeToPx = (size: number): number => 135 - ((size - 4) * 40) / 6;

const formatTime = (time: number) => {
  if (time === 60) {
    return '01:00';
  }

  if (time < 10) {
    return `00:0${time}`;
  }

  return `00:${time}`;
};

export { FILES, mapSizeToPx, formatTime };
