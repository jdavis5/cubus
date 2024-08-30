import { deleteKey } from 'src/server/api-keys/api/delete-key.trpc'
import { generateKey } from 'src/server/api-keys/api/generate-key.trpc'
import { toggleKey } from 'src/server/api-keys/api/toggle-key.trpc'
import { t } from 'src/server/trpc.init'

export const apiKeys = t.router({
    deleteKey,
    generateKey,
    toggleKey
})
