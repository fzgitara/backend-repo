class User {
  id: string;
  username: string;
  totalAverageWeightRatings: number;
  numberOfRents: number;
  recentlyActive: number;
  constructor(
    id: string,
    username: string,
    totalAverageWeightRatings: number,
    numberOfRents: number,
    recentlyActive: number
  ) {
    (this.id = id),
    (this.username = username),
    (this.totalAverageWeightRatings = totalAverageWeightRatings),
    (this.numberOfRents = numberOfRents),
    (this.recentlyActive = recentlyActive)
  }
};

export default User;