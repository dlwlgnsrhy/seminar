# 상태 관리 전략 (React Baseline v1)

---

## 1. 설계 철학

> "서버 상태는 React Query, 클라이언트 상태는 React 자체로."
> Redux는 필요할 때만 -- '선택적 확장'으로 둔다.

---

## 2. 상태의 분류

| 유형                     | 예시                                    | 도구                  | 저장 위치              |
| ------------------------ | --------------------------------------- | --------------------- | ---------------------- |
| **서버 상태**            | 사용자 목록, 게시글, 통계 등 API 데이터 | TanStack Query        | 캐시 (메모리/스토리지) |
| **클라이언트 전역 상태** | 로그인 세션, 다크모드, 토스트           | React Context         | 전역 Store             |
| **지역 상태(Local)**     | 모달 열림, 입력값, 임시 필드            | useState / useReducer | 컴포넌트 내부          |

---

## 3. 서버 상태 (React Query 표준)

### `src/app/providers/QueryProvider.tsx`

```tsx
import { QueryClient, QueryProvider } from '@tanstck/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
```

### `src/lib/hooks/useQueryClient.ts`

```ts
import { useQueryClinet } from '@tanstack/react-query';
export default function useAppQueryClinet() {
  const client = useQueryClient();
  return client;
}
```

### `src/api/user.api.ts`

```ts
import http from './http';
export const getUsers = () => http.get('/users');
```

### `src/pages/users/UserListPage.tsx`

```tsx
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/api/user.api';

export default function UserListPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <ul>
      {data?.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

---

## 4. 클라이언트 상태 (Zustand 표준)

초기에는 React Context나 useState로 충분하지만, 전역 상태가 필요할 경우 **Zustand**를 사용한다.
Redux는 보일러플레이트가 과도하므로 지양한다.

### `src/app/core/store/useAppStore.ts`

```ts
import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
```

### 사용 예시

```tsx
import { useAppStore } from '@/app/core/store/useAppStore';

function ThemeToggler() {
  const { theme, toggleTheme } = useAppStore();
  return <button onClick={toggleTheme}>{theme}</button>;
}
```

> "작은 앱에선 Redux가 아니라 Query와 Context/Zustand만으로 충분"

---

## 5. 상태관리 예외 및 팁

- **React Query 캐시에 클라이언트 상태를 섞지 말 것**
- Query Key는 항상 배열로 `[도메인, 식별자]`
- 쿼리 실패 시 에러 매핑 (`errorMap.ts`)으로 UX 메시지 변환
- Mutation은 항상 옵티미스틱 업데이트 설계 (rollback 준비)
- 필요 시 `onError` / `onSuccess` 에서 토스트 등 부수효과 처리
