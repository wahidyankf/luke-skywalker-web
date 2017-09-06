const view = {
  renderInit() {
    let initBody = `
    <div id="heading">
      <h1>${controller.getName()}</h1>
    </div>
    <div class="biography">
      <div class="profile-picture">
        <span class="fa fa-user-o fa-4x" aria-hidden="true"></span>
      </div>
      <div class="bio-data"></div>
    </div>
    <div class="movie-section">
      <div class="person-movie">
        <h2>${controller.getLastName()} Movie's</h2>
        <div class="movies"></div>
        <span id="see-more-movie">See More</span>
      </div>
      <div class="related-movie">
        <h2>Related Another Movie's</h2>
      </div>
    </div>
    `;

    $('body').append(initBody);
  },

  renderBio() {
    let bioBody = `
    <table>
      <tr><th>Height:</th><td>${data.bio.height} cm</td></tr>
      <tr><th>Mass:</th><td>${data.bio.mass} kg</td></tr>
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
    data.moviesData.forEach((movieData, index) => {
      let playClass = '';
      if (index % 2 === 0) {
        playClass = 'movie-item-play-odd';
      } else {
        playClass = 'movie-item-play-even';
      }
      moviesBody.push(`
      <div class="movie-item">
        <div class="${playClass} movie-item-play">
          <span class="fa fa-play-circle-o fa-3x" aria-hidden="true"></span>
        </div>
        <div class="movie-item-data-wrapper">
          <h3 class="movie-item-heading">${movieData.title}</h3>
          <div class="movie-item-data">
            <div class="movie-item-data-top">
              <p>Director: </p>
              <p>${movieData.director}</p>
            </div>
            <div class="movie-item-data-bottom">
              <p>Release</p>
              <p>${movieData.releaseDate}</p>
            </div>
          </div>
        </div>
      </div>
      `);
    });
    $('.movies').html(moviesBody.join(''));
    $('.movie-item:gt(3)').hide();

    $('#see-more-movie').on('click', event => {
      $('.movie-item:gt(3)').show();
      $('#see-more-movie').hide();
    });
  },

  renderRelatedMovie() {
    let movieRelatedBody = `
    <div class="related-movie-card">
      <div class="related-movie-data">
        <h3 class="related-movie-heading">${data.movieRelatedData.title}</h3>
        <div class="related-movie-desc">
          <table>
            <tr><th>Director:</th><td>${data.movieRelatedData
              .director}</td></tr>
            <tr><th>Producer:</th><td>${data.movieRelatedData
              .producer}</td></tr>
            <tr><th>Release Date:</th><td>${data.movieRelatedData
              .releaseDate}</td></tr>
          </table>
        </div>
      </div>
      <div class="crawl">
        <p id="opening-crawl">${data.movieRelatedData.openingCrawl}</p>
        <p id="opening-crawl-excerpt">${data.movieRelatedData
          .openingCrawlExcerpt}</p>
      </div>
        <span id="see-more-crawl">See More</span>
    </div>
    `;

    $('.related-movie').append(movieRelatedBody);
    $('#opening-crawl').hide();

    $('#see-more-crawl').on('click', event => {
      $('#opening-crawl').show();
      $('#opening-crawl-excerpt').hide();
      $('#see-more-crawl').hide();
    });
  }
};
