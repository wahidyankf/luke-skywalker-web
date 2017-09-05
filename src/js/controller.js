const controller = {
  getName() {
    return data.name;
  },

  getLastName() {
    let nameArray = data.name.split(' ');
    return nameArray[nameArray.length - 1];
  },

  getMoviesData() {
    return data.moviesData;
  },

  setRelatedMovie() {
    let allMovies = [1, 2, 3, 4, 5, 6, 7];

    data.moviesURL.forEach(url => {
      let regex = /\d/;
      data.moviesPlayed.push(parseInt(regex.exec(url)[0]));
    });

    allMovies.forEach(movie => {
      if (data.moviesPlayed.indexOf(parseInt(movie)) == -1) {
        data.movieRelated.push(movie);
      }
    });
  },

  fetchPerson(name) {
    let searchName = name.toLowerCase().replace(' ', '%20');
    let ajaxURL = data.url.searchPeople + searchName;

    $.ajax({
      method: 'GET',
      url: ajaxURL
    })
      .done(response => {
        data.bio.height = response.results[0].height;
        data.bio.mass = response.results[0].mass;
        data.bio.hairColor = response.results[0].hair_color;
        data.bio.skinColor = response.results[0].skin_color;
        data.bio.birthYear = response.results[0].birth_year;
        data.bio.gender = response.results[0].gender;
        data.moviesURL = response.results[0].films;
        data.moviesURL.map(movieURL => {
          return this.fetchMovie(movieURL);
        });
        this.setRelatedMovie();
        this.fetchRelatedMovie();
      })
      .done(response => {
        setTimeout(function() {
          view.renderBio();
          view.renderMovies();
          view.renderRelatedMovie();
        }, 2000);
      });
  },

  fetchMovie(url) {
    $.ajax({
      method: 'GET',
      url: url
    }).done(response => {
      let movieData = {};
      movieData.title = response.title;
      movieData.director = response.director;
      movieData.releaseDate = response.release_date;
      data.moviesData.push(movieData);
    });
  },

  fetchRelatedMovie() {
    url = data.url.movie + data.movieRelated[0];
    $.ajax({
      method: 'GET',
      url: url
    }).done(response => {
      data.movieRelatedData.title = response.title;
      data.movieRelatedData.director = response.director;
      data.movieRelatedData.producer = response.producer;
      data.movieRelatedData.releaseDate = response.release_date;
      data.movieRelatedData.openingCrawl = response.opening_crawl;
      data.movieRelatedData.openingCrawlExcerpt = `${response.opening_crawl
        .split(' ')
        .slice(0, 32)
        .join(' ')}...`;
    });
  }
};
