//
import { action } from 'mobx'
import app from 'ampersand-app'
import moment from 'moment'
import slug from 'speakingurl'
import { navigate } from '@reach/router'

import getArticles from '../modules/getArticles'
import getPathFromDocId from '../modules/getPathFromDocId'
import sortArticles from '../modules/sortArticles'
import slugOptions from '../modules/slugOptions'

export default store => ({
  articles: [],

  // cache the id, not the entire doc
  // advantage: on first load articles is empty so no activeArticle can be gotten
  // but if id is used, this can be cached
  activeArticleId: null,

  get activeArticle() {
    return store.articles.articles.find(
      article => article._id === store.articles.activeArticleId,
    )
  },

  getArticlesCallback: null,

  getArticles: action('getArticles', async () => {
    try {
      const articles = await getArticles(store)
      store.articles.articles = articles
      if (store.articles.getArticlesCallback) {
        store.articles.getArticlesCallback()
        store.articles.getArticlesCallback = null
      }
    } catch (error) {
      store.error.showError({
        msg: error,
      })
    }
  }),

  showNewArticle: false,

  toggleShowNewArticle: action(
    'toggleShowNewArticle',
    () => (store.articles.showNewArticle = !store.articles.showNewArticle),
  ),

  newArticle: action('newArticle', (title, date) => {
    const year = moment(date).year()
    const month = moment(date).format('MM')
    const day = moment(date).format('DD')
    const titleSlugified = slug(title, slugOptions)
    const _id = `commentaries_${year}_${month}_${day}_${titleSlugified}`
    const draft = true
    const article = 'IA=='
    const type = 'article'
    const articleO = { _id, title, draft, article, type }
    store.articles.saveArticle(articleO)
  }),

  getArticle: action('getArticle', id => {
    if (!id) {
      navigate('/articles')
      store.articles.activeArticleId = null
    } else {
      store.articles.activeArticleId = id
      const path = getPathFromDocId(id)
      navigate(`/${path}`)
    }
  }),

  updateArticlesInCache: action('updateArticlesInCache', article => {
    // first update the article in store.articles.articles
    store.articles.articles = store.articles.articles.filter(
      c => c._id !== article._id,
    )
    store.articles.articles.push(article)
    store.articles.articles = sortArticles(store.articles.articles)
  }),

  revertCache: action('revertCache', (oldArticles, oldActiveArticleId) => {
    store.articles.articles = oldArticles
    store.articles.activeArticleId = oldActiveArticleId
  }),

  saveArticle: action('saveArticle', async article => {
    // keep old cache in case of error
    const oldArticles = store.articles.articles
    const oldActiveArticleId = store.articles.activeArticleId
    // optimistically update in cache
    store.articles.updateArticlesInCache(article)
    try {
      const resp = await app.db.put(article)
      // resp.rev is new rev
      article._rev = resp.rev
      // definitely update in cache
      store.articles.updateArticlesInCache(article)
    } catch (error) {
      store.articles.revertCache(oldArticles, oldActiveArticleId)
      store.error.showError({
        title: 'Error saving article:',
        msg: error,
      })
    }
  }),

  removeArticleFromCache: action('removeArticleFromCache', article => {
    // first update the article in store.articles.articles
    store.articles.articles = store.articles.articles.filter(
      thisArticle => thisArticle._id !== article._id,
    )
    store.articles.articles = sortArticles(store.articles.articles)
    // now update store.articles.activeArticleId if it is the active article's _id
    const isActiveArticle = store.articles.activeArticleId === article._id
    if (isActiveArticle) store.articles.activeArticleId = null
  }),

  removeArticle: action('removeArticle', article => {
    // keep old cache in case of error
    const oldArticles = store.articles.articles
    const oldActiveArticleId = store.articles.activeArticleId
    // optimistically remove event from cache
    store.articles.removeArticleFromCache(article)
    app.db.remove(article).catch(error => {
      // oops. Revert optimistic removal
      store.articles.revertCache(oldArticles, oldActiveArticleId)
      store.error.showError({
        title: 'Error removing article:',
        msg: error,
      })
    })
  }),

  articleToRemove: null,

  setArticleToRemove: action('setArticleToRemove', article => {
    store.articles.articleToRemove = article
  }),

  toggleDraftOfArticle: action('toggleDraftOfArticle', article => {
    if (article.draft === true) {
      delete article.draft
    } else {
      article.draft = true
    }
    store.articles.saveArticle(article)
  }),
})
