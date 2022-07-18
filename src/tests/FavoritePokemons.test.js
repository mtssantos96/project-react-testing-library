import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Exibir No favorite pokemon found, caso não tenha pokémons favoritos', () => {
  renderWithRouter(<FavoritePokemons />);

  const noFavorites = screen.getByText(/No favorite pokemon found/i);

  expect(noFavorites).toBeInTheDocument();
});

test('São exibidos todos os cards de pokémons favoritados', () => {
  renderWithRouter(<App />);

  const details = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(details);

  const addFavorite = screen.getByRole('checkbox', {
    id: favorite,
  });
  userEvent.click(addFavorite);

  const link = screen.getByRole('link', {
    name: /favorite pokémon/i,
  });
  userEvent.click(link);

  const name = screen.getByTestId('pokemon-name');
  const type = screen.getByTestId('pokemon-type');
  const weigth = screen.getByTestId('pokemon-weight');

  expect(name).toBeInTheDocument();
  expect(type).toBeInTheDocument();
  expect(weigth).toBeInTheDocument();
});
