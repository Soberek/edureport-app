import mongoose, { Document, Schema } from "mongoose";

export interface MiernikProgramType extends Document {
  name: string;
}

const MiernikProgramTypeSchema: Schema = new Schema({
  name: { type: String, enum: ["PROGRAMOWE", "NIEPROGRAMOWE"], required: true }
});

const MiernikProgramTypeModel = mongoose.model<MiernikProgramType>("MiernikType", MiernikProgramTypeSchema, "miernik_program_types");

export default MiernikProgramTypeModel;
