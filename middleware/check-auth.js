export default function (context) {
  console.log('[middleware] check-auth')
  console.log('[middleware] check-auth client', process.client)
  context.store.dispatch('initAuth', context.req)
}
