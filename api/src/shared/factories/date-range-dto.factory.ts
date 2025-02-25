import { DateRangeDto } from '../dto/date-range.dto';

export function makeDateRangeDto(params: { from: string; to: string }) {
  return new DateRangeDto(params);
}
