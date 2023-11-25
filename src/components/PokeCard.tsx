import { useRef, useState } from "react";

type PokeCardProps = {
  id: number;
};

function PokeCard(props: PokeCardProps) {
  const ref = useRef<HTMLImageElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      className={"card cool-bg " + (isActive ? "show" : "")}
      onClick={() => {
        setIsActive(!isActive);
        if (ref.current) {
          ref.current.classList.toggle("hide");
        }
      }}
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
        alt="pokemon"
        className={"hide"}
        ref={ref}
      />
    </button>
  );
}

export default PokeCard;
