/* eslint-disable react/prop-types */
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function HashtagInput({ hashtags, setHashtags }) {
  const addHashtag = (newValue) => {
    if (
      newValue &&
      newValue.length > 0 &&
      newValue.length <= 15 &&
      hashtags.length < 7 &&
      !hashtags.includes(newValue)
    ) {
      setHashtags([...hashtags, newValue]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newValue = event.target.value;
      addHashtag(newValue);
    }
  };

  const handleDelete = (chipToDelete) => () => {
    setHashtags((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <div>
      <Autocomplete
        multiple
        freeSolo
        options={[]}
        value={hashtags}
        onKeyDown={handleKeyDown}
        onChange={(event, newValue) => {
          if (newValue.length < hashtags.length) {
            setHashtags(newValue);
          } else {
            const newHashtag = newValue[newValue.length - 1];
            addHashtag(newHashtag);
          }
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={index}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              onDelete={handleDelete(option)}
            />
          ))
        }
        renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Hashtags" />}
      />
    </div>
  );
}

export default HashtagInput;
