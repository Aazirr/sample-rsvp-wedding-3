import { customAlphabet } from "nanoid";

// URL-safe alphabet, no lookalike chars (0/O, 1/I/l)
const alphabet = "23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ";
const generate = customAlphabet(alphabet, 12);

export function generateToken(): string {
  return generate();
}
