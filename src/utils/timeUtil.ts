export function getTimeDiff(unixtime: number): string {
  const unixTimeInMilliseconds = unixtime * 1000;
  const now = Date.now();
  const difference = now - unixTimeInMilliseconds;

  const differenceInSeconds = Math.floor(difference / 1000);
  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} second(s)`;
  }

  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  if (differenceInMinutes < 60) {
    return `${differenceInMinutes} minute(s)`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);
  if (differenceInHours < 24) {
    return `${differenceInHours} hour(s)`;
  }

  const differenceInDays = Math.floor(differenceInHours / 24);
  return `${differenceInDays} day(s)`;
}

export default getTimeDiff;