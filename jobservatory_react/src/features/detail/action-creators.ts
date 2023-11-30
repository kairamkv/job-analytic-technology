import {
  fetchCountriesData,
  fetchQuestionsData,
  fetchTechnologiesData,
  fetchTechnologyByNameData,
} from '../../api';
import { ChartLine } from '../../components/detail/Detail';
import {
  ADD_TECH,
  FETCH_DATA_END,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  REMOVE_TECH,
} from './actions';

export const addTech = (data: ChartLine) => ({
  type: ADD_TECH,
  payload: data,
});

export const removeTech = (chartId: string) => ({
  type: REMOVE_TECH,
  payload: chartId,
});

export const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};

export const fetchDataFailure = (error: string) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  };
};

export const fetchDataSuccess = (data: any) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchDataEnd = () => {
  return {
    type: FETCH_DATA_END,
  };
};

export const addTechData = (searchValue: string) => {
  return async (dispatch: any) => {
    dispatch(fetchDataRequest());
    try {
      const techByNameResult = await fetchTechnologyByNameData(searchValue);
      if (techByNameResult.success) {
        dispatch(addTech(techByNameResult.data));
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      dispatch(fetchDataFailure(error.toString()));
    }
  };
};

export const fetchData = () => {
  return async (dispatch: any) => {
    dispatch(fetchDataRequest());
    try {
      const jobsOpenByDateValues = await fetchTechnologiesData();
      const jobsOpenByCountryValues = await fetchCountriesData();
      const questionsOpenValues = await fetchQuestionsData();
      if (
        jobsOpenByDateValues.success &&
        jobsOpenByCountryValues.success &&
        questionsOpenValues.success
      ) {
        const jobsOpenByDate = jobsOpenByDateValues.data;
        const jobsOpenByCountry = jobsOpenByCountryValues.data;
        const questionsOpen = questionsOpenValues.data;
        const fetchedData = {
          jobsOpenByDate,
          jobsOpenByCountry,
          questionsOpen,
        };
        dispatch(fetchDataSuccess(fetchedData));
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      dispatch(fetchDataFailure(error.toString()));
    }
  };
};
