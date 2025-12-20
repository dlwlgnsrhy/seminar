# Frequent Warnings & Troubleshooting

개발 중에 자주 마주치는 경고 메시지와 해결 방법을 정리했습니다.

## 1. React Keys Warning

**경고 메시지**:
`Warning: Each child in a list should have a unique "key" prop.`

**원인**:
배열을 `map()`으로 렌더링할 때, 각 요소를 식별할 수 있는 고유한 `key` prop을 주지 않았습니다.

**해결**:
데이터의 고유 ID를 `key`로 사용하세요. 인덱스(`index`)는 데이터 순서가 바뀌면 문제가 생길 수 있으므로 최후의 수단으로만 사용하세요.

```tsx
// Bad
{
  items.map((item, index) => <li key={index}>{item.name}</li>);
}

// Good
{
  items.map((item) => <li key={item.id}>{item.name}</li>);
}
```

## 2. useEffect Dependency Warning

**경고 메시지**:
`React Hook useEffect has a missing dependency: 'xxx'. Either include it or remove the dependency array.`

**원인**:
`useEffect` 내부에서 사용하는 변수나 함수가 의존성 배열(`[]`)에 빠져 있습니다.

**해결**:

- ESLint가 제안하는 대로 의존성 배열에 추가합니다.
- 만약 의존성에 추가하면 무한 루프가 발생하거나 원치 않는 실행이 된다면, 로직을 다시 점검하거나 `useCallback`, `useRef` 등을 활용해야 합니다.

## 3. DOM Property Naming

**경고 메시지**:
`Warning: Invalid DOM property 'class'. Did you mean 'className'?`

**원인**:
JSX에서는 HTML 표준 속성 이름 대신 CamelCase를 사용해야 하는 경우가 많습니다.

**해결**:

- `class` -> `className`
- `for` -> `htmlFor`
- `tabindex` -> `tabIndex`
- `onclick` -> `onClick`

## 4. Uncontrolled Input to Controlled

**경고 메시지**:
`Warning: A component is changing an uncontrolled input to be controlled.`

**원인**:
`input`의 `value`가 처음에는 `undefined`나 `null`이었다가 나중에 값이 생겼을 때 발생합니다.

**해결**:
초기값을 빈 문자열(`""`) 등으로 명확히 설정하세요.

```tsx
// Bad
const [text, setText] = useState(); // undefined

// Good
const [text, setText] = useState('');
```

## 5. Can't perform a React state update on an unmounted component

**경고 메시지**:
`Warning: Can't perform a React state update on an unmounted component.`

**원인**:
비동기 작업(API 호출 등)이 끝나기 전에 컴포넌트가 언마운트(화면에서 사라짐)되었는데, 그 후에 `setState`를 호출하려고 할 때 발생합니다.

**해결**:

- `useEffect`의 cleanup 함수에서 비동기 작업을 취소하거나,
- 마운트 상태를 체크하는 플래그를 사용합니다 (최근에는 React Query 등을 사용하여 자연스럽게 해결하는 것을 권장).
