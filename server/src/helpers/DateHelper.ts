import {
  addMilliseconds,
  addMinutes,
  addSeconds,
  format as formatDate,
} from 'date-fns';
import { DATE_FULL_FORMAT } from '../config';

/**
 * Formats a date string by combining the date part from the original date
 * and the current time (minutes, seconds, and milliseconds) in the specified format.
 * It also appends the timezone information.
 *
 * @param {string} value - The input date string.
 * @returns {string} - The formatted date string with timezone.
 */
const format = (value: string): string => {
  const date = new Date(value);

  // current date and time
  const now = new Date();

  // Extracting the time components from the current date
  const minutes = formatDate(now, 'mm');
  const seconds = formatDate(now, 'ss');
  const milliseconds = formatDate(now, 'SSS');
  const timezone = formatDate(now, 'XXX');

  // Creating a new date by combining the original date's date part
  // and the current time
  const newDate = addMinutes(
    addSeconds(
      addMilliseconds(date, parseInt(milliseconds)),
      parseInt(seconds)
    ),
    parseInt(minutes)
  );

  return formatDate(newDate, DATE_FULL_FORMAT) + timezone;
};

export default {
  format,
};
