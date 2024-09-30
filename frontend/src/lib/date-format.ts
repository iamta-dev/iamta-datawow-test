import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatTimeAgo(dateString: string): string {
  return dayjs(dateString).fromNow(); // "1 hour ago"
}


