const view = {
  renderInit() {
    let initBody = `
    <div id="heading">
      <h1>${controller.getName()}</h1>
    </div>
    <div id="biography">
      <div class="profile-picture"></div>
      <div class="bio-data"></div>
    </div>
    <div id="person-movie">
      <h2>${controller.getLastName()}'s Movie</h2>
      <span id="see-more-movie">See More</span>
      <div id="movies"></div>
    </div>
    <div id="related-movie">
      <h2>Related Another Movie's</h2>
    </div>
    `;

    $('body').append(initBody);
  },

  renderBio() {
    let bioBody = `
    <table>
      <tr><th>Height:</th><td>${data.bio.height}</td></tr>
      <tr><th>Mass:</th><td>${data.bio.mass}</td></tr>
      <tr><th>Hair Color:</th><td>${data.bio.hairColor}</td></tr>
      <tr><th>Skin Color:</th><td>${data.bio.skinColor}</td></tr>
      <tr><th>Birth Year:</th><td>${data.bio.birthYear}</td></tr>
      <tr><th>Gender:</th><td>${data.bio.gender}</td></tr>
    </table>
    `;

    $('.bio-data').html(bioBody);
  },

  renderMovies() {
    let moviesBody = [];
    data.moviesData.forEach(movieData => {
      moviesBody.push(`
      <div class="movie-item">
        <h3>${movieData.title}</h3>
        <p>Director: </p>
        <p>${movieData.director}</p>
        <p>Release</p>
        <p>${movieData.releaseDate}</p>
      </div>
      `);
    });
    $('#movies').html(moviesBody.join(''));
    $('.movie-item:gt(3)').hide();

    $('#see-more-movie').on('click', event => {
      $('.movie-item:gt(3)').show();
      $('#see-more-movie').hide();
    });
  },

  renderRelatedMovie() {
    let movieRelatedBody = `
    <h3>${data.movieRelatedData.title}</h3>
    <div>
      <table>
        <tr><th>Director:</th><td>${data.movieRelatedData.director}</td></tr>
        <tr><th>Producer:</th><td>${data.movieRelatedData.producer}</td></tr>
        <tr><th>Release Date:</th><td>${data.movieRelatedData
          .releaseDate}</td></tr>
      </table>
    </div>
    <div>
      <p id="opening-crawl">${data.movieRelatedData.openingCrawl}</p>
      <p id="opening-crawl-excerpt">${data.movieRelatedData
        .openingCrawlExcerpt}</p>
      <span id="see-more-crawl">See More</span>
    </div>
    `;

    $('#related-movie').append(movieRelatedBody);
    $('#opening-crawl').hide();

    $('#see-more-crawl').on('click', event => {
      $('#opening-crawl').show();
      $('#opening-crawl-excerpt').hide();
      $('#see-more-crawl').hide();
    });
  }
};
