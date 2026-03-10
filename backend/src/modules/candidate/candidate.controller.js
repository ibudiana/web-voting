import candidateService from "./candidate.service.js";
import { successResponse } from "../../utils/responses.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { HTTP_STATUS, RESPONSE_MESSAGE } from "../../utils/constants.js";

class CandidateController {
  getAll = asyncHandler(async (req, res) => {
    const candidates = await candidateService.getAllCandidates();
    return successResponse(res, candidates);
  });

  getById = asyncHandler(async (req, res) => {
    const candidate = await candidateService.getCandidateById(req.params.id);
    return successResponse(res, candidate);
  });

  create = asyncHandler(async (req, res) => {
    const candidate = await candidateService.createCandidate(req.body);
    return successResponse(
      res,
      candidate,
      RESPONSE_MESSAGE.CREATED,
      HTTP_STATUS.CREATED,
    );
  });

  update = asyncHandler(async (req, res) => {
    const candidate = await candidateService.updateCandidate(req.params.id, req.body);
    return successResponse(res, candidate, RESPONSE_MESSAGE.UPDATED);
  });

  delete = asyncHandler(async (req, res) => {
    await candidateService.deleteCandidate(req.params.id);
    return successResponse(res, null, RESPONSE_MESSAGE.DELETED, HTTP_STATUS.OK);
  });

  vote = asyncHandler(async (req, res) => {
    const candidate = await candidateService.vote(req.params.id);
    return successResponse(res, candidate, "Pilihan berhasil disimpan");
  });
}

export default new CandidateController();
