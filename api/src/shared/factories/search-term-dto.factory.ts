import { SearchTermDto } from '../dto/search-term.dto';

export function makeSearchTermDto(query: string) {
  return new SearchTermDto(query);
}
