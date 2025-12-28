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
