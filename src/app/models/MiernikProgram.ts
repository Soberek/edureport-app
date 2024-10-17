import mongoose, { Document, Schema } from "mongoose";

export interface ProgramName extends Document {
  _id: string;
  name: string;
}

const ProgramNameSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: Schema.Types.ObjectId, ref: "MiernikType", required: true }
});

const MiernikProgramNameModel = mongoose.model<ProgramName>("ProgramName", ProgramNameSchema, "miernik_program_names");

export default MiernikProgramNameModel;
