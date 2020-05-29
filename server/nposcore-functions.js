const { organizationModel } = require("./models");

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

const downBumpOrganizations = async () => {
  // UPDATING ALL BUMPED ORGANIZATIONS
  await organizationModel.updateMany(
    { bumpedInLastHour: true },
    { bumpedInLastHour: false },
    { multi: true },
    (err, organization) => {
      if (err) throw err;
    }
  )

  const organizations = await organizationModel.find({ bumpedInLastHour: false });
  for (organization of organizations) {
    await organizationModel.findOneAndUpdate(
      { _id: organization._id, bumpedInLastHour: false },
      { npoScore: hourlyDownBump(organization.npoScore) },
      { new: true },
      (err, organization) => {
        if (err) throw err;
      }
    )
  }
}

module.exports = { hourlyBump, postBump, featureBump, referralBump, hourlyDownBump, downBumpOrganizations };
