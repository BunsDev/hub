import { getDB } from "../db";

export enum AddressesTypes {
  ETHEREUM = 1,
}

const { db } = getDB()

export class User {
  public static async findOrCreate(did: string) {
    const connection = await db.connect()
    try {
      await connection.oneOrNone(
        "INSERT INTO users (id) VALUES ($1) ON CONFLICT (id) DO NOTHING RETURNING *",
        [did]
      );
    } catch (error) {
      console.log("Error on method: User.findOrCreate -> ", error.message);
      throw new Error(error);
    }
  }
}