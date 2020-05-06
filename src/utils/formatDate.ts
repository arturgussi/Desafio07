import { parseISO, format } from 'date-fns';

const formatDate = (date: Date):string =>
  format(parseISO(date.toString()), 'dd/MM/yyy');

export default formatDate;
