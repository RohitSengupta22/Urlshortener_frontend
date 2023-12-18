import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import NavbarComp from './Navbar';
import { Container } from '@mui/material';

const Urls = () => {
  const authToken = localStorage.getItem('token');
  const [urlArr, setUrlArr] = useState([]);
  const URI = "https://urlshortener-srt.onrender.com/urlshortner"

  useEffect(() => {
    const apiUrl = 'https://urlshortener-srt.onrender.com/urlshortner/url';

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setUrlArr(data.urlForTheUser);
        console.log('Data received:', data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();

  }, [urlArr]);

  return (
    <div>
      <NavbarComp />
      <Container>
        <Table striped bordered hover size="sm" style={{ marginTop: '150px' }}>
          <thead>
            <tr>
              <th>Mainlink</th>
              <th>Shorturl</th>
            </tr>
          </thead>
          <tbody>
            {urlArr.map((url, index) => (
              <tr key={index}>
                <td>{url.mainlink}</td>
                <td>{URI}{url.shortlink}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Urls;
