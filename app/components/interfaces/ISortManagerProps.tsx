export interface SortManagerProps {
  handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sort: string;
}
