type SongItemProps = {
  title: string;
  desc?: string;
  onClickDelete: () => void;
  onClickReproducir: () => void;
};

function SongItem(props: SongItemProps) {
  const desc =
    props.desc ||
    "Descripcion de ejemplo de la cancion para rellenar texto y mostrar algo";

  return (
    <div className="songItem">
      <img src="https://picsum.photos/100" alt="song" />
      <div>
        <h3>{props.title}</h3>
        <p>{desc}</p>
        <button onClick={props.onClickReproducir}>Reproducir</button>
        <button onClick={props.onClickDelete}>Eliminar</button>
      </div>
    </div>
  );
}

export default SongItem;
