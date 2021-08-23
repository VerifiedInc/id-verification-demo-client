import LogRocket from 'logrocket';
import {
  FC,
  useState,
  MouseEventHandler,
  ChangeEventHandler,
  FormEventHandler,
  useEffect
} from 'react';
import Modal from 'react-modal';

import './BugReport.css';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    borderRadius: 0,
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: 'Open Sans, sans-serif',
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 10
  }
};

const BugReport: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const openModal: MouseEventHandler<HTMLButtonElement> = () => {
    setModalIsOpen(true);
  };

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    LogRocket.captureMessage('User bug report', {
      extra: {
        message,
        email
      }
    });

    setIsSubmitted(true);
  };

  const handleClose: MouseEventHandler<HTMLButtonElement> = () => {
    setModalIsOpen(false);
    setIsSubmitted(false);
    setEmail(''),
    setMessage('');
  };

  return (
    <div className='bug-report'>
      <button type='button' className='report-button' onClick={openModal}>Report a Bug</button>
      <Modal isOpen={modalIsOpen} style={modalStyles} contentLabel='Report a Bug'>
        <div className='bug-report-modal'>
          <button className='x-close-button' onClick={handleClose}>X</button>
          {
            isSubmitted
              ? (
                <>
                  <h2 className='bug-report-header'>Thank You</h2>
                  <div>Your report has been submitted.</div>
                  <div className='button-wrapper'>
                    <button type='button' onClick={handleClose} className='close-button'>Close</button>
                  </div>
                </>
              )
              : (
                <>
                  <h2 className='bug-report-header'>Report a Bug</h2>
                  <form className='bug-report-form'>
                    <label htmlFor='email'>Email (optional)</label>
                    <input type='text' id='email' value={email} onChange={handleEmailChange} placeholder='example@unum.id' />
                    <label htmlFor='bug-report-message'>Describe the bug (in as much detail as possible)</label>
                    <textarea placeholder='describe the bug you are reporting' onChange={handleMessageChange} value={message} id='bug-report-message' />
                    <div className='button-wrapper'>
                      <button type='submit' onClick={handleSubmit} disabled={!message}>Submit</button>
                    </div>
                  </form>
                </>
              )
          }
        </div>
      </Modal>
    </div>
  );
};

export default BugReport;
