import styled from 'styled-components';
import CommonAvatar from '@common/avatar';
import { FiChevronRight } from 'react-icons/fi';

const Text = styled.div`
  font-size: 0.55rem;
  letter-spacing: 0.2px;
  color: ${props => props.theme.colors.lighter};
  flex-flow: row wrap;
  align-items: center;
  text-transform: initial;
  text-align: left;
  white-space: nowrap;

  ${props => props.theme.media.tablet`
    display: none;
  `}
`;

const Name = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 0.85rem;
  display: inline-flex;
  font-weight: 500;

  ${props => props.theme.media.tablet`
    display: none;
  `}
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100px;
`;

const DownIcon = styled(FiChevronRight)`
  font-size: 25px;
  color: ${props => props.theme.colors.lighter};
  cursor: pointer;
  margin-left: 5px;
  cursor: pointer;
  flex-shrink: 0;

  ${props => props.theme.media.tablet`
    display: none;
  `}
`;

const Break = styled.div`
  flex-basis: 100%;
  width: 0px;
  height: 0px;
  overflow: hidden;
`;

const Avatar = styled(CommonAvatar)`
  margin-right: 10px;

  ${props => props.theme.media.tablet`
    margin-right: 0;
  `}
`;

export { Profile, Name, Text, DownIcon, Break, Avatar };
