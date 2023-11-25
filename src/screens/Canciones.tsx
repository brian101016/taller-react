import { useState } from "react";
import "../index.css";
import SongItem from "../components/SongItem";

function Canciones() {
  const [song, setSong] = useState("");
  const [reproducir, setReproducir] = useState<string | null>(null);
  const [songsList, setSongsList] = useState<string[]>(["uno", "dos"]);

  return (
    <div className="canciones">
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

      {songsList.length === 0 ? (
        <h1>Agrega canciones para continuar</h1>
      ) : reproducir === null ? (
        <h2>Selecciona una cancion...</h2>
      ) : (
        <h2>Ahora reproduciendo... {reproducir}</h2>
      )}

      <div className="container">
        {songsList.map((currentSong, currentIndex) => {
          return (
            <SongItem
              title={currentSong}
              onClickDelete={() => {
                songsList.splice(currentIndex, 1);
                setSongsList([...songsList]);
                if (reproducir === currentSong) {
                  setReproducir(null);
                }
              }}
              onClickReproducir={() => {
                setReproducir(currentSong);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Canciones;
