import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ChangeEvent, SyntheticEvent } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface TagFilterProps {
  className?: string;
  onChange?: (e: SyntheticEvent<Element, Event>, value: string[]) => void;
  noteTags: string[];
  error: boolean;
}

export default function TagFilter(props: TagFilterProps) {
  const { className, onChange, noteTags, error } = props;
  console.log(props);
  return (
    <Autocomplete
      className={className}
      value={noteTags}
      onChange={onChange}
      // {className && className={className}}
      // {onChange && onChange={onChange}}
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {option}
        </li>
      )}
      renderInput={(params) => <TextField error={error ? true : false} {...params} label="Tags" placeholder="Favorites" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = ["The Shawshank Redemption", "The Godfather", "The Godfather: Part II", "The Dark Knight", "12 Angry Men", "Schindler's List", "Pulp Fiction"];
