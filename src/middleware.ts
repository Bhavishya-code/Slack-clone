import { convexAuthNextjsMiddleware, 
  createRouteMatcher, 
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect
} from "@convex-dev/auth/nextjs/server";
 

const isPublicPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(  async (request)=> {
  
  const isAuthenticated = await isAuthenticatedNextjs(); 

  if(!isPublicPage(request) &&   !isAuthenticated){
     return nextjsMiddlewareRedirect(request, "/auth");
  }
  // Redirect user away from "/auth" if authenticated
  if(isPublicPage(request) &&  isAuthenticated){
    return nextjsMiddlewareRedirect(request, "/");
 }
});
 
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};


