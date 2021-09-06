// /* eslint-disable */
// import React, { FC, useState } from 'react';
// import { Button, Modal } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';


// const ModalCadastro=() =>{
//   const [show, setShow] = useState<Boolean>(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const history = useHistory();

//   function back() {
//     history.go(0);
//   }

//   function defaultFunc() {
  
//     handleClose();
//     back();
//   }

//   return (
//       <>
//     <Button
//       style={{
//         backgroundColor: 'red',
//         borderColor: 'transparent',
//         width: 20,
//         height: 20,
//         padding: 0,
//         marginRight: 15,
//         marginBottom: 2,
//       }}
//     onClick={handleShow}
//   >
// Abrir Modal
//   </Button>
//     <Modal
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//       enforceFocus
//       show={show}
//       onHide={handleClose}
//     >
//       <Modal.Body style={{ fontSize: 20, alignSelf: 'center' }}>
//       {children}
//       </Modal.Body>
//       <Modal.Footer>
//       <Button
//       style={{
//         backgroundColor: 'transparent',
//         borderColor: 'transparent',
//         width: 20,
//         height: 20,
//         padding: 0,
//         marginRight: 15,
//         marginBottom: 2,
//       }}
//     onClick={handleClose} />
//       </Modal.Footer>
//     </Modal>
//     </>
//   );
// };

// export default ModalCadastro;
export {}
