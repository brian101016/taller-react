import { useEffect, useRef, useState } from "react";
import PokeCard, { PokeCardProps } from "./components/PokeCard";
import { rand } from "./scripts/funcRandom";

function App() {
  const [pokeList, setPokeList] = useState<PokeCardProps[]>(crearLista());
  const [currentCard, setCurrentCard] = useState<PokeCardProps | null>(null);
  const [cooldown, setCooldown] = useState(false);

  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (currentCard === null) {
      const porTerminar = pokeList.some((item) => !item.isCompletado);
      if (!porTerminar) {
        setTimeout(() => {
          ref.current?.click();
        }, 1000);
      }
    }
  }, [pokeList, currentCard]);

  return (
    <div className="memorama">
      <h1>Selecciona un pokémon...</h1>

      <button
        ref={ref}
        onClick={() => {
          setPokeList(crearLista());
          setCooldown(false);
          setCurrentCard(null);
        }}
      >
        Reiniciar
      </button>

      <div className="cards-container">
        {pokeList.map((item, index) => {
          return (
            <PokeCard
              id={item.id}
              isActive={item.isActive}
              isCompletado={item.isCompletado}
              onClick={() => {
                if (item.isCompletado || cooldown) return;

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
                  }, 700);
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
