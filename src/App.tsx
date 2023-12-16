import { useCallback, useEffect, useRef, useState } from "react";
import PokeCard, { PokeCardProps } from "./components/PokeCard";
import { rand } from "./scripts/funcRandom";

const TIMER = 75;

function App() {
  const [pokeList, setPokeList] = useState<PokeCardProps[]>(crearLista());
  const [currentCard, setCurrentCard] = useState<PokeCardProps | null>(null);
  const [cooldown, setCooldown] = useState(false);

  const [gameOver, setGameOver] = useState(false);
  const [animPlay, setAnimPlay] = useState(false);
  const [timer, setTimer] = useState(TIMER);
  const [victories, setVictories] = useState(0);

  const timerRef = useRef<HTMLDivElement | null>(null);

  // ######################################## RESET ANIMATION
  const resetAnimation = useCallback(() => {
    if (timerRef.current) {
      timerRef.current.style.animationName = "none";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _ = timerRef.current.offsetHeight; /* trigger reflow */
      timerRef.current.style.animationName = "";
    }
  }, []);

  // ######################################## RESET ALL
  const resetAll = useCallback(
    (type: "round" | "every") => {
      setPokeList(crearLista());
      setCurrentCard(null);
      setCooldown(false);
      setGameOver(false);
      if (type === "every") {
        setAnimPlay(false);
        setTimer(TIMER);
        setVictories(0);
      } else {
        setTimer((prev) => (prev <= 10 ? 10 : prev - 4));
        setAnimPlay(true);
      }
      resetAnimation();
    },
    [resetAnimation]
  );

  // ######################################## WIN ROUND
  const winRound = useCallback(() => {
    setVictories((prev) => prev + 1);
    setAnimPlay(false);
    setTimeout(() => resetAll("round"), 1000);
  }, [resetAll]);

  // ######################################## FIN DEL JUEGO
  useEffect(() => {
    if (currentCard === null) {
      const porTerminar = pokeList.some((item) => !item.isCompletado);
      if (!porTerminar) winRound();
    }
  }, [pokeList, currentCard, winRound]);

  // ######################################## ANIMATION END
  function handleAnimationEnd() {
    setGameOver(true);
  }

  return (
    <div className="memorama">
      <div className="header">Nivel actual: {victories}</div>

      <div
        ref={timerRef}
        className={"timer " + (animPlay ? "" : "stop")}
        onAnimationEnd={handleAnimationEnd}
        style={{
          animationDuration: timer + "s",
        }}
      ></div>

      <div className={"modal-back " + (gameOver ? "" : "hidden")}>
        <div className="modal">
          Fin del Juego! <br />
          Puntuación: {victories} <br />
          <button
            className="button"
            onClick={() => {
              resetAll("every");
            }}
          >
            Reiniciar?
          </button>
        </div>
      </div>

      <div className="cards-container">
        {pokeList.map((item, index) => {
          return (
            <PokeCard
              id={item.id}
              isActive={item.isActive}
              isCompletado={item.isCompletado}
              onClick={() => {
                if (item.isCompletado || cooldown) return;
                setAnimPlay(true);

                // INVIRTIENDO EL ACTIVO
                item.isActive = !item.isActive;
                setPokeList([...pokeList]);

                // SI LA CARTA LA ACABAMOS DE DESACTIVAR, ENTONCES NOS SALIMOS
                if (!item.isActive) return setCurrentCard(null);

                // ESTA CARTA SE ACABA DE ACTIVAR
                // LA CARTA ANTERIOR NO EXISTE, ENTONCES SALIMOS DE NUEVO
                if (!currentCard) return setCurrentCard(item);

                // HAY DOS CARTAS ACTIVAS AL MISMO TIEMPO
                // SI LA CARTA ACTUAL ES IGUAL A LA CARTA ANTERIOR
                if (item.id === currentCard.id) {
                  item.isCompletado = true;
                  currentCard.isCompletado = true;
                } else {
                  // SI NO SON IGUALES
                  setCooldown(true);
                  setTimeout(() => {
                    item.isActive = false;
                    currentCard.isActive = false;
                    setPokeList([...pokeList]);
                    setCooldown(false);
                  }, 500);
                }

                setCurrentCard(null);
              }}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

function crearLista() {
  const pokeList: number[] = [];
  const listaAleatoria: PokeCardProps[] = [];
  const numPares = 6;
  const topPoke = 1017;

  for (let index = 0; index < numPares; index++) {
    let numRand = rand(topPoke);
    while (pokeList.includes(numRand)) numRand = rand(topPoke);
    pokeList.push(numRand, numRand);
  }

  while (pokeList.length) {
    const elementoExtraido = pokeList.splice(rand(pokeList.length) - 1, 1);
    listaAleatoria.push({
      id: elementoExtraido[0],
      isActive: false,
      isCompletado: false,
    });
  }

  return listaAleatoria;
}

export default App;
