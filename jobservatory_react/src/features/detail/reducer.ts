import { ChartLine } from '../../components/detail/Detail';

import {
  ADD_TECH,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_END,
  REMOVE_TECH,
} from './actions';

interface Country {
  name: string;
  jobs: number;
}
export interface DataByCountry {
  countries: Country[];
  createdAt: string;
  date: string;
  jobs_total: number;
  name: string;
  _id: string;
}

interface ChartState {
  jobsOpenByDate: ChartLine[];
  jobsOpenByCountry: DataByCountry[];
  questionsOpen: ChartLine[];
  loading: boolean;
  error?: string;
}

export const initialState: ChartState = {
  jobsOpenByDate: [],
  jobsOpenByCountry: [],
  questionsOpen: [],
  loading: false,
  error: undefined,
};

export const getIndexOfElementToRemove = (values: ChartLine[], action: any) => {
  return values.findIndex((value: any) => value.id === action.payload);
};

export const getCountryIndexElementToRemove = (
  values: DataByCountry[],
  action: any,
) => {
  return values.findIndex((value: any) => value.name === action.payload);
};

export function detailReducer(state = initialState, action: any): ChartState {
  switch (action.type) {
    case ADD_TECH: {
      const newJobsOpenByDate = [
        ...state.jobsOpenByDate,
        ...action.payload.jobsOpenByDate,
      ];
      const newJobsOpenByCountry = [
        ...state.jobsOpenByCountry,
        ...action.payload.jobsOpenByCountry,
      ];
      const newQuestionsOpen = [
        ...state.questionsOpen,
        ...action.payload.questionsOpen,
      ];
      return {
        ...state,
        jobsOpenByDate: newJobsOpenByDate,
        jobsOpenByCountry: newJobsOpenByCountry,
        questionsOpen: newQuestionsOpen,
        loading: false,
      };
    }
    case REMOVE_TECH: {
      const currentJobsOpenByDate = [...state.jobsOpenByDate];
      const currentJobsOpenByCountry = [...state.jobsOpenByCountry];
      const currentQuestionsOpen = [...state.questionsOpen];

      const indexOfElementToRemove = getIndexOfElementToRemove(
        currentJobsOpenByDate,
        action,
      );
      const indexOfElementToRemoveOnCountry = getCountryIndexElementToRemove(
        currentJobsOpenByCountry,
        action,
      );
      const indexOfElementToRemoveOnQuestion = getIndexOfElementToRemove(
        currentQuestionsOpen,
        action,
      );

      currentJobsOpenByDate.splice(indexOfElementToRemove, 1);
      currentJobsOpenByCountry.splice(indexOfElementToRemoveOnCountry, 1);
      currentQuestionsOpen.splice(indexOfElementToRemoveOnQuestion, 1);

      return {
        ...state,
        jobsOpenByDate: currentJobsOpenByDate,
        jobsOpenByCountry: currentJobsOpenByCountry,
        questionsOpen: currentQuestionsOpen,
      };
    }

    case FETCH_DATA_SUCCESS: {
      return {
        jobsOpenByDate: action.payload.jobsOpenByDate,
        jobsOpenByCountry: action.payload.jobsOpenByCountry,
        questionsOpen: action.payload.questionsOpen,
        loading: false,
        error: undefined,
      };
    }
    case FETCH_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_DATA_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case FETCH_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}
