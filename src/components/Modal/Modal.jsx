import Modal from 'react-modal';
Modal.setAppElement('#root');

export const ModalComponent = ({ isOpen, onRequestClose, largeImageURL, tag }) => {
    const customStyles = {
        overlay: {
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              zIndex: '1200',        
},
        content: {
            top: '50%', 
            left: '50%', 
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)', 
            padding: '0', 
            border: 'none', 
            maxWidth: 'calc(100vw - 48px)',
            maxHeight: 'calc(100vh - 24px)',
            overflow: 'hidden',
        },
    };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <img src={largeImageURL} alt={tag} />
    </Modal>
  );
};
