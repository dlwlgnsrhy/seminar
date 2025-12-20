import React from 'react';
import { useQuery } from '@tanstack/react-query';
// import http from "@/api/http";

type User = { id: string; name: string };

// test data
const mockUsers: User[] = [
  { id: '1', name: '홍길동' },
  { id: '2', name: '김철수' },
  { id: '3', name: '이영희' },
];

const fetchUsers = async (): Promise<User[]> => {
  // const res = await http.get("/users");
  // BE 타입에 맞춰 수정 가능 res.data.data, res.data.content
  // return res.data?.data ?? res.data;

  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUsers), 30); // 테스트 환경에 최적화
  });
};

export default function ProfilePage() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery<User[]>({ queryKey: ['users'], queryFn: fetchUsers });

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users...</p>;

  return (
    <ul>
      {data.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
