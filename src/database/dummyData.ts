import { UserDto } from './userDto';
import { BoardDto } from './boardDto';

const userData: UserDto[] = [
  {
    seq: 1,
    id: 'first',
    password: 'qwe123!@#',
  },
  {
    seq: 2,
    id: 'second',
    password: 'qwe123!@#',
  },
  {
    seq: 3,
    id: 'third',
    password: 'qwe123!@#',
  },
];

const boardData: BoardDto[] = [
  {
    seq: 1,
    title: '주제',
    content: 'jwt를 이용한 사용자 인증',
  },
];

export { userData, boardData };
