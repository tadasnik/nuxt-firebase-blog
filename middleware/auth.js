export default function (context) {
  console.log('[middleware] just auth')
  console.log('[middleware] is auth?:', context.store.getters.isAuthenticated)
  if (!context.store.getters.isAuthenticated) {
    console.log('[middleware] redirecting')
    context.redirect('/admin/auth')
    
  }
}
