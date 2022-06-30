import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Col, Container, Row } from 'react-bootstrap';

import { FavoriteMoviesView } from './favorite-movie-view';
import { UpdateView } from './update-view';

import './profile-view.scss';

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [movies, setMovies] = useState(props.movies);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios.get(`https://quiet-savannah-08380.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setFavoriteMovies(response.data.FavoriteMovies)
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getUser();
  }, [])

  const handleDelete = () => {
    axios.delete(`https://quiet-savannah-08380.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert(`The account ${user.Username} was successfully deleted.`)
        localStorage.clear();
        window.open('/register', '_self');
      }).
      catch(error => console.error(error))
  }

  const birthdayDate = () => {
    if (user.Birthday) {
      const birthdayWithoutTime = user.Birthday.split('T')[0];
      return birthdayWithoutTime;
    }
  };

  return (
    <Container id="profile-form">
      <Row><h4>Your profile</h4></Row>
      <Row>
        <Col xs={5} sm={4} md={3} lg={2} className="label">
          Username:
        </Col>
        <Col xs={5} sm={4} md={3} lg={2} className="value">
          {user.Username}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={5} sm={4} md={3} lg={2} className="label">
          Password:
        </Col>
        <Col xs={5} sm={4} md={3} lg={2} className="value">
          ******
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={5} sm={4} md={3} lg={2} className="label">
          Email:
        </Col>
        <Col xs={5} sm={4} md={3} lg={2} className="value">
          {user.Email}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={5} sm={4} md={3} lg={2} className="label">
          Birthday:
        </Col>
        <Col xs={5} sm={4} md={3} lg={2} className="value">
          {birthdayDate()}
        </Col>
      </Row>
      <Row className="mt-5"><h4>Your favorite movies</h4></Row>
      <Row className="mt-3">
        <FavoriteMoviesView
          movies={movies}
          favoriteMovies={favoriteMovies}
          currentUser={currentUser}
          token={token} />
      </Row>
      <UpdateView user={user} />
      <Button className="d-block mt-5" variant="warning" onClick={handleDelete}>Delete profile</Button>
    </Container>
  )
}