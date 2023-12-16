export type PokeCardProps = {
  id: number;
  isActive: boolean;
  isCompletado: boolean;
  onClick?: () => void;
};

function PokeCard(props: PokeCardProps) {
  return (
    <div className="card">
      <button className="hitbox" onClick={props.onClick}></button>
      <div
        className={
          "visible-element cool-bg " +
          (props.isActive ? " show" : "") +
          (props.isCompletado ? " complete" : "")
        }
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
          alt="pokemon"
          className={props.isActive ? "" : "hide"}
        />
      </div>
    </div>
  );
}

export default PokeCard;
