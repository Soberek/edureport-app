export interface MiernikItemI {
  _id: string;
  name: string;
  action_count: number;
  people_count: number;
  date: string;
  owner: string;
  program_id: { name: string; type: string };
  action_id: { name: string; id: string };
}
