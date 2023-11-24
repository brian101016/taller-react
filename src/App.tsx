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
            // songsList.push(song); // 333nm
            const nuevaLista: string[] = [...songsList, song]; // 45rty
            // const [n1, n2, ...rest] = [1, 2, 3, 4, 5, 6];
            setSongsList(nuevaLista);
            setSong("");
          }}
        >
          Agregar
        </button>
      </div>

      <div className="container">
        {songsList.map((currentSong, currentIndex) => {
          return (
            <SongItem
              title={currentSong}
              onClickDelete={() => {
                songsList.splice(currentIndex, 1);
                setSongsList([...songsList]);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
