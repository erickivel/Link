import React, { useCallback, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import ReactModal from 'react-modal';
import { useAppState } from '../../hooks/apollo';
import avatarsArray from '../../utils/avatarsArray';

import { Container, Images } from './styles';

interface ModalAvatarProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalAvatar: React.FC<ModalAvatarProps> = ({ isOpen, setIsOpen }) => {
  const { user, updateUser } = useAppState();

  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  const changeAvatar = useCallback(
    (newAvatar: number) => {
      updateUser({ ...user, avatar: newAvatar });
      setModalStatus(false);
    },
    [user, updateUser],
  );

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#4A405F',
          color: '#EDE8F4',
          borderRadius: '8px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      <Container>
        <div className="title">
          <h2>Escolha um avatar:</h2>
          <button type="button" onClick={setIsOpen} className="close">
            <FiX size={22} color="#1b053f" />
          </button>
        </div>
        <Images>
          <button type="button" onClick={() => changeAvatar(1)}>
            <img src={avatarsArray[1]} alt="Avatar" />
          </button>
          <button type="button" onClick={() => changeAvatar(2)}>
            <img src={avatarsArray[2]} alt="Avatar" />
          </button>
          <button type="button" onClick={() => changeAvatar(3)}>
            <img src={avatarsArray[3]} alt="Avatar" />
          </button>
          <button type="button" onClick={() => changeAvatar(4)}>
            <img src={avatarsArray[4]} alt="Avatar" />
          </button>
          <button type="button" onClick={() => changeAvatar(5)}>
            <img src={avatarsArray[5]} alt="Avatar" />
          </button>
          <button type="button" onClick={() => changeAvatar(6)}>
            <img src={avatarsArray[6]} alt="Avatar" />
          </button>
          <button type="button" onClick={() => changeAvatar(7)}>
            <img src={avatarsArray[7]} alt="Avatar" />
          </button>
          <button type="button" onClick={() => changeAvatar(8)}>
            <img src={avatarsArray[8]} alt="Avatar" />
          </button>
        </Images>
      </Container>
    </ReactModal>
  );
};

export default ModalAvatar;
