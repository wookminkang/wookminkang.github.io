# React Query

React Query는 **서버 상태(server state)**를 쉽게 다룰 수 있도록 도와주는 라이브러리다.  
전통적인 글로벌 상태관리 (예: Redux)와는 다르게, **비동기 요청(fetching)**과 **캐싱**, **동기화**, **리트라이**, **로딩/에러 상태 관리** 등을 기본적으로 제공한다.

단순히 "데이터를 가져온다"가 아니라,  
**데이터를 관리하고 최적화해서 사용자 경험을 높이는 도구**라고 보면 됨.



## 설치
```javascript
npm install @tanstack/react-query

// App.tsx or index.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


//프로바이더 세팅
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyComponent />
    </QueryClientProvider>
  )
}

```

## 데이타 불러오기 - useQuery
```javascript

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchUsers = async () => {
  const { data } = await axios.get('/api/users')
  return data
}

function MyComponent() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  })

  if (isLoading) return <div>로딩 중...</div>
  if (isError) return <div>에러 발생</div>

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}


```



## 데이타 변경 - useMutation

```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query'

const postUser = (user) => axios.post('/api/users', user)

function AddUserForm() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      // 기존 'users' 캐시 무효화 → refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const handleSubmit = () => {
    mutation.mutate({ name: '새 유저' })
  }

  return (
    <button onClick={handleSubmit}>추가하기</button>
  )
}



```



## React Query의 역할

| 기능                    | 설명                                              |
| --------------------- | ----------------------------------------------- |
| **데이터 캐싱**            | 동일한 요청은 캐시를 사용해서 빠르게 응답                         |
| **자동 리페치**            | staleTime, refetchInterval 등으로 데이터 최신화          |
| **로딩 / 에러 상태 관리**     | `isLoading`, `isError`, `isSuccess` 같은 상태 자동 제공 |
| **전역 상태처럼 사용 가능**     | 여러 컴포넌트에서 같은 쿼리 공유 가능                           |
| **Optimistic Update** | 실제 서버 응답 전에 UI를 먼저 업데이트 가능 (낙관적 업데이트)           |
| **백그라운드 리페치**         | 탭 포커스 이동 시 자동으로 최신 데이터 요청                       |





## 추가로 알면 좋은 포인트


* staleTime: 데이터가 신선한 상태로 유지되는 시간

* cacheTime: 사용하지 않더라도 메모리에 남아있는 시간

`devtools`도 있음 개발 환경에서 쿼리 상태를 확인할 수 있는 도구

```bash
  npm install @tanstack/react-query-devtools
```

```javascript
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>

```