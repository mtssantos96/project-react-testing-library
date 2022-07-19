import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);

  const title = screen.getByRole('heading', {
    name: /Encountered pokémons/i,
    nivel: 2,
  });

  expect(title).toBeInTheDocument();
});

test('É exibido o próximo pokémon, quando o botão Próximo pokémon é clicado', () => {
  renderWithRouter(<App />);
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonName).toHaveTextContent(/pikachu/i);

  const buttonNext = screen.getByTestId('next-pokemon');
  userEvent.click(buttonNext);

  expect(pokemonName).toHaveTextContent(/charmander/i);
});

test('É mostrado apenas um pokémon por vez', () => {
  renderWithRouter(<App />);
  const pokemonName = screen.getAllByTestId('pokemon-name');

  expect(pokemonName).toHaveLength(1);
});

test('Deve existir um botão de filtragem para cada tipo de pokémon', () => {
  renderWithRouter(<App />);

  const eletricType = screen.getByRole('button', {
    name: /Electric/i,
  });
  const fireType = screen.getByRole('button', {
    name: /Fire/i,
  });
  const bugType = screen.getByRole('button', {
    name: /Bug/i,
  });
  const poisonType = screen.getByRole('button', {
    name: /Poison/i,
  });
  const psychicType = screen.getByRole('button', {
    name: /Psychic/i,
  });
  const normalType = screen.getByRole('button', {
    name: /Normal/i,
  });
  const DragonType = screen.getByRole('button', {
    name: /Dragon/i,
  });

  expect(eletricType).toBeInTheDocument();
  expect(fireType).toBeInTheDocument();
  expect(bugType).toBeInTheDocument();
  expect(poisonType).toBeInTheDocument();
  expect(psychicType).toBeInTheDocument();
  expect(normalType).toBeInTheDocument();
  expect(DragonType).toBeInTheDocument();
});

test('Ao clicar um botão de tipo, mostra os pokemons do mesmo tipo', () => {
  renderWithRouter(<App />);

  const normalType = screen.getByRole('button', {
    name: /Normal/i,
  });
  userEvent.click(normalType);
  const pokemonName = screen.getByTestId('pokemon-type');
  expect(normalType).toHaveTextContent(/Normal/i);
  expect(normalType).toBeInTheDocument();
  expect(pokemonName).toBeInTheDocument();
});

test('Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);

  const buttonAll = screen.getByRole('button', {
    name: /All/i,
  });
  expect(buttonAll).toBeInTheDocument();

  const buttonType = screen.getAllByTestId('pokemon-type-button');
  userEvent.click(buttonType[0]);
  userEvent.click(buttonAll);

  const buttonNext = screen.getByTestId(/next-pokemon/);
  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toHaveTextContent(/electric/i);

  userEvent.click(buttonNext);
  expect(pokemonType).not.toHaveTextContent(/electric/i);
});
