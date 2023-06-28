interface User {
  seq: number;
  id: string;
  password: string;
}

interface Board {
  seq: number;
  title: string;
  content: string;
}

const userData: User[] = [
  {
    seq: 1,
    id: 'fisrt',
    password: 'qwe123!@#',
  },
  {
    seq: 1,
    id: 'fisrt',
    password: 'qwe123!@#',
  },
  {
    seq: 1,
    id: 'fisrt',
    password: 'qwe123!@#',
  },
];

const boardData: Board[] = [
  {
    seq: 1,
    title: '주제',
    content: 'jwt를 이용한 사용자 인증',
  },
];

export { userData, boardData };
