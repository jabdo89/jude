import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@common/box';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Typography from '@common/typography';
import NavbarActionPortal from '@templates/navbar-action-portal';
import SearchBar from './components/search-bar';
import ConversationCard from './components/conversation-card';
import ChatContent from './components/chat-content';
import { Container, Column, ListContainer } from './elements';

class Messages extends Component {
  state = {
    actualChat: null,
    currentUser: null,
    jobOfferFilter: ''
  };

  setActualChat = (idx, studentID) => {
    const { Conversations } = this.props;
    const { Usuarios } = this.props;
    this.setState({ actualChat: Conversations[idx] });
    this.setState({ currentUser: Usuarios[studentID] });
  };

  updatejobOfferFilter = filter => {
    this.setState({ jobOfferFilter: filter });
  };

  render() {
    let { Conversations } = this.props;
    const { Usuarios, JobOffers, JobOffersArray } = this.props;
    if (Conversations !== undefined) {
      Conversations = Conversations.sort((a, b) => b.lMessageTime - a.lMessageTime);
    }
    const { actualChat, currentUser, jobOfferFilter } = this.state;
    if (Conversations !== undefined && Usuarios !== undefined) {
      return (
        <Container>
          <Column basis="35" pl={20} bg="lighter" hideOnMobileIf={actualChat}>
            <NavbarActionPortal>
              <SearchBar
                jobOffers={JobOffersArray}
                updateJobOfferFilter={this.updatejobOfferFilter}
                jobOfferFilter={jobOfferFilter}
              />
            </NavbarActionPortal>
            <ListContainer>
              {Conversations &&
                Conversations.map(({ studentID, seen, lastMessage, jobOfferID, status }, idx) => {
                  if (status === 'Interviewing' || status === 'Hired') {
                    if (jobOfferFilter === '') {
                      return (
                        <ConversationCard
                          key={idx.id}
                          openChat={() => this.setActualChat(idx, studentID)}
                          user={Usuarios[studentID]}
                          jobOfferName={JobOffers[jobOfferID]}
                          lastMessage={lastMessage}
                          seen={seen}
                        />
                      );
                    }
                    if (jobOfferFilter === jobOfferID) {
                      return (
                        <ConversationCard
                          key={idx.id}
                          openChat={() => this.setActualChat(idx, studentID)}
                          user={Usuarios[studentID]}
                          jobOfferName={JobOffers[jobOfferID]}
                          lastMessage={lastMessage}
                          seen={seen}
                        />
                      );
                    }
                    return null;
                  }
                  return null;
                })}
            </ListContainer>
          </Column>
          <Column basis="65" hideOnMobileIf={!actualChat}>
            {!actualChat ? (
              <Box height="100%" display="flex" alignItems="center" justifyContent="center" p={20}>
                <Typography textAlign="center" variant="leadText">
                  Selecciona una conversación
                </Typography>
              </Box>
            ) : (
              <ChatContent
                closeChat={() => this.setActualChat(-1)}
                chat={actualChat}
                user={currentUser}
              />
            )}
          </Column>
        </Container>
      );
    }
    return null;
  }
}

Messages.defaultProps = {
  Conversations: undefined,
  Usuarios: undefined,
  JobOffers: undefined,
  JobOffersArray: undefined
};

Messages.propTypes = {
  Conversations: PropTypes.arrayOf(PropTypes.object),
  Usuarios: PropTypes.arrayOf(PropTypes.object),
  JobOffers: PropTypes.arrayOf(PropTypes.object),
  JobOffersArray: PropTypes.arrayOf(PropTypes.object)
};
function mapStateToProps(state) {
  return {
    Conversations: state.firestore.ordered.JobOffersyStudents,
    Usuarios: state.firestore.data.Usuarios,
    JobOffers: state.firestore.data.JobOffers,
    JobOffersArray: state.firestore.ordered.JobOffers,
    profile: state.firebase.profile
  };
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: 'JobOffers',
        where: ['company', '==', props.profile.userID]
      },
      { collection: 'Usuarios', where: ['rol', '==', 'Student'] },
      {
        collection: 'JobOffersyStudents'
      }
    ];
  })
)(Messages);
