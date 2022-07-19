import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('As informações detalhadas do pokémon selecionado são mostradas na tela', () => {
  renderWithRouter(<App />);
  const pokemonDetails = screen.getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(pokemonDetails);

  const details = screen.getByRole('headingPokémon favoritado?', {
    name: /Pikachu Details/i,
    nivel: 2,
  });

  expect(details).toBeInTheDocument();
  expect(details.innerHTML).toBe('Pikachu Details');

  expect(pokemonDetails).not.toBeInTheDocument();

  const summary = screen.getByRole('heading', {
    name: /summary/i,
    nivel: 2,
  });

  expect(summary).toBeInTheDocument();

  const pokemonInfo = screen.getByText(/This intelligent/i);

  expect(pokemonInfo).toBeInTheDocument();
});

test('Existe uma seção com os mapas contendo as localizações do pokémon', () => {
  renderWithRouter(<App />);
  const pokemonDetails = screen.getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(pokemonDetails);

  const locateTitle = screen.getByRole('heading', {
    name: /Game Locations of Pikachu/i,
    nivel: 2,
  });

  expect(locateTitle).toBeInTheDocument();

  const images = screen.getAllByRole('img');
  expect(images[1]).toBeInTheDocument();
  expect(images[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(images[1].alt).toBe('Pikachu location');

  expect(images[2]).toBeInTheDocument();
  expect(images[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(images[2].alt).toBe('Pikachu location');
});

test('O usuário pode favoritar um pokémon', () => {
  renderWithRouter(<App />);
  const pokemonDetails = screen.getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(pokemonDetails);

  const addFavorite = screen.getByText('Pokémon favoritado?');

  expect(addFavorite).toBeInTheDocument();

  userEvent.click(addFavorite);
  const star = screen.getByAltText('Pikachu is marked as favorite');

  expect(star).toBeInTheDocument();

  userEvent.click(addFavorite);
  expect(star).not.toBeInTheDocument();
});
