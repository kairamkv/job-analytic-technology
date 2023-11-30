export const fetchTechnologiesData = async () => {
  try {
    const techsPromise = await fetch(
      'http://localhost:5000/api/v1/technologies',
    );
    if (!techsPromise.ok) {
      throw new Error('Server error');
    }
    const techs = await techsPromise.json();
    return techs;
  } catch (error) {
    return { ok: false, error };
  }
};

export const fetchCountriesData = async () => {
  try {
    const techPormiseByCountry = await fetch(
      'http://localhost:5000/api/v1/technologies/countries',
    );
    if (!techPormiseByCountry.ok) {
      throw new Error('Server error');
    }
    const techsByCountries = await techPormiseByCountry.json();
    return techsByCountries;
  } catch (error) {
    return { ok: false, error };
  }
};

export const fetchQuestionsData = async () => {
  try {
    const techsPromiseByQuestions = await fetch(
      'http://localhost:5000/api/v1/questions',
    );
    if (!techsPromiseByQuestions.ok) {
      throw new Error('Server error');
    }
    const techsByQuestions = await techsPromiseByQuestions.json();
    return techsByQuestions;
  } catch (error) {
    return { ok: false, error };
  }
};

export const fetchTechnologyByNameData = async (searchValue: string) => {
  try {
    const fetchedTech = await fetch(
      `http://localhost:5000/api/v1/technologies/${searchValue}`,
    );
    if (!fetchedTech.ok) {
      throw new Error('Server error');
    }
    const response = await fetchedTech.json();
    return response;
  } catch (error) {
    //TODO: Raise warning that element doesn't exist
    return { ok: false, error };
  }
};
