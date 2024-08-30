import bcrypt from 'bcrypt'

/**
 * Generates a hashed value from a provided string and salt,
 * and optional number of rounds
 *
 * A default of 10 rounds will be used if not specified
 */
export const generateHash = async (data: string, rounds: number = 10) => {
    return bcrypt.hash(data, rounds)
}

/**
 * Compares a an unencrypted value against an encrypted value
 */
export const compareHash = async (data: string, encrypted: string) => {
    return bcrypt.compare(data, encrypted)
}
