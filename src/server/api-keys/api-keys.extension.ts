import { Prisma } from 'prisma/main/client'
import { generate } from './extensions/generate'
import { tokenLength } from 'src/server/api-keys/api-keys.tokens'

export default Prisma.defineExtension({
    name: 'apiKeys.extension',
    model: {
        apiKey: {
            generate
        }
    },
    result: {
        apiKey: {
            maskedKey: {
                needs: {
                    lastFourChars: true
                },
                compute: (key) => {
                    return key.lastFourChars.padStart(tokenLength - 4, '*')
                }
            }
        }
    }
})
