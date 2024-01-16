import ChapterInterface from "../../../business/interfaces/chapterInterface";
import chapterModel from "../models/chapterModel";

export default {
  saveChapter: async (data: ChapterInterface) => {
    const chapter = new chapterModel({ ...data });
    return await chapter.save();
  },
  getAllChapter: async () => {
    return await chapterModel.find().lean();
  },

};
