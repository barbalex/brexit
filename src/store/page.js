//
import { action } from 'mobx'
import app from 'ampersand-app'

export default store => ({
  activePage: {},
  editing: false,
  showMeta: false,
  getPage: action('getPage', async id => {
    const get =
      !store.page.activePage._id ||
      (store.page.activePage._id && store.page.activePage._id !== id)
    if (get) {
      try {
        const doc = await app.db.get(id, { include_docs: true })
        store.page.activePage = doc
      } catch (error) {
        store.error.showError({
          title: `Error loading ${id}:`,
          msg: error,
        })
      }
    }
  }),
  savePage: action('savePage', async doc => {
    try {
      const resp = await app.db.put(doc)
      // resp.rev is new rev
      doc._rev = resp.rev
      store.page.activePage = doc
      // get doc again -
      // otherwise removing attachment does not update
      store.page.activePage = await app.db.get(doc._id)
    } catch (error) {
      store.error.showError({
        title: 'Error saving page:',
        msg: error,
      })
    }
  }),
  // see: http://pouchdb.com/api.html#save_attachment > Save many attachments at once
  addPageAttachments: action('addPageAttachments', (doc, attachments) => {
    if (!doc._attachments) doc._attachments = {}
    doc._attachments = { ...doc._attachments, ...attachments }
    store.page.savePage(doc)
  }),
  removePageAttachment: action('removePageAttachment', (doc, attachmentId) => {
    delete doc._attachments[attachmentId]
    store.page.savePage(doc)
  }),
})
