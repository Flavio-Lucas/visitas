export const datePipe = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const combineDateAndTime = (date: Date, time: Date): Date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  return new Date(year, month, day, hours, minutes, seconds, milliseconds);
};

export const getDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return day + '/' + month + '/' + year;
}

export const getHourString = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return hours + ':' + minutes + ':' + seconds;
}
