const marginZero = (localDateTime, limit) =>
  localDateTime
    .filter((number, index) => index < limit)
    .map(number => (number < 10 ? `0${number}` : number));

const LocalDateTimeFormatter = {
  Y4M2D2_Line: localDateTime => marginZero(localDateTime, 3).slice(0, 3).join('-'),
  Y4M2D2_Div: localDateTime => marginZero(localDateTime, 3).slice(0, 3).join('/'),
  Y4M2D2_CN: (localDateTime) => {
    const marginDate = marginZero(localDateTime, 3);
    return `${marginDate[0]}年${marginDate[1]}月${marginDate[2]}`;
  },
};

const nonImplement = {};
export { LocalDateTimeFormatter, nonImplement };
