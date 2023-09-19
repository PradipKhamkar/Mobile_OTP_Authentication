import mongoose from "mongoose";
const connectionString: string = process.env.DB_URI || "";

const configDb = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log(`Database configurations success 🗳`);
  } catch (error: any) {
    console.log("failed to Database Configurations 😞");
  }
};

export default configDb;
