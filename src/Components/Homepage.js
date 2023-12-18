import React, { useState } from 'react';
import NavbarComp from './Navbar';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../CSS/Homepage.css';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Modal from 'react-bootstrap/Modal';

const Homepage = () => {
  const BASE_URL = 'https://urlshortener-srt.onrender.com/urlshortner';
  const authToken = localStorage.getItem('token');
  const [shortlink, setShortlink] = useState('');
  const [show, setShow] = useState(false);
  const [id,setId] = useState('')
  const [link, setLink] = useState({
    mainlink: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeHandler = (e) => {
    setLink({ ...link, [e.target.name]: e.target.value });
  };

  const handleShort = async () => {

    if(link.mainlink===''){
      alert('Enter a link to shorten it')
    }else{

    
    try {
      const response = await fetch(`${BASE_URL}/url`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        },
        body: JSON.stringify(link)
      });

      if (response.ok) {
        const res = await response.json();
        
        setId(res.slice(-9))
        setShortlink(res); // Set the shortened link obtained from the response
        setShow(true); // Open the modal to display the shortened link
      } else {
        alert('Failed to create a short link');
      }
    
    } catch (error) {
      console.log(error);
    }
  }
  };

  const handleRedirect = async () => {
    try {

      
      const response = await fetch(`${BASE_URL}/${id}`);
      if (response.ok) {
        window.location.href = response.url; // Redirects to the main link
      } else {
        alert('Failed to redirect to the main link');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarComp />
      <div className='container' style={{ marginTop: '150px', width: '50%' }}>
        <FloatingLabel controlId="floatingTextarea" label="Enter a link to shorten it" className="mb-3">
          <Form.Control as="textarea" placeholder="Enter a link here" onChange={changeHandler} value={link.mainlink} name='mainlink' />
        </FloatingLabel>
        <ArrowCircleRightIcon className='arrow' onClick={handleShort} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shortened Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {shortlink && (
            <div>
              <p>Shortened Link:</p>
              <p>{`${shortlink}`}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {shortlink && (
            <Button variant="primary" onClick={handleRedirect}>
              Go to Shortened Link
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Homepage;
