import { atom, useAtom } from 'jotai';

const App = (props) => {
  const [count, setCount] = useAtom(props.countAtom);
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </>
  );
};

export default App;
