const User = require("../models/UserModel");

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // If the user is not found, send an appropriate response and return
      return res.status(404).json({ msg: "User with given email not found." });
    }

    const movies = user.likedMovies;
    const movieIndex = movies.findIndex(({ id }) => id === movieId);

    if (movieIndex === -1) {
      // If the movie is not found in the user's likedMovies, send an appropriate response and return
      return res.status(400).json({ msg: "Movie not found in liked list." });
    }

    // Remove the movie from the list
    movies.splice(movieIndex, 1);

    // Update the user's likedMovies
    await User.findByIdAndUpdate(
      user._id,
      { likedMovies: movies },
      { new: true }
    );

    // Send the success response
    return res.json({ msg: "Movie successfully removed.", movies });

  } catch (error) {
    // Handle unexpected errors
    console.error('Error removing movie from liked list:', error);
    return res.status(500).json({ msg: "Error removing movie from the liked list." });
  }
};

