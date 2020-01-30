import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import firebase from 'firebase';
import Box from '@common/box';
import { sendMessage } from '@actions/jobOfferActions';
import { connect } from 'react-redux';
import { MdSend, MdClear } from 'react-icons/md';
import Avatar from '@common/avatar';
import Input from '@common/input';
import Tooltip from '@common/tooltip';
import Message from './components/message';
import {
  Container,
  WhiteBox,
  SendButton,
  MessagesContainer,
  Scroll,
  CloseButton,
  ActionButton,
  Form
} from './elements';

class ChatContent extends Component {
  state = {
    // @Ernesto need the id of the conversation(JobOfferyStudent Collection)
    message: '',
    messages: null
  };

  componentDidMount() {
    const db = firebase.database().ref('/messages');
    db.on(
      'value',
      snapshot => {
        this.setState({ messages: snapshot.val() });
      },
      error => {
        console.error(error);
      }
    );
  }

  setRef = ref => {
    if (ref) {
      // eslint-disable-next-line no-param-reassign
      ref.scrollTop = ref.scrollHeight;
    }
  };

  handleMessageChange = ({ target: { value } }) => this.setState({ message: value });

  handleSubmit = event => {
    event.preventDefault();
    this.props.sendMessage(this.state);
  };

  render() {
    const {
      chat: { user },
      closeChat
    } = this.props;
    const { message, messages } = this.state;
    console.log(this.state);
    if (messages !== null) {
      return (
        <Container>
          <WhiteBox height={70} top="0">
            <Box p={10} display="flex" alignItems="center">
              <Avatar mr={10} size={50} src={user.profileImg || '/static/img/general/avatar.png'} />
              <Typography mr="auto" variant="leadText">
                {user.firstName} {user.lastName}
              </Typography>
              <Tooltip tag="Close chat">
                <CloseButton onClick={closeChat} variant="link" color="danger">
                  <MdClear />
                </CloseButton>
              </Tooltip>
            </Box>
          </WhiteBox>
          <Scroll ref={this.setRef}>
            <MessagesContainer>
              {messages.map(({ id, message: msg, sentAt, seenAt }, index) => (
                <Message
                  otherProfileImg={user.profileImg}
                  key={id}
                  message={msg}
                  sentAt={sentAt}
                  seenAt={seenAt}
                  isYours={index % 2 === 0}
                />
              ))}
            </MessagesContainer>
          </Scroll>
          <WhiteBox height={60} bottom="0">
            <Box display="flex" p={10}>
              <Input value={message} onChange={this.handleMessageChange} mt={0} />
              <SendButton ml={5} variant="soft" color="primary" onClick={this.handleSubmit}>
                Send
                <MdSend />
              </SendButton>
            </Box>
          </WhiteBox>
        </Container>
      );
    }
    return null;
  }
}

ChatContent.propTypes = {
  chat: PropTypes.shape({
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      profileImg: PropTypes.string
    }),
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        message: PropTypes.string,
        sentAt: PropTypes.any,
        seenAt: PropTypes.any
      })
    )
  }).isRequired,
  closeChat: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    sendMessage: activity => dispatch(sendMessage(activity))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);
