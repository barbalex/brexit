// @flow
import React from 'react'
import {
  Navbar,
  NavItem,
  Nav,
  Glyphicon,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap'
import has from 'lodash/has'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import styled from 'styled-components'
import { withRouter } from 'react-router'

import oceanDarkImage from '../images/oceanDark.jpg'

const StyledNavbar = styled(Navbar)`
  margin-bottom: 0 !important;
  border-radius: 0 !important;
  background-image: url(${oceanDarkImage});
  a {
    color: #edf4f8 !important;
  }
  .navbar-brand {
    color: #edf4f8 !important;
    cursor: pointer;
  }
`

const isNavMobile = () => {
  const documentWidth = document.getElementById('root').clientWidth
  return documentWidth <= 750
}

const enhance = compose(
  inject(`store`),
  withRouter,
  withState('navExpanded', 'changeNavExpanded', false),
  withHandlers({
    onToggleNav: props => () => {
      const navIsMobile = isNavMobile()
      // toggle only if nav is in mobile mode
      if (navIsMobile) props.changeNavExpanded(!props.navExpanded)
    },
  }),
  withHandlers({
    onClickEvents: props => () => {
      props.store.page.getPage('pages_events')
      props.history.push('/events')
      // if home was clicked, do not toggle nav
    },
    onClickCommentaries: props => () => {
      props.store.page.getPage('pages_commentaries')
      props.history.push('/commentaries')
      props.onToggleNav()
    },
    onClickActors: props => () => {
      props.store.page.getPage('pages_actors')
      props.history.push('/actors')
      props.onToggleNav()
    },
    onClickPublications: props => () => {
      props.store.page.getPage('pages_publications')
      props.history.push('/publications')
      props.onToggleNav()
    },
    onClickLinks: props => () => {
      props.store.page.getPage('pages_links')
      props.history.push('/links')
      props.onToggleNav()
    },
    onClickAboutUs: props => () => {
      props.store.page.getPage('pages_aboutUs')
      props.history.push('/aboutUs')
      props.onToggleNav()
    },
    onClickEdit: props => () => {
      props.store.toggleEditing()
      props.onToggleNav()
    },
    onClickLogout: props => () => {
      props.store.login.logout()
      props.onToggleNav()
      // need to force update
    },
    onClickNewCommentary: props => () =>
      props.store.commentaries.toggleShowNewCommentary(),
    onClickNewPublication: props => () => {
      props.store.publications.setShowNewPublication(true)
    },
    onClickNewEvent: props => () => props.store.events.setShowNewEvent(true),
    onClickNewActor: props => () => props.store.actors.setShowNewActor(true),
  }),
  observer
)

const MyNavbar = ({
  store,
  match,
  location,
  history,
  navExpanded,
  onToggleNav,
  onClickEvents,
  onClickCommentaries,
  onClickActors,
  onClickPublications,
  onClickLinks,
  onClickAboutUs,
  onClickEdit,
  onClickLogout,
  onClickNewCommentary,
  onClickNewPublication,
  onClickNewEvent,
  onClickNewActor,
}: {
  store: Object,
  match: Object,
  location: Object,
  history: Object,
  navExpanded: boolean,
  onToggleNav: () => void,
  onClickEvents: () => void,
  onClickCommentaries: () => void,
  onClickActors: () => void,
  onClickPublications: () => void,
  onClickLinks: () => void,
  onClickAboutUs: () => void,
  onClickEdit: () => void,
  onClickLogout: () => void,
  onClickNewCommentary: () => void,
  onClickNewPublication: () => void,
  onClickNewEvent: () => void,
  onClickNewActor: () => void,
}) => {
  const { activePage } = store.page
  const { activeActor } = store.actors
  const { activeMonthlyEvent } = store.monthlyEvents
  const { activePublication } = store.publications
  const { activeCommentary } = store.commentaries
  const email = store.login.email
  const glyph = store.editing ? 'eye-open' : 'pencil'
  const id = activePage && activePage._id ? activePage._id : null
  const nonEditableIds = [
    'pages_commentaries',
    'pages_monthlyEvents',
    'pages_publications',
    'pages_actors',
    'pages_events',
  ]
  const showEdit =
    email &&
    (!nonEditableIds.includes(id) ||
      has(activeMonthlyEvent, '_id') ||
      has(activeCommentary, '_id') ||
      has(activeActor, '_id') ||
      has(activePublication, '_id'))
  const showAddCommentary = email && activePage._id === 'pages_commentaries'
  const showAddEvent = email && activePage._id === 'pages_events'
  const showAddActor = email && activePage._id === 'pages_actors'
  const showAddPublication = email && activePage._id === 'pages_publications'
  const showNavbarRight =
    email || showEdit || showAddCommentary || showAddEvent || showAddActor

  return (
    <StyledNavbar
      id="nav-wrapper"
      inverse
      fixedTop
      expanded={navExpanded}
      onToggle={onToggleNav}
    >
      <Navbar.Header>
        <Navbar.Brand onClick={onClickEvents}>Events</Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem
            active={id === 'pages_commentaries'}
            onClick={onClickCommentaries}
          >
            Commentaries
          </NavItem>
          <NavItem active={id === 'pages_actors'} onClick={onClickActors}>
            Actors
          </NavItem>
          <NavItem
            active={id === 'pages_publications'}
            onClick={onClickPublications}
          >
            Publications
          </NavItem>
          <NavItem active={id === 'pages_links'} onClick={onClickLinks}>
            Links
          </NavItem>
          <NavItem active={id === 'pages_aboutUs'} onClick={onClickAboutUs}>
            About us
          </NavItem>
        </Nav>
        {showNavbarRight &&
          <Nav navbar pullRight>
            {showEdit &&
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id={store.editing ? 'preview' : 'edit'}>
                    {store.editing ? 'preview' : 'edit'}
                  </Tooltip>
                }
              >
                <NavItem onClick={onClickEdit}>
                  <Glyphicon glyph={glyph} />
                </NavItem>
              </OverlayTrigger>}
            {showAddCommentary &&
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="newCommentary">new commentary</Tooltip>}
              >
                <NavItem onClick={onClickNewCommentary}>
                  <Glyphicon glyph="plus" />
                </NavItem>
              </OverlayTrigger>}
            {showAddEvent &&
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="newEvent">new event</Tooltip>}
              >
                <NavItem onClick={onClickNewEvent}>
                  <Glyphicon glyph="plus" />
                </NavItem>
              </OverlayTrigger>}
            {showAddActor &&
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="newActor">new actor</Tooltip>}
              >
                <NavItem onClick={onClickNewActor}>
                  <Glyphicon glyph="plus" />
                </NavItem>
              </OverlayTrigger>}
            {showAddPublication &&
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="newPublication">new publication</Tooltip>}
              >
                <NavItem onClick={onClickNewPublication}>
                  <Glyphicon glyph="plus" />
                </NavItem>
              </OverlayTrigger>}
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="logout">log out</Tooltip>}
            >
              <NavItem onClick={onClickLogout}>
                <Glyphicon glyph="log-out" />
              </NavItem>
            </OverlayTrigger>
          </Nav>}
      </Navbar.Collapse>
    </StyledNavbar>
  )
}

MyNavbar.displayName = 'Navbar'

export default enhance(MyNavbar)
