import path from 'path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: 'file:C:/Users/HP/Desktop/Forge/forge-app/backend/prisma/forge.db'
  }
})