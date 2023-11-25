import PokeCard from "./components/PokeCard";
import { rand } from "./scripts/funcRandom";

function App() {
  const pokeList: number[] = [];
  const listaAleatoria: number[] = [];
  const numPares = 6;
  const topPoke = 1017;

  for (let index = 0; index < numPares; index++) {
    let numRand = rand(topPoke);
    while (pokeList.includes(numRand)) numRand = rand(topPoke);
    pokeList.push(numRand, numRand);
  }

  while (pokeList.length) {
    const elementoExtraido = pokeList.splice(rand(pokeList.length) - 1, 1);
    listaAleatoria.push(elementoExtraido[0]);
  }

  return (
    <div className="memorama">
      <div className="cards-container">
        {listaAleatoria.map((item, index) => {
          return <PokeCard id={item} key={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
