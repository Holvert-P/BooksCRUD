import React from "react";
import { useParams } from "react-router-dom";
import SongDetails from "../Components/SongDetails";

const Song = ({ mySongs }) => {
  let { id } = useParams();
  let current = mySongs[id];
  let { search, lyric, bio } = current;
  return <SongDetails search={search} lyric={lyric} bio={bio} />;
};

export default Song;
