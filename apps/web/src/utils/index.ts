const FILES = Array.from({ length: 16 }, (_, i) => String.fromCharCode(i + 97));

const mapSizeToPx = (size: number): number => 135 - ((size - 4) * 40) / 6;

const formatTime = (time: number) => {
  // time is in milliseconds
  const seconds = Math.floor(time / 1000);
  const ms = (time % 1000).toString();

  if (ms.length == 1) {
    return `${seconds}.${ms}0`;
  } else if (ms.length == 2) {
    return `${seconds}.${ms}`;
  }

  return `${seconds}.${ms.slice(0, 2)}`;
};

const formatJoiningTime = (d?: string) => {
  if (!d) {
    return;
  }

  const date = new Date(d);

  return date
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .replace(/(\d{2} \w{3}) (\d{4})/, '$1, $2');
};

export { FILES, mapSizeToPx, formatTime, formatJoiningTime };
