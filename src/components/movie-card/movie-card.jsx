import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { Button, Card } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {

  async addToFavoriteList(movieId) {

    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    try {
      let response = await axios.post(
        `https://quiet-savannah-08380.herokuapp.com/users/${Username}/${movieId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(`The movie was successfully added to your list.`);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { movie } = this.props;

    return (
      <Card id="movie-card">
        <Link to={`/movies/${movie._id}`}>
          <Card.Img variant="top" src={movie.ImagePath} />
        </Link>
        <Card.Body>
          <Card.Title id="card-title">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="button" variant="outline-primary" size="sm">
              Open
            </Button>
          </Link>
          <Button
            className="button "
            variant="outline-primary"
            size="sm"
            onClick={() => this.addToFavoriteList(movie._id)}
          >
            Add
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
  }).isRequired,
};