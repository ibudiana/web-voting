import { db } from "../../config/firebase.js";
import { ref, get, set, update, remove, push } from "firebase/database";

class CandidateRepository {
  async findAll() {
    const snapshot = await get(ref(db, "candidates"));
    if (!snapshot.exists()) return [];

    const obj = snapshot.val();
    return Object.entries(obj).map(([key, data]) => ({
      id: key,
      ...data,
    }));
  }

  async findById(id) {
    const snapshot = await get(ref(db, `candidates/${id}`));
    if (!snapshot.exists()) return null;

    return { id, ...snapshot.val() };
  }

  async create(data) {
    const candidatesRef = ref(db, "candidates");
    const newRef = push(candidatesRef);
    const now = new Date().toISOString();

    const { id, ...cleanData } = data;

    const newCandidate = {
      ...cleanData,
      votes: cleanData.votes || 0,
      createdAt: now,
      updatedAt: now,
    };

    await set(newRef, newCandidate);

    return {
      id: newRef.key,
      ...newCandidate,
    };
  }

  async update(id, data) {
    const now = new Date().toISOString();
    const { id: _ignored, ...cleanData } = data;

    await update(ref(db, `candidates/${id}`), {
      ...cleanData,
      updatedAt: now,
    });

    return this.findById(id);
  }

  async delete(id) {
    await remove(ref(db, `candidates/${id}`));
    return true;
  }

  async incrementVote(id) {
    const candidate = await this.findById(id);
    if (!candidate) return null;

    const newVoteCount = (candidate.votes || 0) + 1;
    await update(ref(db, `candidates/${id}`), {
      votes: newVoteCount,
      updatedAt: new Date().toISOString(),
    });

    return { ...candidate, votes: newVoteCount };
  }
}

export default new CandidateRepository();
