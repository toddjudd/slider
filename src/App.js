import { useAtom } from 'jotai';

const App = (props) => {
  const { countAtom, maxCountAtom } = props.atoms;
  const [count, setCount] = useAtom(countAtom);
  const [maxCount, setMaxCount] = useAtom(maxCountAtom);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </>
  );
};

export default App;
