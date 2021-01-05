//
import React, { useState, useCallback, useContext } from 'react'
import {
  Navbar,
  NavItem,
  Nav,
  Glyphicon,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap'
import has from 'lodash/has'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { navigate } from '@reach/router'

import constants from '../../modules/constants'
import downloadEvents from '../../modules/downloadEvents'
import storeContext from '../../storeContext'

const StyledNavbar = styled(Navbar)`
  margin-bottom: 0 !important;
  border-radius: 0 !important;
  background-color: ${constants.panelColor} !important;

  p,
  div {
    font-size: medium;
  }
  a {
    color: #edf4f8 !important;
  }
  .navbar-brand {
    color: #edf4f8 !important;
    cursor: pointer;
  }
  .navbar-nav .active a {
    background-color: ${constants.panelColorActive} !important;
  }
`

const isNavMobile = () => {
  if (typeof window === `undefined`) return 750
  const documentWidth = document.getElementById('___gatsby').clientWidth
  return documentWidth <= 750
}

const MyNavbar = ({ match, location }) => {
  const store = useContext(storeContext)
  const {
    page,
    articles,
    actors,
    events,
    login,
    editing,
    toggleEditing,
  } = store
  const { setShowNewEvent } = events
  const { setShowNewActor } = actors
  const { activePage } = page
  const { activeActor } = actors
  const { activeArticle } = articles
  const email = login.email
  const glyph = editing ? 'eye-open' : 'pencil'
  const id = activePage && activePage._id ? activePage._id : null
  const nonEditableIds = ['pages_commentaries', 'pages_actors', 'pages_events']
  const showEdit =
    email &&
    (!nonEditableIds.includes(id) ||
      has(activeArticle, '_id') ||
      has(activeActor, '_id'))
  const showAddArticle = email && activePage._id === 'pages_commentaries'
  const showAddEvent = email && activePage._id === 'pages_events'
  const showAddActor = email && activePage._id === 'pages_actors'
  const showNavbarRight =
    email || showEdit || showAddArticle || showAddEvent || showAddActor
  const [navExpanded, setNavExpanded] = useState(false)
  const onToggleNav = useCallback(() => {
    const navIsMobile = isNavMobile()
    // toggle only if nav is in mobile mode
    if (navIsMobile) setNavExpanded(!navExpanded)
  }, [navExpanded])
  const onClickEvents = useCallback(() => {
    page.getPage('pages_events')
    navigate('/')
    // if home was clicked, do not toggle nav
  }, [page])
  const onClickArticles = useCallback(() => {
    page.getPage('pages_commentaries')
    navigate('/articles')
    onToggleNav()
  }, [onToggleNav, page])
  const onClickActors = useCallback(() => {
    page.getPage('pages_actors')
    navigate('/actors')
    onToggleNav()
  }, [onToggleNav, page])
  const onClickLinks = useCallback(() => {
    page.getPage('pages_links')
    navigate('/links')
    onToggleNav()
  }, [onToggleNav, page])
  const onClickAboutUs = useCallback(() => {
    page.getPage('pages_aboutUs')
    navigate('/about-us')
    onToggleNav()
  }, [onToggleNav, page])
  const onClickEdit = useCallback(() => {
    toggleEditing()
    onToggleNav()
  }, [onToggleNav, toggleEditing])
  const onClickLogout = useCallback(() => {
    login.logout()
    onToggleNav()
    // need to force update
  }, [login, onToggleNav])
  const onClickDownloadEvents = useCallback(() => {
    downloadEvents(store)
    onToggleNav()
  }, [onToggleNav, store])
  const onClickNewArticle = useCallback(() => articles.toggleShowNewArticle(), [
    articles,
  ])
  const onClickNewEvent = useCallback(() => setShowNewEvent(true), [
    setShowNewEvent,
  ])
  const onClickNewActor = useCallback(() => setShowNewActor(true), [
    setShowNewActor,
  ])

  return (
    <StyledNavbar
      id="nav-wrapper"
      inverse
      fixedTop
      expanded={navExpanded}
      onToggle={onToggleNav}
    >
      <Navbar.Header>
        <Navbar.Brand onClick={onClickEvents}>Chronology</Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem
            active={id === 'pages_commentaries'}
            onClick={onClickArticles}
          >
            My Articles
          </NavItem>
          <NavItem active={id === 'pages_actors'} onClick={onClickActors}>
            Actors
          </NavItem>
          <NavItem active={id === 'pages_links'} onClick={onClickLinks}>
            Links
          </NavItem>
          <NavItem active={id === 'pages_aboutUs'} onClick={onClickAboutUs}>
            About us
          </NavItem>
        </Nav>
        {showNavbarRight && (
          <Nav navbar pullRight>
            {showEdit && (
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id={editing ? 'preview' : 'edit'}>
                    {editing ? 'preview' : 'edit'}
                  </Tooltip>
                }
              >
                <NavItem onClick={onClickEdit}>
                  <Glyphicon glyph={glyph} />
                </NavItem>
              </OverlayTrigger>
            )}
            {showAddArticle && (
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="newArticle">new article</Tooltip>}
              >
                <NavItem onClick={onClickNewArticle}>
                  <Glyphicon glyph="plus" />
                </NavItem>
              </OverlayTrigger>
            )}
            {showAddEvent && (
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="newEvent">new event</Tooltip>}
              >
                <NavItem onClick={onClickNewEvent}>
                  <Glyphicon glyph="plus" />
                </NavItem>
              </OverlayTrigger>
            )}
            {showAddActor && (
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="newActor">new actor</Tooltip>}
              >
                <NavItem onClick={onClickNewActor}>
                  <Glyphicon glyph="plus" />
                </NavItem>
              </OverlayTrigger>
            )}
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="logout">log out</Tooltip>}
            >
              <NavItem onClick={onClickLogout}>
                <Glyphicon glyph="log-out" />
              </NavItem>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="downloadevents">download events</Tooltip>}
            >
              <NavItem onClick={onClickDownloadEvents}>
                <Glyphicon glyph="save" />
              </NavItem>
            </OverlayTrigger>
          </Nav>
        )}
      </Navbar.Collapse>
    </StyledNavbar>
  )
}

MyNavbar.displayName = 'Navbar'

export default observer(MyNavbar)
