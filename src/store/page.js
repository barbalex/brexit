// @flow
import { action } from 'mobx'
import app from 'ampersand-app'

export default (store: Object): Object => ({
  activePage: {},
  editing: false,
  showMeta: false,
  getPage: action('getPage', async (id: string): Promise<void> => {
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
  savePage: action('savePage', async (doc: Object): Promise<void> => {
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
  addPageAttachments: action(
    'addPageAttachments',
    (doc: Object, attachments: Object): void => {
      if (!doc._attachments) doc._attachments = {}
      doc._attachments = { ...doc._attachments, ...attachments }
      store.page.savePage(doc)
    }
  ),
  removePageAttachment: action(
    'removePageAttachment',
    (doc: Object, attachmentId: string): void => {
      delete doc._attachments[attachmentId]
      store.page.savePage(doc)
    }
  ),
})
