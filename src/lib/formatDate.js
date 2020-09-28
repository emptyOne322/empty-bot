const Intl = require('intl');

const getFormatter = (opts = {}) => {
  const formatter = new Intl.DateTimeFormat('ru', opts);
  return formatter.format;
};
const formatter = getFormatter({
  weekday: 'short', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit',
});

const formatDate = (str) => {
  if (!str) return undefined;
  const date = new Date(str);
  return formatter(date);
};

export default formatDate;
