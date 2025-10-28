import cors from 'cors';

const ALLOWED_ORIGINS = ["http://localhost:5173"];

export const corsMiddleware = ({ acceptedOrigins = ALLOWED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  });
