import styled from 'styled-components';
import { MdPhotoCamera } from 'react-icons/md';
import Loader from '@common/loader';
import CommonButton from '@common/button';

const ImageContainer = styled.div`
  width: 180px;
  height: 180px;
  margin-top: -90px;
  overflow: hidden;
  border-radius: 50%;
  border: 3px solid ${props => props.theme.colors.light};
  margin-left: auto;
  margin-right: auto;
  position: relative;
  background-color: #fff;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;

  ${props => props.uploading && 'opacity: 0.3'}
`;

const ProfileImgLoader = styled(Loader)`
  position: absolute;
  top: calc(50% - 17.5px);
  left: calc(50% - 17.5px);
`;

const PhotoButton = styled(CommonButton)`
  border-radius: 0;
  font-size: 10px;
  color: ${props => props.theme.colors.light};
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding-bottom: 20px;
  padding-top: 10px;
`;

const CameraIcon = styled(MdPhotoCamera)`
  margin-right: 6px;
  font-size: 16px;
`;

export { ImageContainer, Image, ProfileImgLoader, PhotoButton, CameraIcon };
