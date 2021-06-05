
export const pageServerCallback = (cb, Page) => {
  Page.serverCallback = cb
  return Page
}
