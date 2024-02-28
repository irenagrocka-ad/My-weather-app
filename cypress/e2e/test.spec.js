describe('test forecast app', () => {
  beforeEach(() => {
    cy.visit('/')

  })
  it('loads the page', () => {
    cy.url().should('include', '/');
    cy.get('#search-button').should('contain', 'Search');
    cy.get('footer').contains('This project was coded by Irena Grocka');
  })
  it('loads the page and conduct search', () => {
    cy.url().should('include', '/');
    cy.get('#search-button').should('contain', 'Search');
    cy.get('#search-input').should('be.visible').type('Lisbon');
    cy.get('#search-button').click();
    cy.get('#current-city').should('contain', 'Lisbon');
  })
  it('conduct search and validate API response', () => {
    cy.url().should('include', '/');
    cy.intercept('GET', 'https://api.shecodes.io/weather/v1/current?query=Rome&key=3doat099fbcfb24e74ea400f10f43b8a&units=metric').as('getWeather');
    cy.get('#search-button').should('contain', 'Search');
    cy.get('#search-input').should('be.visible').type('Rome');
    cy.get('#search-button').click();
    cy.get('#current-city').should('contain', 'Rome');
    cy.wait('@getWeather').then(xhr => {
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.response.body).to.have.property('city');
      expect(xhr.response.body).to.have.property('condition');
      expect(xhr.response.body).to.have.property('temperature');
      expect(xhr.response.body).to.have.property('wind');
      expect(xhr.response.body).to.have.property('time');
    })
  })

  it('Displays current weather correctly', () => {
    // Stubbing the API response
    cy.intercept('GET', 'https://api.shecodes.io/weather/v1/curren*', { fixture: 'weatherResponse.json' }).as('getWeather')
    cy.get('#search-button').should('contain', 'Search');
    cy.get('#search-input').should('be.visible').type('Rome');
    cy.get('#search-button').click();
    cy.get('#current-city').should('contain', 'Rome');
    cy.wait('@getWeather').then(interception => {
      // Validate the displayed weather
      cy.get('#current-city').should('contain', interception.response.body.city)
      cy.get('#current-temperature-value').should('contain', Math.round(interception.response.body.temperature.current))
      cy.get('#current-humidity-value').should('contain', `${interception.response.body.temperature.humidity}%`)
      cy.get('#current-wind-speed').should('contain', `${Math.round(interception.response.body.wind.speed)}km/h`)
      cy.get('#current-description').should('contain', interception.response.body.condition.description)
      cy.get('#current-weather-icon').should('have.attr', 'src', interception.response.body.condition.icon_url)
    })
  })

  it('Displays forecast correctly', () => {
    // Stubbing the API response
    cy.intercept('GET', 'https://api.shecodes.io/weather/v1/forecast*', { fixture: 'weatherForecastResponse.json' }).as('getWeatherForecast')
    cy.get('#search-button').should('contain', 'Search');
    cy.get('#search-input').should('be.visible').type('Rome');
    cy.get('#search-button').click();
    cy.get('#current-city').should('contain', 'Rome');
    // Wait for the API response
    cy.wait('@getWeatherForecast').then(interception => {
      // Get the relevant forecast data for days 1 to 5
      const forecastData = interception.response.body.daily.slice(1, 6);

      // Validate the displayed forecast
      cy.get('.weather-forecast-day').should('have.length', forecastData.length);

      forecastData.forEach((day, index) => {
        cy.get('.weather-forecast-icon').eq(index).should('have.attr', 'src', day.condition.icon_url);
        cy.get('.weather-forecast-temperature').eq(index).should('contain', `${Math.round(day.temperature.maximum)}°C/`);
        cy.get('.weather-forecast-temperature-low-temp').eq(index).should('contain', `${Math.round(day.temperature.minimum)}°C`);
      });
    })
  })

})