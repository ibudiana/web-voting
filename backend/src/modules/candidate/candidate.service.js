import candidateRepository from "./candidate.repository.js";
import AppError from "../../utils/AppError.js";
import { HTTP_STATUS, RESPONSE_MESSAGE } from "../../utils/constants.js";

class CandidateService {
  async getAllCandidates() {
    const candidates = await candidateRepository.findAll();
    return candidates.sort((a, b) => a.number - b.number);
  }

  async getCandidateById(id) {
    const candidate = await candidateRepository.findById(id);
    if (!candidate) {
      throw new AppError(RESPONSE_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return candidate;
  }

  async createCandidate(data) {
    if (!data.name || !data.number) {
      throw new AppError(
        RESPONSE_MESSAGE.VALIDATION_ERROR,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
      );
    }
    return await candidateRepository.create(data);
  }

  async updateCandidate(id, data) {
    await this.getCandidateById(id);
    return await candidateRepository.update(id, data);
  }

  async deleteCandidate(id) {
    await this.getCandidateById(id);
    return await candidateRepository.delete(id);
  }

  async vote(id) {
    const candidate = await candidateRepository.incrementVote(id);
    if (!candidate) {
      throw new AppError(RESPONSE_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return candidate;
  }
}

export default new CandidateService();
