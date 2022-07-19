import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('É renderizado um card com as informações de determinado pokémon:', () => {
  renderWithRouter(<App />);

  const pokemonName = screen.getByTestId('pokemon-name');
  const pokemonType = screen.getByTestId('pokemon-type');
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  const pokemonImage = screen.getByRole('img', {
    src: /pikachu/i,
  });
  const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  const alt = 'Pikachu sprite';
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonName.innerHTML).toBe('Pikachu');
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonType.innerHTML).toBe('Electric');
  expect(pokemonWeight).toBeInTheDocument();
  expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
  expect(pokemonImage).toBeInTheDocument();
  expect(pokemonImage.src).toBe(src);
  expect(pokemonImage.alt).toBe(alt);
});

test('O card indicado contém um link para exibir os detalhes', () => {
  renderWithRouter(<App />);

  const pokemonLink = screen.getByRole('link', {
    name: /More details/i,
  });

  expect(pokemonLink).toBeInTheDocument();
});

test('Ao clicar no link a página é redirecionada para págida de detalhes', () => {
  const { history } = renderWithRouter(<App />);

  const pokemonLink = screen.getByRole('link', {
    name: /More details/i,
  });

  userEvent.click(pokemonLink);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/pokemons/25');
});

test('Existe um ícone de estrela nos pokémons favoritados', () => {
  renderWithRouter(<App />);
  const pokemonLink = screen.getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(pokemonLink);
  const addFavorite = screen.getByRole('checkbox', {
    name: /Pokémon favoritado?/i,
  });
  userEvent.click(addFavorite);

  const star = screen.getByAltText('Pikachu is marked as favorite');
  const pokemonSrc = 'http://localhost/star-icon.svg';
  const pokemonAlt = 'Pikachu is marked as favorite';

  expect(star.src).toBe(pokemonSrc);
  expect(star.alt).toBe(pokemonAlt);
});
