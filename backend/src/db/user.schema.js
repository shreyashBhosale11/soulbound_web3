
import {pgTable,
  serial,
   pgEnum,
  varchar,
  boolean,
  timestamp,} from "drizzle-orm/pg-core"

export const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN' , 'STUDENT']);

export const users = pgTable("users", {
    id: serial("id").primaryKey(),

    avatarUrl: varchar("avtar_url" , {length: 500}),
    avatarLocalPath: varchar("avatar_local_path", { length: 500 }),

    username: varchar("username", { length: 50 })
    .notNull()
    .unique(),

    role: userRoleEnum().notNull().default('USER'),

    email: varchar("email", { length: 255 })
    .notNull()
    .unique(),

    fullName: varchar("full_name", { length: 100 }),
    password: varchar("password", { length: 255 })
    .notNull(),

    isEmailVerified: boolean("is_email_verified")
    .default(false)
    .notNull(),

    refreshToken: varchar("refresh_token", { length: 500 }),

    forgotPasswordToken: varchar("forgot_password_token", {
    length: 255}),

    forgotPasswordExpiry: timestamp("forgot_password_expiry"),
    
    emailVerificationToken: varchar("email_verification_token", {
    length: 255, }),

    emailVerificationExpiry: timestamp("email_verification_expiry"),

    createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
    
    updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),


  }),


