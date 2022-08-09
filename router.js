export default router => router({ auth: 'required' })
  .get('/', Response.redirect('https://api.plaid.com', 302))
