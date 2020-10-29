import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import Box from '@common/box';
import {
  sendMessage,
  getMessages,
  watchTaskRemovedEvent,
  watchTaskAddedEvent,
  hireStudentInterview,
  rejectStudentInterviewWChat
} from '@actions/jobOfferActions';
import { connect } from 'react-redux';
import { MdSend, MdClear, MdCancel, MdDone } from 'react-icons/md';
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
    message: '',
    messages: []
  };

  setRef = ref => {
    if (ref) {
      // eslint-disable-next-line no-param-reassign
      ref.scrollTop = ref.scrollHeight;
    }
  };

  handleMessageChange = ({ target: { value } }) => this.setState({ message: value });

  handleSubmit = event => {
    event.preventDefault();
    const { chat } = this.props;
    this.props.sendMessage(this.state, chat.id);
    this.setState({ message: '' });
  };

  handleHire = () => {
    const { chat, closeChat } = this.props;
    closeChat();
    this.props.hireStudentInterview(chat.id, chat.jobOfferID, chat.studentID);
  };

  handleReject = () => {
    const { chat, closeChat } = this.props;
    closeChat();
    this.props.rejectStudentInterviewWChat(chat.id, chat.jobOfferID, chat.studentID);
  };

  render() {
    const { user, closeChat, profile, chat, messages } = this.props;
    const { message } = this.state;
    let action;
    if (chat.status === 'Interviewing') {
      action = (
        <Box display="flex" alignItems="center">
          <ActionButton
            size="small"
            color="primary"
            variant="soft"
            mr={5}
            onClick={this.handleHire}
          >
            Hire <MdDone />
          </ActionButton>
          <ActionButton
            size="small"
            color="danger"
            variant="soft"
            mr={5}
            onClick={this.handleReject}
          >
            Reject <MdCancel />
          </ActionButton>
        </Box>
      );
    }
    if (user !== null) {
      return (
        <Container>
          <WhiteBox height={70} top="0">
            <Box p={10} display="flex" alignItems="center">
              <Avatar mr={10} size={50} src={user.profileImg || '/static/img/general/avatar.png'} />
              <Typography mr="auto" variant="leadText">
                {user.firstName} {user.lastName}
              </Typography>
              {action}
              <Tooltip tag="Close chat">
                <CloseButton onClick={closeChat} variant="link" color="danger">
                  <MdClear />
                </CloseButton>
              </Tooltip>
            </Box>
          </WhiteBox>
          <Scroll ref={this.setRef}>
            <MessagesContainer>
              {messages &&
                // eslint-disable-next-line no-shadow
                messages.map(({ id, message, timestamp, sender }) => (
                  <Message
                    otherProfileImg={user.profileImg}
                    key={id}
                    message={message}
                    sentAt={timestamp}
                    seenAt={message}
                    isYours={profile.userID === sender}
                  />
                ))}
            </MessagesContainer>
          </Scroll>
          <WhiteBox height={60} bottom="0">
            <Form onSubmit={this.handleSubmit}>
              <Input value={message} onChange={this.handleMessageChange} mt={0} />
              <SendButton ml={5} variant="soft" color="primary">
                Send
                <MdSend />
              </SendButton>
            </Form>
          </WhiteBox>
        </Container>
      );
    }
    return null;
  }
}

ChatContent.defaultProps = {
  messages: undefined,
  user: undefined,
  profile: undefined
};

ChatContent.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    jobOfferID: PropTypes.string,
    studentID: PropTypes.string
  }).isRequired,
  user: PropTypes.object,
  profile: PropTypes.object,
  messages: PropTypes.arrayOf(PropTypes.object),
  closeChat: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  hireStudentInterview: PropTypes.func.isRequired,
  rejectStudentInterviewWChat: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMessages: convID => dispatch(getMessages(convID)),
    sendMessage: (activity, convID) => dispatch(sendMessage(activity, convID)),
    watchTaskAddedEvent: convID => dispatch(watchTaskAddedEvent(convID)),
    watchTaskRemovedEvent: convID => dispatch(watchTaskRemovedEvent(convID)),
    rejectStudentInterviewWChat: (convID, JobOfferID, studentID) =>
      dispatch(rejectStudentInterviewWChat(convID, JobOfferID, studentID)),
    hireStudentInterview: (convID, JobOfferID, studentID) =>
      dispatch(hireStudentInterview(convID, JobOfferID, studentID))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);
