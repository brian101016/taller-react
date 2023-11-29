export type PokeCardProps = {
  id: number;
  isActive: boolean;
  isCompletado: boolean;
  onClick?: () => void;
};

function PokeCard(props: PokeCardProps) {
  return (
    <button
      className={
        "card cool-bg " +
        (props.isActive ? " show" : "") +
        (props.isCompletado ? " complete" : "")
      }
      onClick={props.onClick}
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
        alt="pokemon"
        className={props.isActive ? "" : "hide"}
      />
    </button>
  );
}

export default PokeCard;
