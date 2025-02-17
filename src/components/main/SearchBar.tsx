import { Search as SearchIcon } from "@mui/icons-material";
import { Paper, InputBase, IconButton } from "@mui/material";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ placeholder, value, onChange }: SearchBarProps) => {
  return (
    <Paper className="flex items-center w-full max-w-2xl px-4 py-2" elevation={0}>
      <InputBase
        placeholder={placeholder}
        className="flex-grow ml-2"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
