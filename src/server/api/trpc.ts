/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { db } from "~/server/db";
import { decodeJwt, type Session } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs"
import { type NextRequest } from "next/server";
/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */

interface CreateContextOptions {
  headers: Headers;
  session: Session | null;
}
export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    headers: opts.headers,
    db,
    session: opts.session,
  };
};
export const createTRPCContext = async (opts: { req: NextRequest }) => {
  const sessionToken = opts.req.cookies.get("__session")?.value ?? "";

  try {
    // Decode the JWT to get the session ID
    const decodedJwt = decodeJwt(sessionToken);

    // Verify the session with Clerk to get the session object
    const verifiedSession = await clerkClient.sessions.getSession(decodedJwt.payload.sid)

    // If the session is valid, return a context with the session
    return createInnerTRPCContext({
      headers: opts.req.headers,
      session: verifiedSession,
    });
  } catch (error) {
    console.log(error);
  }

  // If the session is invalid, return a context with no session
  return createInnerTRPCContext({
    headers: opts.req.headers,
    session: null,
  });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */
export const middleware = t.middleware

const isAuth = middleware(async ({ ctx, next }) => {
  try{
    if(!ctx.session){
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    const user = await clerkClient.users.getUser(ctx.session.userId)
    const isAdmin = (user?.publicMetadata.role as string)?.includes('admin')
    return next({
      ctx: {
        session: ctx.session,
        isAdmin: isAdmin
      }
    })
  }catch (error: any) {
    throw new TRPCError({ code: error.message})
  }
})

const isAdmin = middleware(async ({ ctx, next }) => {
  try{
    // @ts-expect-error
    if(!ctx.isAdmin){
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return (await next({ ctx }))
  }catch (error: any) {
    throw new TRPCError({ code: error.message})
  }
})





/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const protectedProcedure = t.procedure.use(isAuth);
export const adminProcedure = t.procedure.use(isAuth).use(isAdmin);
export const publicProcedure = t.procedure;
