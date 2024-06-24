/**
 * Basic Hooks:
 *  useState
 *  useEffect
 *  useContext
 * Additional Hooks:
 *  useReducer
 *  useCallback
 *  useMemo
 *  useRef
 *  useImperativeHandle
 *  useLayoutEffect
 *  useDebugValue
 */

// state (or data that changes during the application) lived in a class constructor
// hooks remove reactivity from components
    // however, they only work on their own, within a functional component (don't work inside of const functions or onClick or anything else)

const [count, setCount] = useState(0) // when data changes, automatically re-render the UI

// Component Life Cycle
    // component is added to the document (mounted/initalized/on)
    // component is updated (state is updated or changed, which can happen multiple times)
    // component is destroyed (unmounted/off)
useEffect(() => {

}, [count])
// takes a function that you define as its first argument (runs when first mounted, and everytime the state changes)
// an empty array of dependencies means that useEffect() will only run once (when its first initialized)
// the return is the teardown code that runs before the component is removed from the UI

// the React context API allows you to share data without passing props
const moods = {
    happy: "happy",
    sad: "sad"
}
const MoodContext = createContext(moods);
function App(props) {
    return (
        <MoodContext.Provider value={moods.happy}>
            <MoodDescription />
        </MoodContext.Provider>
    );
}
function MoodDescription() {
    const mood = useContext(MoodContext);

    return <p>{ mood }</p>
}

// useReducer() - a different way to manage state using the redux pattern (more complicated at first, but can help to manage complexity later on)
    // dispatch actions that go to a reducer function --> the reducer function determines what to do
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
        default:
            throw new Error();
    }
}
function App() {
    const [state, dispatch] = useReducer(reducer, 0);
    return (
        <>
            Count: { state }
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </>
    );
}