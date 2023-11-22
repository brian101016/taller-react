import SongItem from "./SongItem";
import { useState } from "react";

function App() {
  const [song, setSong] = useState("");
  const [songsList, setSongsList] = useState<string[]>(["uno", "dos"]);

  return (
    <div className="App">
      <h1>La cancion es: {song}</h1>
      <div className="controles">
        <input
          placeholder="Ingresa el nombre de una cancion nueva..."
          value={song}
          onChange={(e) => {
            setSong(e.target.value);
          }}
        />
        <button
          onClick={() => {
            songsList.push(song); // 333nm
            const nuevaLista: string[] = [...songsList]; // 45rty
            // const [n1, n2, ...rest] = [1, 2, 3, 4, 5, 6];
            setSongsList(nuevaLista);
          }}
        >
          Agregar
        </button>
      </div>

      <div className="container">
        {songsList.map((currentSong, index) => {
          return <SongItem title={currentSong} />;
        })}
      </div>
    </div>
  );
}

export default App;
