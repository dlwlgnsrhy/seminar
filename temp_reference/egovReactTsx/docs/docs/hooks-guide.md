# React Hooks Guide

이 문서는 React의 내장 Hook들을 올바르게 사용하는 방법에 대한 가이드입니다.

## 1. useState

상태(State)를 관리할 때 사용합니다.

```tsx
const [count, setCount] = useState<number>(0);
```

### 주의사항

- **불변성 유지**: 객체나 배열을 업데이트할 때는 새로운 복사본을 만들어야 합니다.

  ```tsx
  // Bad
  state.value = 1;
  setState(state);

  // Good
  setState({ ...state, value: 1 });
  ```

- **비동기 업데이트**: `setState`는 비동기로 동작할 수 있습니다. 이전 상태에 의존한다면 함수형 업데이트를 사용하세요.
  ```tsx
  setCount((prev) => prev + 1);
  ```

## 2. useEffect

사이드 이펙트(데이터 가져오기, 구독 설정, 수동 DOM 조작 등)를 처리할 때 사용합니다.

```tsx
useEffect(() => {
  // 실행될 코드
  console.log('Mounted or Updated');

  return () => {
    // 정리(Cleanup) 코드
    console.log('Unmounted');
  };
}, [dependency]); // 의존성 배열
```

### 의존성 배열 (Dependency Array)

- `[]`: 마운트 시 한 번만 실행 (componentDidMount)
- `[prop, state]`: 해당 값이 변경될 때마다 실행 (componentDidUpdate)
- **생략**: 매 렌더링마다 실행 (권장하지 않음)

## 3. useMemo

비용이 많이 드는 계산 결과를 메모이제이션(캐싱)하여 성능을 최적화합니다.

```tsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

- `a` 또는 `b`가 변경될 때만 재계산합니다.
- **주의**: 모든 계산에 `useMemo`를 남발하면 메모리 사용량이 늘어나므로, 실제로 비용이 큰 계산에만 사용하세요.

## 4. useCallback

함수 정의를 메모이제이션하여, 자식 컴포넌트에 props로 전달할 때 불필요한 리렌더링을 방지합니다.

```tsx
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

- `React.memo`로 감싸진 자식 컴포넌트에 함수를 전달할 때 유용합니다.

## 5. useRef

DOM 요소에 직접 접근하거나, 렌더링을 유발하지 않는 가변 값을 저장할 때 사용합니다.

```tsx
const inputRef = useRef<HTMLInputElement>(null);

const focusInput = () => {
  inputRef.current?.focus();
};

return <input ref={inputRef} />;
```

- `useRef`로 저장된 값(`current`)이 변경되어도 컴포넌트는 리렌더링되지 않습니다.

## 6. useContext

전역 상태(Theme, User Info 등)를 컴포넌트 트리 깊숙이 전달할 때 사용합니다.

```tsx
const value = useContext(MyContext);
```

- Context API와 함께 사용됩니다.
- **주의**: Context 값이 변경되면 해당 Context를 사용하는 모든 컴포넌트가 리렌더링됩니다.

## 7. Custom Hooks

반복되는 로직을 재사용하기 위해 직접 Hook을 만들 수 있습니다. 이름은 반드시 `use`로 시작해야 합니다.

```tsx
function useWindowSize() {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
```
