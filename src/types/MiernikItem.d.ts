export interface MiernikItemI {
  _id: string;
  name: string;
  actionCount: number;
  peopleCount: number;
  date: string;
  owner: string;
  programId: { name: string; type: string };
  actionId: { name: string; id: string };
}
