import mongoose, { Document, Schema } from "mongoose";

// extends Document adds document properties and _id
export interface MiernikItem extends Document {
  _id: string;
  name: string;
  date: Date;
  program_type: "PROGRAMOWE" | "NIEPROGRAMOWE";
  program_name: string;
  people_count: number;
  action_count: number;
}

const MiernikItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  program_type: { type: Schema.Types.ObjectId, ref: "MiernikType", required: true },
  program_name: { type: Schema.Types.ObjectId, ref: "ProgramName", required: true },
  people_count: { type: Number, required: true },
  action_count: { type: Number, required: true }
});

const MiernikItemModel = mongoose.model<MiernikItem>("MiernikItem", MiernikItemSchema, "miernik_items");

export default MiernikItemModel;
