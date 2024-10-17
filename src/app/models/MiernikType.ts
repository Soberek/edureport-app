import mongoose, { Document, Schema } from "mongoose";

export type MiernikProgramTypeValue = "PROGRAMOWE" | "NIEPROGRAMOWE";

export interface MiernikProgramType extends Document {
  name: MiernikProgramTypeValue;
}

const MiernikProgramTypeSchema: Schema = new Schema<MiernikProgramType>({
  name: { type: String, enum: ["PROGRAMOWE", "NIEPROGRAMOWE"], required: true }
});

const MiernikProgramTypeModel = mongoose.model<MiernikProgramType>("MiernikType", MiernikProgramTypeSchema, "miernik_program_types");

export default MiernikProgramTypeModel;
