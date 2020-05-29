const hourlyBump = (npoScore) => {
  return npoScore * 1.05;
}

const postBump = (npoScore) => {
  return npoScore * 1.1;
}

const featureBump = (npoScore) => {
  return npoScore * 1.2;
}

const referralBump = (npoScore) => {
  return npoScore * 1.3;
}

const hourlyDownBump = (npoScore) => {
  return npoScore * 0.995;
}

module.exports = { hourlyBump, postBump, featureBump, referralBump, hourlyDownBump };
