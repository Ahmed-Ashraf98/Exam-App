import { baseUrl } from '../environment/environment.prod';

export enum AuthEndpoint {}

export enum ExamsEndpoint {
  Exams = `${baseUrl}exams`,
}

export enum QuestionsEndpoint {
  Questions = `${baseUrl}questions`,
  Questions_History = `${baseUrl}questions/history`,
  Questions_Checks = `${baseUrl}questions/check`,
}

export enum SubjectsEndpoint {
  Subjects = `${baseUrl}subjects`,
}
