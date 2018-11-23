import { UserOpdracht } from './userOpdracht';
import { Reward } from './reward';

export class User {
  _id: string;
  email: string;
  naam: string;
  type: string;
  fotoUrl: string;
  functie: string;
  wachtwoord: string;
  token: string;
  rewards: Array<Reward>;
  opdrachten: Array<UserOpdracht>;
  punten: number;
}
