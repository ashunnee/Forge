import path from 'path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: 'postgresql://postgres:ialwaysforgetmypassword@db.bjxezdpwmjdsfnbesmxy.supabase.co:5432/postgres'
  }
})