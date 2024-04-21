import { useState } from "react";
import { Chip } from "@mui/material";

function HashtagInput() {
  const [hashtags, setHashtags] = useState([]);

  const handleAddChip = (chip) => {
    setHashtags([...hashtags, chip]);
  };

  const handleDeleteChip = (chip, index) => {
    const newHashtags = hashtags.filter((_, i) => i !== index);
    setHashtags(newHashtags);
  };

  return (
    <Chip
      value={hashtags}
      onAdd={handleAddChip}
      onDelete={handleDeleteChip}
      placeholder="Añade un hashtag"
      newChipKeyCodes={[13, 32]} // Enter and space keys will create a new chip
    />
  );
}

export default HashtagInput;
