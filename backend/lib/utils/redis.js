import dotenv from "dotenv";
import { Redis } from '@upstash/redis'

dotenv.config();

export const redis = Redis.fromEnv();
