import StatementAnswerDetails from '@/models/statement/questions/StatementAnswerDetails';
import MultipleChoiceStatementAnswerDetails from '@/models/statement/questions/MultipleChoiceStatementAnswerDetails';
import { QuestionFactory } from '@/services/QuestionHelpers';
import StatementCorrectAnswer from '@/models/statement/StatementCorrectAnswer';

export default class StatementAnswer {
  public timeTaken: number = 0;
  public sequence!: number;
  public questionAnswerId!: number;
  public quizQuestionId!: number;
  public timeToSubmission: number | null = null;

  answerDetails: StatementAnswerDetails = new MultipleChoiceStatementAnswerDetails();

  constructor(jsonObj?: StatementAnswer) {
    if (jsonObj) {
      console.log(jsonObj);
      this.timeTaken = jsonObj.timeTaken;
      this.sequence = jsonObj.sequence;
      this.questionAnswerId = jsonObj.questionAnswerId;
      this.quizQuestionId = jsonObj.quizQuestionId;

      this.answerDetails = QuestionFactory.getFactory(
        jsonObj.answerDetails.type
      ).createStatementAnswerDetails(jsonObj.answerDetails);
    }
  }

  isQuestionAnswered(): boolean {
    return this.answerDetails.isQuestionAnswered();
  }

  isAnswerCorrect(correctAnswer: StatementCorrectAnswer): boolean {
    return this.answerDetails.isAnswerCorrect(
      correctAnswer.correctAnswerDetails
    );
  }
}
